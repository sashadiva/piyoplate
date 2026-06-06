import 'dart:io';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:image_picker/image_picker.dart';
import '../../data/models/model.dart';
import '../../data/services/apiServices.dart';
import '../../data/services/authProvider.dart';
import '../../core/theme.dart';
import '../widgets/emptyState.dart';
import '../widgets/mainButton.dart';
import '../widgets/caloriesRing.dart';

class TrackerScreen extends StatefulWidget {
  const TrackerScreen({super.key});

  @override
  State<TrackerScreen> createState() => _TrackerScreenState();
}

class _TrackerScreenState extends State<TrackerScreen> {
  DailySummary? _summary;
  List<WeeklyData> _weeklyData = [];
  Map<String, dynamic> _monthlyData = {};
  bool _loading = true;
  int _periodIndex = 0;
  final _periods = ['Hari ini', 'Mingguan', 'Bulanan'];

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    final userId = context.read<AuthProvider>().user?.id;
    if (userId == null) return;
    setState(() => _loading = true);
    try {
      final results = await Future.wait([
        ApiService.getDailySummary(userId),
        ApiService.getWeeklyData(userId),
        ApiService.getMonthlySummary(userId),
      ]);
      setState(() {
        _summary = results[0] as DailySummary;
        _weeklyData = results[1] as List<WeeklyData>;
        _monthlyData = results[2] as Map<String, dynamic>;
        _loading = false;
      });
    } catch (_) {
      setState(() => _loading = false);
    }
  }

  void _openAddLog() {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) => _AddLogSheet(onAdded: _load),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: RefreshIndicator(
        onRefresh: _load,
        color: AppColors.primary,
        child: CustomScrollView(
          slivers: [
            const SliverAppBar(title: Text('Kalori Tracker'), floating: true),
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(16, 0, 16, 12),
                child: Row(
                  children: List.generate(
                    _periods.length,
                    (i) => Expanded(
                      child: Padding(
                        padding: EdgeInsets.only(left: i > 0 ? 8 : 0),
                        child: GestureDetector(
                          onTap: () => setState(() => _periodIndex = i),
                          child: AnimatedContainer(
                            duration: const Duration(milliseconds: 150),
                            padding: const EdgeInsets.symmetric(vertical: 8),
                            alignment: Alignment.center,
                            decoration: BoxDecoration(
                              color: _periodIndex == i
                                  ? AppColors.primary
                                  : AppColors.surface,
                              borderRadius: BorderRadius.circular(10),
                              border: Border.all(
                                color: _periodIndex == i
                                    ? AppColors.primary
                                    : AppColors.border,
                              ),
                            ),
                            child: Text(
                              _periods[i],
                              style: TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                                color: _periodIndex == i
                                    ? Colors.white
                                    : AppColors.textSecondary,
                              ),
                            ),
                          ),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
            ),
            if (_loading)
              const SliverFillRemaining(
                child: Center(
                  child: CircularProgressIndicator(color: AppColors.primary),
                ),
              )
            else
              SliverToBoxAdapter(
                child: _periodIndex == 0
                    ? _DailyView(summary: _summary, onRefresh: _load)
                    : _periodIndex == 1
                    ? _WeeklyView(
                        data: _weeklyData,
                        goal: _summary?.dailyGoal ?? 2000,
                      )
                    : _MonthlyView(data: _monthlyData),
              ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _openAddLog,
        backgroundColor: AppColors.primary,
        child: const Icon(Icons.add, color: Colors.white),
      ),
    );
  }
}

class _DailyView extends StatelessWidget {
  final DailySummary? summary;
  final VoidCallback onRefresh;
  const _DailyView({required this.summary, required this.onRefresh});

  @override
  Widget build(BuildContext context) {
    final s = summary;
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (s != null) ...[
          Center(
            child: Padding(
              padding: const EdgeInsets.symmetric(vertical: 16),
              child: CalorieRing(
                consumed: s.totalConsumed.toInt(),
                goal: s.dailyGoal,
              ),
            ),
          ),
          // By source breakdown
          Padding(
            padding: const EdgeInsets.fromLTRB(16, 0, 16, 16),
            child: Row(
              children: [
                _SourceChip(
                  icon: Icons.outdoor_grill_rounded,
                  label: 'Masak',
                  value: '${s.bySource['recipe'] ?? 0} kkal',
                  color: AppColors.primary,
                ),
                const SizedBox(width: 8),
                _SourceChip(
                  icon: Icons.edit_outlined,
                  label: 'Manual',
                  value: '${s.bySource['manual'] ?? 0} kkal',
                  color: AppColors.amber,
                ),
                const SizedBox(width: 8),
                _SourceChip(
                  icon: Icons.camera_alt_outlined,
                  label: 'Foto AI',
                  value: '${s.bySource['photo'] ?? 0} kkal',
                  color: const Color(0xFF7C5CBF),
                ),
              ],
            ),
          ),
        ],
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 0, 20, 10),
          child: Text(
            'Riwayat makanan hari ini',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
        ),
        if (s == null || s.logs.isEmpty)
          const Padding(
            padding: EdgeInsets.only(top: 24),
            child: EmptyState(
              icon: Icons.no_food_outlined,
              title: 'Belum ada log hari ini',
              subtitle: 'Tap + untuk tambahkan makanan',
            ),
          )
        else
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: s.logs.length,
            separatorBuilder: (_, __) => const Divider(),
            itemBuilder: (_, i) =>
                _LogTile(log: s.logs[i], onDeleted: onRefresh),
          ),
        const SizedBox(height: 100),
      ],
    );
  }
}

