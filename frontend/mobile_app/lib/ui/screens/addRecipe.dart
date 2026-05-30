import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import '../../data/models/model.dart';
import '../../data/services/apiServices.dart';
import '../../data/services/authProvider.dart';
import '../../core/theme.dart';
import '../../ui/widgets/MainButton.dart';

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
  File? _image;

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
  final _units = ['gr', 'kg', 'sdm', 'sdt', 'ml', 'L', 'buah', 'butir', 'secukupnya'];

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
                if (img != null) setState(() => _image = File(img.path));
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
                if (img != null) setState(() => _image = File(img.path));
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
    if (_calMode == 'manual' && (int.tryParse(_kcalCtrl.text.trim()) == null)) {
      _showError('Masukkan kalori yang valid');
      return false;
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

  Future<void> _publish() async {
    if (!_validate()) return;
    setState(() => _submitting = true);

    final user = context.read<AuthProvider>().user!;

    final ingrStr = _ingredients
        .where((i) => i.name.isNotEmpty)
        .map((i) => '${i.name}${i.qty.isNotEmpty ? ' ${i.qty} ${i.unit}' : ''}')
        .join(', ');

    final stepsStr = _steps
        .map((c) => c.text.trim())
        .where((s) => s.isNotEmpty)
        .join('. ');

    final kcal = _calMode == 'manual'
        ? int.parse(_kcalCtrl.text.trim())
        : _estimateCalories();

    try {
      await ApiService.createRecipe({
        'title': _titleCtrl.text.trim(),
        'cuisine_type': _cuisineType,
        'ingredients': ingrStr,
        'instructions': stepsStr,
        'calories_per_serving': kcal,
        'cooking_duration_minutes':
            int.tryParse(_durationCtrl.text.trim()) ?? 0,
        'author_id': user.id,
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

  /// Simple local calorie estimator based on common Indonesian ingredients
  int _estimateCalories() {
    int est = 0;
    for (final i in _ingredients) {
      final n = i.name.toLowerCase();
      if (n.contains('nasi') || n.contains('rice'))
        est += 180;
      else if (n.contains('ayam') || n.contains('chicken'))
        est += 165;
      else if (n.contains('daging') || n.contains('beef'))
        est += 250;
      else if (n.contains('tahu'))
        est += 80;
      else if (n.contains('tempe'))
        est += 160;
      else if (n.contains('telur') || n.contains('egg'))
        est += 70;
      else if (n.contains('minyak') || n.contains('oil'))
        est += 120;
      else if (n.contains('santan'))
        est += 90;
      else
        est += 30;
    }
    return est.clamp(50, 2000);
  }

  void _resetForm() {
    _titleCtrl.clear();
    _kcalCtrl.clear();
    _durationCtrl.clear();
    setState(() {
      _cuisineType = '';
      _calMode = 'manual';
      _image = null;
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
                _ImageSection(image: _image, onTap: _pickImage),
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
                      else
                        Container(
                          padding: const EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: AppColors.primaryLight,
                            borderRadius: BorderRadius.circular(10),
                          ),
                          child: const Row(
                            children: [
                              Icon(
                                Icons.auto_awesome,
                                color: AppColors.primary,
                                size: 18,
                              ),
                              SizedBox(width: 10),
                              Expanded(
                                child: Text(
                                  'AI akan menghitung kalori dari bahan-bahan yang kamu input saat publish 🤖',
                                  style: TextStyle(
                                    fontSize: 13,
                                    color: AppColors.primaryDark,
                                  ),
                                ),
                              ),
                            ],
                          ),
                        ),
                    ],
                  ),
                ),
                const SizedBox(height: 20),
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
  final File? image;
  final VoidCallback onTap;
  const _ImageSection({required this.image, required this.onTap});

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
        child: image != null
            ? Stack(
                fit: StackFit.expand,
                children: [
                  Image.file(image!, fit: BoxFit.cover),
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
            isExpanded: true,
            items: units
                .map((u) => DropdownMenuItem(value: u, child: Text(u, style: const TextStyle(fontSize: 13))))
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
            color: AppColors.primaryDark,
            style: BorderStyle.solid,
            width: 0.5,
          ),
          borderRadius: BorderRadius.circular(10),
          color: AppColors.primaryLight,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.add, color: AppColors.primaryDark, size: 18),
            const SizedBox(width: 6),
            Text(
              label,
              style: const TextStyle(
                fontSize: 13,
                color: AppColors.primaryDark,
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
