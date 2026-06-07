import 'dart:typed_data';
import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../data/models/model.dart';
import '../../data/services/apiServices.dart';
import '../../core/theme.dart';
import '../widgets/mainButton.dart';

class AddRecipeScreen extends StatefulWidget {
  const AddRecipeScreen({super.key});

  @override
  State<AddRecipeScreen> createState() => _AddRecipeScreenState();
}

class _AddRecipeScreenState extends State<AddRecipeScreen> {
  final _titleCtrl = TextEditingController();
  final _kcalCtrl = TextEditingController();
  final _durationCtrl = TextEditingController();

  String _cuisineType = '';
  String _calMode = 'manual'; // 'manual' | 'ai'
  Uint8List? _imageBytes;

  final List<IngredientInput> _ingredients = [IngredientInput()];
  final List<TextEditingController> _steps = [TextEditingController()];

  bool _submitting = false;

  final _cuisines = [
    'Indonesia',
    'Asia',
    'Western',
    'Vegetarian',
    'Dessert',
    'Lainnya',
  ];
  final _units = ['gr', 'kg', 'sdm', 'sdt', 'ml', 'L', 'buah', 'secukupnya'];

  @override
  void dispose() {
    _titleCtrl.dispose();
    _kcalCtrl.dispose();
    _durationCtrl.dispose();
    for (final c in _steps) {
      c.dispose();
    }
    super.dispose();
  }