class _SourceChip extends StatelessWidget {
  final IconData icon;
  final String label;
  final String value;
  final Color color;
  const _SourceChip({
    required this.icon,
    required this.label,
    required this.value,
    required this.color,
  });

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 8),
        decoration: BoxDecoration(
          color: color.withOpacity(0.08),
          borderRadius: BorderRadius.circular(10),
          border: Border.all(color: color.withOpacity(0.2)),
        ),
        child: Column(
          children: [
            Icon(icon, color: color, size: 18),
            const SizedBox(height: 4),
            Text(
              value,
              style: TextStyle(
                fontSize: 12,
                fontWeight: FontWeight.w600,
                color: color,
              ),
            ),
            Text(
              label,
              style: const TextStyle(
                fontSize: 10,
                color: AppColors.textTertiary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _LogTile extends StatelessWidget {
  final NutritionLog log;
  final VoidCallback onDeleted;
  const _LogTile({required this.log, required this.onDeleted});

  IconData get _icon {
    switch (log.source) {
      case 'recipe':
        return Icons.outdoor_grill_rounded;
      case 'photo':
        return Icons.camera_alt_outlined;
      default:
        return Icons.edit_outlined;
    }
  }

  Color get _iconColor {
    switch (log.source) {
      case 'recipe':
        return AppColors.primary;
      case 'photo':
        return const Color(0xFF7C5CBF);
      default:
        return AppColors.amber;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Dismissible(
      key: Key('log_${log.id}'),
      direction: DismissDirection.endToStart,
      background: Container(
        alignment: Alignment.centerRight,
        padding: const EdgeInsets.only(right: 16),
        color: AppColors.dangerLight,
        child: const Icon(Icons.delete_outline, color: AppColors.danger),
      ),
      onDismissed: (_) async {
        try {
          await ApiService.deleteLog(log.id);
          onDeleted();
        } catch (_) {}
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 10),
        child: Row(
          children: [
            Container(
              width: 42,
              height: 42,
              decoration: BoxDecoration(
                color: _iconColor.withOpacity(0.1),
                borderRadius: BorderRadius.circular(10),
              ),
              child: Icon(_icon, color: _iconColor, size: 20),
            ),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    log.displayName,
                    style: const TextStyle(
                      fontSize: 14,
                      fontWeight: FontWeight.w500,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  Row(
                    children: [
                      Text(
                        _formatTime(log.loggedAt),
                        style: const TextStyle(
                          fontSize: 11,
                          color: AppColors.textSecondary,
                        ),
                      ),
                      const SizedBox(width: 6),
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 5,
                          vertical: 1,
                        ),
                        decoration: BoxDecoration(
                          color: _iconColor.withOpacity(0.1),
                          borderRadius: BorderRadius.circular(4),
                        ),
                        child: Text(
                          log.sourceLabel,
                          style: TextStyle(
                            fontSize: 10,
                            color: _iconColor,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                      // Badge confidence AI untuk log dari foto
                      if (log.source == 'photo' &&
                          log.aiConfidence != null) ...[
                        const SizedBox(width: 4),
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 5,
                            vertical: 1,
                          ),
                          decoration: BoxDecoration(
                            color: const Color(0xFF7C5CBF).withOpacity(0.1),
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            '${log.aiConfidence} confidence',
                            style: const TextStyle(
                              fontSize: 10,
                              color: Color(0xFF7C5CBF),
                              fontWeight: FontWeight.w500,
                            ),
                          ),
                        ),
                      ],
                    ],
                  ),
                ],
              ),
            ),
            Text(
              '+${log.caloriesAdded} kkal',
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w600,
                color: AppColors.primary,
              ),
            ),
          ],
        ),
      ),
    );
  }

  String _formatTime(DateTime dt) {
    final h = dt.hour.toString().padLeft(2, '0');
    final m = dt.minute.toString().padLeft(2, '0');
    return '$h:$m';
  }
}