  Future<void> _pickImage() async {
    final picker = ImagePicker();
    showModalBottomSheet(
      context: context,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            const SizedBox(height: 12),
            ListTile(
              leading: const Icon(
                Icons.camera_alt_outlined,
                color: AppColors.primary,
              ),
              title: const Text('Ambil dari kamera'),
              onTap: () async {
                Navigator.pop(context);
                final img = await picker.pickImage(source: ImageSource.camera);
                if (img != null) {
                  final b = await img.readAsBytes();
                  setState(() => _imageBytes = b);
                }
              },
            ),
            ListTile(
              leading: const Icon(
                Icons.photo_library_outlined,
                color: AppColors.primary,
              ),
              title: const Text('Pilih dari galeri'),
              onTap: () async {
                Navigator.pop(context);
                final img = await picker.pickImage(source: ImageSource.gallery);
                if (img != null) {
                  final b = await img.readAsBytes();
                  setState(() => _imageBytes = b);
                }
              },
            ),
            const SizedBox(height: 8),
          ],
        ),
      ),
    );
  }

  void _addIngredient() {
    setState(() => _ingredients.add(IngredientInput()));
  }

  void _removeIngredient(int idx) {
    if (_ingredients.length <= 1) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Minimal 1 bahan harus ada')),
      );
      return;
    }
    setState(() => _ingredients.removeAt(idx));
  }

  void _addStep() {
    setState(() => _steps.add(TextEditingController()));
  }

  void _removeStep(int idx) {
    if (_steps.length <= 1) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Minimal 1 langkah harus ada')),
      );
      return;
    }
    _steps[idx].dispose();
    setState(() => _steps.removeAt(idx));
  }

  bool _validate() {
    if (_titleCtrl.text.trim().isEmpty) {
      _showError('Nama resep wajib diisi');
      return false;
    }
    if (_cuisineType.isEmpty) {
      _showError('Jenis masakan wajib dipilih');
      return false;
    }
    final hasIngr = _ingredients.any((i) => i.name.isNotEmpty);
    if (!hasIngr) {
      _showError('Isi minimal 1 bahan');
      return false;
    }
    final hasStep = _steps.any((c) => c.text.trim().isNotEmpty);
    if (!hasStep) {
      _showError('Isi minimal 1 langkah memasak');
      return false;
    }
    if (_calMode == 'manual' && int.tryParse(_kcalCtrl.text.trim()) == null) {
      _showError('Masukkan kalori yang valid');
      return false;
    }
    // Mode AI: kalori boleh kosong (backend yang hitung), atau sudah diisi dari preview
    if (_calMode == 'ai' &&
        _aiResult == null &&
        _kcalCtrl.text.trim().isEmpty) {
      // Boleh lanjut — backend akan hitung sendiri
    }
    return true;
  }

  void _showError(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(msg),
        backgroundColor: AppColors.danger,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  // Hasil estimasi AI yang sudah di-preview (opsional)
  AiCalorieResult? _aiResult;

  /// Panggil Gemini API untuk preview estimasi kalori SEBELUM publish.
  /// User bisa lihat breakdown dan koreksi kalau perlu.
  Future<void> _previewAiCalories() async {
    final ingrStr = _ingredients
        .where((i) => i.name.isNotEmpty)
        .map((i) => '${i.name}${i.qty.isNotEmpty ? ' ${i.qty} ${i.unit}' : ''}')
        .join(', ');

    if (ingrStr.isEmpty || _titleCtrl.text.trim().isEmpty) {
      _showError('Isi nama resep dan bahan dulu sebelum generate AI');
      return;
    }

    setState(() => _submitting = true);
    try {
      final res = await ApiService.estimateCaloriesAI(
        title: _titleCtrl.text.trim(),
        ingredients: ingrStr,
        servings: 1,
      );
      final result = AiCalorieResult.fromJson(res);
      setState(() {
        _aiResult = result;
        _kcalCtrl.text = '${result.caloriesPerServing}';
        _submitting = false;
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              'AI estimasi: ${result.caloriesPerServing} kkal/porsi ✨',
            ),
            backgroundColor: AppColors.primary,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } catch (e) {
      setState(() => _submitting = false);
      _showError(e.toString().replaceFirst('Exception: ', ''));
    }
  }

  Future<void> _publish() async {
    if (!_validate()) return;
    setState(() => _submitting = true);

    final ingrStr = _ingredients
        .where((i) => i.name.isNotEmpty)
        .map((i) => '${i.name}${i.qty.isNotEmpty ? ' ${i.qty} ${i.unit}' : ''}')
        .join(', ');

    final stepsStr = _steps
        .map((c) => c.text.trim())
        .where((s) => s.isNotEmpty)
        .join('. ');

    // Kalori: pakai nilai di field (bisa dari manual atau sudah diisi AI preview)
    // use_ai_calories=true hanya jika mode AI tapi belum di-preview
    final kcalText = _kcalCtrl.text.trim();
    final kcalManual = int.tryParse(kcalText);
    final useAi = _calMode == 'ai' && kcalManual == null;

    try {
      await ApiService.createRecipe({
        'title': _titleCtrl.text.trim(),
        'cuisine_type': _cuisineType,
        'ingredients': ingrStr,
        'instructions': stepsStr,
        'calories_per_serving': kcalManual ?? 0,
        'cook_time_minutes': int.tryParse(_durationCtrl.text.trim()) ?? 0,
        'use_ai_calories': useAi,
        'servings': 1,
        if (_imageBytes != null) 'image_url': '',
      });

      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Resep berhasil dipublikasi! 🎉'),
            backgroundColor: AppColors.primary,
            behavior: SnackBarBehavior.floating,
          ),
        );
        _resetForm();
      }
    } catch (e) {
      _showError(e.toString().replaceFirst('Exception: ', ''));
    } finally {
      setState(() => _submitting = false);
    }
  }

  void _resetForm() {
    _titleCtrl.clear();
    _kcalCtrl.clear();
    _durationCtrl.clear();
    setState(() {
      _cuisineType = '';
      _calMode = 'manual';
      _imageBytes = null;
      _ingredients
        ..clear()
        ..add(IngredientInput());
      for (final c in _steps) c.dispose();
      _steps
        ..clear()
        ..add(TextEditingController());
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          const SliverAppBar(title: Text('Buat resep baru'), floating: true),
          SliverToBoxAdapter(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Image upload
                _ImageSection(imageBytes: _imageBytes, onTap: _pickImage),
                const SizedBox(height: 8),

                // Basic Info
                _FormSection(
                  title: 'Info dasar',
                  child: Column(
                    children: [
                      _field(
                        _titleCtrl,
                        'Nama resep',
                        hint: 'Cth: Nasi Goreng Spesial',
                      ),
                      const SizedBox(height: 12),
                      _CuisineDropdown(
                        value: _cuisineType.isEmpty ? null : _cuisineType,
                        items: _cuisines,
                        onChanged: (v) =>
                            setState(() => _cuisineType = v ?? ''),
                      ),
                      const SizedBox(height: 12),
                      _field(
                        _durationCtrl,
                        'Durasi masak (menit)',
                        hint: 'Cth: 30',
                        type: TextInputType.number,
                      ),
                    ],
                  ),
                ),

                // Ingredients
                _FormSection(
                  title: 'Bahan-bahan',
                  child: Column(
                    children: [
                      ...List.generate(
                        _ingredients.length,
                        (i) => Padding(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: _IngredientRow(
                            item: _ingredients[i],
                            units: _units,
                            onDelete: () => _removeIngredient(i),
                            onNameChanged: (v) => _ingredients[i].name = v,
                            onQtyChanged: (v) => _ingredients[i].qty = v,
                            onUnitChanged: (v) =>
                                setState(() => _ingredients[i].unit = v),
                          ),
                        ),
                      ),
                      _AddRowButton(
                        label: 'Tambah bahan',
                        onTap: _addIngredient,
                      ),
                    ],
                  ),
                ),

                // Steps
                _FormSection(
                  title: 'Langkah memasak',
                  child: Column(
                    children: [
                      ...List.generate(
                        _steps.length,
                        (i) => Padding(
                          padding: const EdgeInsets.only(bottom: 10),
                          child: _StepRow(
                            stepNum: i + 1,
                            ctrl: _steps[i],
                            onDelete: () => _removeStep(i),
                          ),
                        ),
                      ),
                      _AddRowButton(label: 'Tambah langkah', onTap: _addStep),
                    ],
                  ),
                ),

                // Calories
                _FormSection(
                  title: 'Kalori per porsi',
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        children: [
                          _CalModeChip(
                            label: 'Input manual',
                            isSelected: _calMode == 'manual',
                            onTap: () => setState(() => _calMode = 'manual'),
                          ),
                          const SizedBox(width: 10),
                          _CalModeChip(
                            label: '✨ Generate AI',
                            isSelected: _calMode == 'ai',
                            onTap: () => setState(() => _calMode = 'ai'),
                          ),
                        ],
                      ),
                      const SizedBox(height: 12),
                      if (_calMode == 'manual')
                        _field(
                          _kcalCtrl,
                          'Kalori (kkal)',
                          hint: 'Cth: 450',
                          type: TextInputType.number,
                        )
                      else ...[
                        // Tombol generate AI
                        GestureDetector(
                          onTap: _submitting ? null : _previewAiCalories,
                          child: Container(
                            padding: const EdgeInsets.all(14),
                            decoration: BoxDecoration(
                              color: AppColors.primaryLight,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(
                                color: AppColors.primary.withOpacity(0.3),
                              ),
                            ),
                            child: Row(
                              children: [
                                _submitting
                                    ? const SizedBox(
                                        width: 18,
                                        height: 18,
                                        child: CircularProgressIndicator(
                                          strokeWidth: 2,
                                          color: AppColors.primary,
                                        ),
                                      )
                                    : const Icon(
                                        Icons.auto_awesome,
                                        color: AppColors.primary,
                                        size: 18,
                                      ),
                                const SizedBox(width: 10),
                                Expanded(
                                  child: Text(
                                    _submitting
                                        ? 'AI sedang menghitung...'
                                        : 'Tap untuk generate estimasi kalori dari bahan ✨',
                                    style: const TextStyle(
                                      fontSize: 13,
                                      color: AppColors.primaryDark,
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ),
                        // Tampilkan hasil AI preview
                        if (_aiResult != null) ...[
                          const SizedBox(height: 10),
                          Container(
                            padding: const EdgeInsets.all(12),
                            decoration: BoxDecoration(
                              color: AppColors.background,
                              borderRadius: BorderRadius.circular(10),
                            ),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  children: [
                                    const Icon(
                                      Icons.check_circle,
                                      color: AppColors.primary,
                                      size: 16,
                                    ),
                                    const SizedBox(width: 6),
                                    Text(
                                      '${_aiResult!.caloriesPerServing} kkal/porsi',
                                      style: const TextStyle(
                                        fontSize: 14,
                                        fontWeight: FontWeight.w600,
                                        color: AppColors.primary,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  _aiResult!.breakdown,
                                  style: const TextStyle(
                                    fontSize: 12,
                                    color: AppColors.textSecondary,
                                  ),
                                ),
                                if (_aiResult!.notes.isNotEmpty) ...[
                                  const SizedBox(height: 4),
                                  Text(
                                    _aiResult!.notes,
                                    style: const TextStyle(
                                      fontSize: 11,
                                      color: AppColors.textTertiary,
                                      fontStyle: FontStyle.italic,
                                    ),
                                  ),
                                ],
                              ],
                            ),
                          ),
                          const SizedBox(height: 8),
                          // Field kalori bisa dikoreksi manual
                          _field(
                            _kcalCtrl,
                            'Koreksi kalori jika perlu',
                            hint: '${_aiResult!.caloriesPerServing}',
                            type: TextInputType.number,
                          ),
                        ],
                      ],
                    ],
                  ),
                ),

                // Publish button
                Padding(
                  padding: const EdgeInsets.fromLTRB(16, 0, 16, 32),
                  child: MainButton(
                    text: 'Publish resep',
                    onPressed: _publish,
                    isLoading: _submitting,
                    icon: Icons.send_rounded,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _field(
    TextEditingController ctrl,
    String label, {
    String? hint,
    TextInputType? type,
  }) {
    return TextField(
      controller: ctrl,
      keyboardType: type,
      decoration: InputDecoration(labelText: label, hintText: hint),
    );
  }
}

// ── Sub-widgets ───────────────────────────────────────────────────────────────

class _ImageSection extends StatelessWidget {
  final Uint8List? imageBytes;
  final VoidCallback onTap;
  const _ImageSection({required this.imageBytes, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        margin: const EdgeInsets.fromLTRB(16, 8, 16, 0),
        height: 160,
        decoration: BoxDecoration(
          color: AppColors.background,
          borderRadius: BorderRadius.circular(14),
          border: Border.all(
            color: AppColors.border,
            width: 1.5,
            style: BorderStyle.solid,
          ),
        ),
        clipBehavior: Clip.antiAlias,
        child: imageBytes != null
            ? Stack(
                fit: StackFit.expand,
                children: [
                  Image.memory(imageBytes!, fit: BoxFit.cover),
                  Positioned(
                    bottom: 8,
                    right: 8,
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 10,
                        vertical: 5,
                      ),
                      decoration: BoxDecoration(
                        color: Colors.black54,
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: const Text(
                        'Ganti foto',
                        style: TextStyle(color: Colors.white, fontSize: 12),
                      ),
                    ),
                  ),
                ],
              )
            : Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.camera_alt_outlined,
                    size: 36,
                    color: AppColors.primary,
                  ),
                  const SizedBox(height: 8),
                  const Text(
                    'Upload foto resep',
                    style: TextStyle(
                      fontSize: 14,
                      color: AppColors.textSecondary,
                      fontWeight: FontWeight.w500,
                    ),
                  ),
                  const SizedBox(height: 4),
                  const Text(
                    'JPG, PNG · maks. 5MB',
                    style: TextStyle(
                      fontSize: 12,
                      color: AppColors.textTertiary,
                    ),
                  ),
                ],
              ),
      ),
    );
  }
}

class _FormSection extends StatelessWidget {
  final String title;
  final Widget child;
  const _FormSection({required this.title, required this.child});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.fromLTRB(16, 20, 16, 0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title.toUpperCase(),
            style: const TextStyle(
              fontSize: 11,
              fontWeight: FontWeight.w600,
              color: AppColors.textTertiary,
              letterSpacing: 0.8,
            ),
          ),
          const SizedBox(height: 12),
          child,
        ],
      ),
    );
  }
}