class _WeeklyView extends StatelessWidget {
  final List<WeeklyData> data;
  final int goal;
  const _WeeklyView({required this.data, required this.goal});

  @override
  Widget build(BuildContext context) {
    final maxVal = data.fold(
      0,
      (a, b) => a > b.totalCalories ? a : b.totalCalories,
    );
    final effectiveMax = maxVal < goal ? goal : maxVal;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: data.map((d) {
              final barH = effectiveMax > 0
                  ? (d.totalCalories / effectiveMax * 80).toDouble()
                  : 0.0;
              return Expanded(
                child: Column(
                  children: [
                    if (d.totalCalories > 0)
                      Text(
                        '${d.totalCalories}',
                        style: const TextStyle(
                          fontSize: 8,
                          color: AppColors.textTertiary,
                        ),
                      ),
                    const SizedBox(height: 4),
                    AnimatedContainer(
                      duration: const Duration(milliseconds: 500),
                      height: barH,
                      margin: const EdgeInsets.symmetric(horizontal: 3),
                      decoration: BoxDecoration(
                        color: d.isToday
                            ? AppColors.primary
                            : AppColors.primaryLight,
                        borderRadius: const BorderRadius.vertical(
                          top: Radius.circular(4),
                        ),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      d.dayLabel,
                      style: TextStyle(
                        fontSize: 11,
                        color: d.isToday
                            ? AppColors.primary
                            : AppColors.textTertiary,
                        fontWeight: d.isToday
                            ? FontWeight.w600
                            : FontWeight.normal,
                      ),
                    ),
                  ],
                ),
              );
            }).toList(),
          ),
        ),
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 20),
          child: Row(
            children: [
              Container(width: 12, height: 3, color: AppColors.amber),
              const SizedBox(width: 6),
              Text(
                'Target harian: $goal kkal',
                style: const TextStyle(
                  fontSize: 12,
                  color: AppColors.textSecondary,
                ),
              ),
            ],
          ),
        ),
        // Ringkasan mingguan
        Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16),
          child: Row(
            children: [
              Expanded(
                child: _StatCard(
                  label: 'Total minggu ini',
                  value: '${data.fold(0, (a, b) => a + b.totalCalories)} kkal',
                  color: AppColors.primary,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _StatCard(
                  label: 'Rata-rata/hari',
                  value:
                      '${(data.where((d) => d.totalCalories > 0).isEmpty ? 0 : data.fold(0, (a, b) => a + b.totalCalories) ~/ data.where((d) => d.totalCalories > 0).length)} kkal',
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 100),
      ],
    );
  }
}

class _StatCard extends StatelessWidget {
  final String label;
  final String value;
  final Color? color;
  const _StatCard({required this.label, required this.value, this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: AppColors.background,
        borderRadius: BorderRadius.circular(12),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            value,
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: color ?? AppColors.textPrimary,
            ),
          ),
          Text(
            label,
            style: const TextStyle(
              fontSize: 11,
              color: AppColors.textSecondary,
            ),
          ),
        ],
      ),
    );
  }
}

class _MonthlyView extends StatelessWidget {
  final Map<String, dynamic> data;
  const _MonthlyView({required this.data});

  @override
  Widget build(BuildContext context) {
    final topFoods = (data['top_foods'] as List? ?? [])
        .cast<Map<String, dynamic>>();
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Expanded(
                child: _StatCard(
                  label: 'Total kalori',
                  value: '${data['total_calories'] ?? 0} kkal',
                  color: AppColors.primary,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _StatCard(
                  label: 'Rata-rata/hari',
                  value: '${data['average_per_day'] ?? 0} kkal',
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _StatCard(
                  label: 'Hari tercatat',
                  value: '${data['days_tracked'] ?? 0} hari',
                ),
              ),
            ],
          ),
        ),
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 0, 20, 10),
          child: Text(
            'Makanan terbanyak bulan ini',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
        ),
        if (topFoods.isEmpty)
          const EmptyState(
            icon: Icons.bar_chart_outlined,
            title: 'Belum ada data',
            subtitle: 'Mulai catat makananmu!',
          )
        else
          ...topFoods.map(
            (f) => Column(
              children: [
                Padding(
                  padding: const EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 10,
                  ),
                  child: Row(
                    children: [
                      Container(
                        width: 40,
                        height: 40,
                        decoration: BoxDecoration(
                          color: AppColors.primaryLight,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(
                          Icons.restaurant,
                          color: AppColors.primary,
                          size: 20,
                        ),
                      ),
                      const SizedBox(width: 12),
                      Expanded(
                        child: Text(
                          f['food_name'] ?? '',
                          style: const TextStyle(
                            fontSize: 14,
                            fontWeight: FontWeight.w500,
                            color: AppColors.textPrimary,
                          ),
                        ),
                      ),
                      Text(
                        '${f['total_calories']} kkal',
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.w500,
                          color: AppColors.primary,
                        ),
                      ),
                    ],
                  ),
                ),
                const Divider(indent: 16, endIndent: 16),
              ],
            ),
          ),
        const SizedBox(height: 100),
      ],
    );
  }
}

class _AddLogSheet extends StatefulWidget {
  final VoidCallback onAdded;
  const _AddLogSheet({required this.onAdded});

  @override
  State<_AddLogSheet> createState() => _AddLogSheetState();
}

class _AddLogSheetState extends State<_AddLogSheet> {
  // mode: -1=pilih, 0=foto, 1=manual
  int _mode = -1;
  final _nameCtrl = TextEditingController();
  final _kcalCtrl = TextEditingController();
  final _portionCtrl = TextEditingController();
  bool _submitting = false;
  File? _pickedImage;

  // Hasil sementara dari AI setelah deteksi foto
  Map<String, dynamic>? _aiPreview;

  @override
  void dispose() {
    _nameCtrl.dispose();
    _kcalCtrl.dispose();
    _portionCtrl.dispose();
    super.dispose();
  }

  // ── FOTO ────────────────────────────────────────────────────────────────────
  Future<void> _pickPhoto(ImageSource source) async {
    final picker = ImagePicker();
    final img = await picker.pickImage(
      source: source,
      imageQuality: 70, // compress supaya base64 tidak terlalu besar
      maxWidth: 1024,
    );
    if (img == null) return;

    final file = File(img.path);
    setState(() {
      _pickedImage = file;
      _aiPreview = null;
      _submitting = true;
    });

    try {
      // Kirim ke backend → Gemini Vision analisis
      final result = await ApiService.logFromPhoto(
        imageFile: file,
        portionNote: _portionCtrl.text.trim().isEmpty
            ? null
            : _portionCtrl.text.trim(),
      );

      final aiResult = result['ai_result'] as Map<String, dynamic>;
      setState(() {
        _aiPreview = aiResult;
        _nameCtrl.text = aiResult['food_name'] ?? '';
        _kcalCtrl.text = '${aiResult['calories_estimated'] ?? 0}';
        _submitting = false;
      });

      if (aiResult['calories_estimated'] == 0) {
        _showSnack(
          'Makanan tidak terdeteksi. Coba foto lebih jelas.',
          isError: true,
        );
      } else {
        _showSnack(
          'AI mendeteksi ${aiResult['food_name']} · bisa disesuaikan sebelum simpan',
        );
      }
    } catch (e) {
      setState(() => _submitting = false);
      _showSnack(
        'Gagal analisis foto: ${e.toString().replaceFirst('Exception: ', '')}',
        isError: true,
      );
    }
  }