class _CuisineDropdown extends StatelessWidget {
  final String? value;
  final List<String> items;
  final ValueChanged<String?> onChanged;
  const _CuisineDropdown({
    required this.value,
    required this.items,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return DropdownButtonFormField<String>(
      value: value,
      hint: const Text('Pilih jenis masakan'),
      decoration: const InputDecoration(labelText: 'Jenis masakan'),
      items: items
          .map((c) => DropdownMenuItem(value: c, child: Text(c)))
          .toList(),
      onChanged: onChanged,
    );
  }
}

class _IngredientRow extends StatelessWidget {
  final IngredientInput item;
  final List<String> units;
  final VoidCallback onDelete;
  final ValueChanged<String> onNameChanged;
  final ValueChanged<String> onQtyChanged;
  final ValueChanged<String> onUnitChanged;

  const _IngredientRow({
    required this.item,
    required this.units,
    required this.onDelete,
    required this.onNameChanged,
    required this.onQtyChanged,
    required this.onUnitChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Expanded(
          flex: 4,
          child: TextField(
            onChanged: onNameChanged,
            decoration: const InputDecoration(hintText: 'Nama bahan'),
          ),
        ),
        const SizedBox(width: 8),
        SizedBox(
          width: 60,
          child: TextField(
            onChanged: onQtyChanged,
            keyboardType: TextInputType.number,
            decoration: const InputDecoration(hintText: 'Qty'),
          ),
        ),
        const SizedBox(width: 6),
        SizedBox(
          width: 88,
          child: DropdownButtonFormField<String>(
            value: item.unit,
            isDense: true,
            decoration: const InputDecoration(
              contentPadding: EdgeInsets.symmetric(
                horizontal: 10,
                vertical: 12,
              ),
            ),
            items: units
                .map((u) => DropdownMenuItem(value: u, child: Text(u)))
                .toList(),
            onChanged: (v) {
              if (v != null) onUnitChanged(v);
            },
          ),
        ),
        const SizedBox(width: 6),
        IconButton(
          onPressed: onDelete,
          icon: const Icon(
            Icons.delete_outline,
            color: AppColors.danger,
            size: 20,
          ),
          style: IconButton.styleFrom(
            backgroundColor: AppColors.dangerLight,
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.circular(8),
            ),
          ),
        ),
      ],
    );
  }
}