  // ── SUBMIT MANUAL / SETELAH FOTO ────────────────────────────────────────────
  Future<void> _submitManual() async {
    final name = _nameCtrl.text.trim();
    final kcal = int.tryParse(_kcalCtrl.text.trim());
    if (name.isEmpty || kcal == null || kcal <= 0) {
      _showSnack('Isi nama dan kalori dulu ya!', isError: true);
      return;
    }

    setState(() => _submitting = true);
    try {
      await ApiService.logManual(foodName: name, caloriesAdded: kcal);
      if (mounted) {
        Navigator.pop(context);
        widget.onAdded();
        _showSnack('$name ($kcal kkal) ditambahkan! ✅');
      }
    } catch (e) {
      setState(() => _submitting = false);
      _showSnack(e.toString().replaceFirst('Exception: ', ''), isError: true);
    }
  }

  void _showSnack(String msg, {bool isError = false}) {
    if (!mounted) return;
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(msg),
        backgroundColor: isError ? AppColors.danger : AppColors.primary,
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(
        left: 20,
        right: 20,
        top: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom + 24,
      ),
      child: Column(
        mainAxisSize: MainAxisSize.min,
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Center(
            child: Container(
              width: 36,
              height: 4,
              decoration: BoxDecoration(
                color: AppColors.border,
                borderRadius: BorderRadius.circular(2),
              ),
            ),
          ),
          const SizedBox(height: 16),
          const Text(
            'Tambah log makanan',
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 16),

          // ── PILIH MODE ────────────────────────────────────────────────────
          if (_mode == -1) ...[
            GridView.count(
              crossAxisCount: 2,
              shrinkWrap: true,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
              childAspectRatio: 2.2,
              children: [
                _ModeOption(
                  icon: Icons.camera_alt_outlined,
                  label: 'Foto makanan',
                  subtitle: 'AI deteksi otomatis',
                  color: const Color(0xFF7C5CBF),
                  onTap: () => setState(() => _mode = 0),
                ),
                _ModeOption(
                  icon: Icons.edit_outlined,
                  label: 'Input manual',
                  subtitle: 'Isi nama & kalori',
                  color: AppColors.amber,
                  onTap: () => setState(() => _mode = 1),
                ),
              ],
            ),
          ]
          // ── MODE FOTO ─────────────────────────────────────────────────────
          else if (_mode == 0) ...[
            // Preview foto jika sudah dipilih
            if (_pickedImage != null) ...[
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.file(
                  _pickedImage!,
                  height: 160,
                  width: double.infinity,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(height: 12),
            ],

            // Input keterangan porsi (opsional, bantu AI lebih akurat)
            if (_pickedImage == null) ...[
              TextField(
                controller: _portionCtrl,
                decoration: const InputDecoration(
                  labelText: 'Keterangan porsi (opsional)',
                  hintText: 'Cth: 1 piring besar, setengah porsi...',
                  prefixIcon: Icon(Icons.info_outline, size: 18),
                ),
              ),
              const SizedBox(height: 12),
              // Tombol pilih sumber foto
              Row(
                children: [
                  Expanded(
                    child: _PhotoSourceBtn(
                      icon: Icons.camera_alt_outlined,
                      label: 'Kamera',
                      onTap: () => _pickPhoto(ImageSource.camera),
                    ),
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: _PhotoSourceBtn(
                      icon: Icons.photo_library_outlined,
                      label: 'Galeri',
                      onTap: () => _pickPhoto(ImageSource.gallery),
                    ),
                  ),
                ],
              ),
            ],

            // Loading saat AI sedang analisis
            if (_submitting) ...[
              const SizedBox(height: 16),
              const Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: Color(0xFF7C5CBF),
                    ),
                  ),
                  SizedBox(width: 10),
                  Text(
                    'AI sedang menganalisis foto...',
                    style: TextStyle(
                      fontSize: 13,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ],

            // Hasil AI — bisa diedit sebelum simpan
            if (_aiPreview != null && !_submitting) ...[
              const SizedBox(height: 12),
              // Badge confidence
              Row(
                children: [
                  const Icon(
                    Icons.auto_awesome,
                    size: 14,
                    color: Color(0xFF7C5CBF),
                  ),
                  const SizedBox(width: 4),
                  Text(
                    'Hasil AI · confidence: ${_aiPreview!['confidence']}',
                    style: const TextStyle(
                      fontSize: 12,
                      color: Color(0xFF7C5CBF),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              // Breakdown kalori dari AI
              if ((_aiPreview!['breakdown'] as String? ?? '').isNotEmpty)
                Container(
                  padding: const EdgeInsets.all(10),
                  decoration: BoxDecoration(
                    color: const Color(0xFF7C5CBF).withOpacity(0.07),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    _aiPreview!['breakdown'],
                    style: const TextStyle(
                      fontSize: 12,
                      color: AppColors.textSecondary,
                    ),
                  ),
                ),
              const SizedBox(height: 10),
              // Field nama & kalori — bisa dikoreksi user
              TextField(
                controller: _nameCtrl,
                decoration: const InputDecoration(labelText: 'Nama makanan'),
              ),
              const SizedBox(height: 10),
              TextField(
                controller: _kcalCtrl,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: 'Kalori (kkal) — bisa disesuaikan',
                  suffixText: 'kkal',
                ),
              ),
              const SizedBox(height: 14),
              MainButton(
                text: 'Simpan ke tracker',
                onPressed: _submitManual,
                icon: Icons.add_circle_outline,
              ),
            ],

            // Ganti foto
            if (_pickedImage != null && !_submitting && _aiPreview == null) ...[
              const SizedBox(height: 12),
              Center(
                child: TextButton.icon(
                  onPressed: () => setState(() {
                    _pickedImage = null;
                    _aiPreview = null;
                  }),
                  icon: const Icon(Icons.refresh, size: 16),
                  label: const Text('Ganti foto'),
                  style: TextButton.styleFrom(
                    foregroundColor: AppColors.textSecondary,
                  ),
                ),
              ),
            ],
          ]
          // ── MODE MANUAL ───────────────────────────────────────────────────
          else ...[
            TextField(
              controller: _nameCtrl,
              decoration: const InputDecoration(
                labelText: 'Nama makanan',
                hintText: 'Cth: Mie Ayam Bakso',
              ),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _kcalCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Jumlah kalori',
                hintText: 'Cth: 450',
                suffixText: 'kkal',
              ),
            ),
            const SizedBox(height: 16),
            MainButton(
              text: 'Tambah ke tracker',
              onPressed: _submitManual,
              isLoading: _submitting,
              icon: Icons.add_circle_outline,
            ),
          ],

          // Tombol kembali
          if (_mode != -1) ...[
            const SizedBox(height: 4),
            Center(
              child: TextButton(
                onPressed: () => setState(() {
                  _mode = -1;
                  _pickedImage = null;
                  _aiPreview = null;
                  _nameCtrl.clear();
                  _kcalCtrl.clear();
                }),
                child: const Text(
                  'Kembali',
                  style: TextStyle(color: AppColors.textSecondary),
                ),
              ),
            ),
          ],
        ],
      ),
    );
  }
}

class _ModeOption extends StatelessWidget {
  final IconData icon;
  final String label;
  final String subtitle;
  final Color color;
  final VoidCallback onTap;
  const _ModeOption({
    required this.icon,
    required this.label,
    required this.subtitle,
    required this.color,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
        decoration: BoxDecoration(
          color: color.withOpacity(0.07),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: color.withOpacity(0.2)),
        ),
        child: Row(
          children: [
            Icon(icon, color: color, size: 22),
            const SizedBox(width: 8),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    label,
                    style: TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: color,
                    ),
                  ),
                  Text(
                    subtitle,
                    style: const TextStyle(
                      fontSize: 10,
                      color: AppColors.textTertiary,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _PhotoSourceBtn extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  const _PhotoSourceBtn({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(vertical: 14),
        decoration: BoxDecoration(
          color: const Color(0xFF7C5CBF).withOpacity(0.08),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: const Color(0xFF7C5CBF).withOpacity(0.25)),
        ),
        child: Column(
          children: [
            Icon(icon, color: const Color(0xFF7C5CBF), size: 26),
            const SizedBox(height: 4),
            Text(
              label,
              style: const TextStyle(
                fontSize: 13,
                color: Color(0xFF7C5CBF),
                fontWeight: FontWeight.w500,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