class _StepRow extends StatelessWidget {
  final int stepNum;
  final TextEditingController ctrl;
  final VoidCallback onDelete;
  const _StepRow({
    required this.stepNum,
    required this.ctrl,
    required this.onDelete,
  });

  @override
  Widget build(BuildContext context) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.only(top: 10),
          child: Container(
            width: 28,
            height: 28,
            alignment: Alignment.center,
            decoration: const BoxDecoration(
              color: AppColors.primaryLight,
              shape: BoxShape.circle,
            ),
            child: Text(
              '$stepNum',
              style: const TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: AppColors.primaryDark,
              ),
            ),
          ),
        ),
        const SizedBox(width: 10),
        Expanded(
          child: TextField(
            controller: ctrl,
            maxLines: 2,
            decoration: const InputDecoration(
              hintText: 'Jelaskan langkah memasak ini...',
            ),
          ),
        ),
        const SizedBox(width: 6),
        Padding(
          padding: const EdgeInsets.only(top: 6),
          child: IconButton(
            onPressed: onDelete,
            icon: const Icon(
              Icons.delete_outline,
              color: AppColors.danger,
              size: 20,
            ),
            style: IconButton.styleFrom(
              backgroundColor: AppColors.dangerLight,
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(8),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _AddRowButton extends StatelessWidget {
  final String label;
  final VoidCallback onTap;
  const _AddRowButton({required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          border: Border.all(
            color: AppColors.primary,
            style: BorderStyle.solid,
            width: 0.5,
          ),
          borderRadius: BorderRadius.circular(10),
          color: AppColors.primaryLight,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.add, color: AppColors.primary, size: 18),
            const SizedBox(width: 6),
            Text(
              label,
              style: const TextStyle(
                fontSize: 13,
                color: AppColors.primary,
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _CalModeChip extends StatelessWidget {
  final String label;
  final bool isSelected;
  final VoidCallback onTap;
  const _CalModeChip({
    required this.label,
    required this.isSelected,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: AnimatedContainer(
        duration: const Duration(milliseconds: 150),
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
        decoration: BoxDecoration(
          color: isSelected ? AppColors.primaryLight : AppColors.background,
          borderRadius: BorderRadius.circular(10),
          border: Border.all(
            color: isSelected ? AppColors.primary : AppColors.border,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            fontSize: 13,
            color: isSelected ? AppColors.primaryDark : AppColors.textSecondary,
            fontWeight: isSelected ? FontWeight.w500 : FontWeight.normal,
          ),
        ),
      ),
    );
  }
}
