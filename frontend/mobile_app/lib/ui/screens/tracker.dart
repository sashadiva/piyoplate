import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:provider/provider.dart';
import '../../data/models/model.dart';
import '../../data/services/apiServices.dart';
import '../../data/services/authProvider.dart';
import '../../core/theme.dart';
import '../../ui/widgets/emptyState.dart';
import '../../ui/widgets/caloriesRing.dart';
import '../../ui/widgets/logItem.dart';
import '../../ui/widgets/mainButton.dart';

class TrackerScreen extends StatefulWidget {
  const TrackerScreen({super.key});

  @override
  State<TrackerScreen> createState() => _TrackerScreenState();
}

class _TrackerScreenState extends State<TrackerScreen> {
  DailySummary? _summary;
  List<NutritionLog> _logs = [];
  bool _loading = true;
  int _periodIndex = 0; // 0=daily, 1=weekly, 2=monthly
  final _periods = ['Hari ini', 'Mingguan', 'Bulanan'];

  // Mock weekly data (replace with API call)
  final _weekData = [1800, 2100, 1650, 1920, 1340, 0, 0];
  final _weekLabels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];

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
        ApiService.getNutritionHistory(userId),
      ]);
      setState(() {
        _summary = results[0] as DailySummary;
        _logs = results[1] as List<NutritionLog>;
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
                    ? _DailyView(summary: _summary, logs: _logs)
                    : _periodIndex == 1
                    ? _WeeklyView(
                        data: _weekData,
                        labels: _weekLabels,
                        logs: _logs,
                        goal: _summary?.dailyGoal ?? 2000,
                      )
                    : _MonthlyView(
                        logs: _logs,
                        goal: _summary?.dailyGoal ?? 2000,
                      ),
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

// ── Daily View ────────────────────────────────────────────────────────────────
class _DailyView extends StatelessWidget {
  final DailySummary? summary;
  final List<NutritionLog> logs;
  const _DailyView({required this.summary, required this.logs});

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
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            child: Row(
              children: [
                Expanded(
                  child: _MacroBox(
                    label: 'Status',
                    value: s.isOverLimit ? 'Overlimit' : 'On Track',
                    color: s.isOverLimit ? AppColors.danger : AppColors.primary,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: _MacroBox(
                    label: 'Tersisa',
                    value: '${s.remainingCalories.abs().toInt()} kkal',
                    color: s.isOverLimit
                        ? AppColors.danger
                        : AppColors.textPrimary,
                  ),
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: _MacroBox(
                    label: 'Target',
                    value: '${s.dailyGoal} kkal',
                  ),
                ),
              ],
            ),
          ),
          const SizedBox(height: 20),
        ],
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 0, 20, 10),
          child: Text(
            'Riwayat makanan',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
        ),
        if (logs.isEmpty)
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
            itemCount: logs.length,
            separatorBuilder: (_, __) => const Divider(),
            itemBuilder: (_, i) => LogItem(log: logs[i]),
          ),
        const SizedBox(height: 100),
      ],
    );
  }
}

class _MacroBox extends StatelessWidget {
  final String label;
  final String value;
  final Color? color;
  const _MacroBox({required this.label, required this.value, this.color});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: AppColors.background,
        borderRadius: BorderRadius.circular(10),
      ),
      child: Column(
        children: [
          Text(
            value,
            style: TextStyle(
              fontSize: 13,
              fontWeight: FontWeight.w600,
              color: color ?? AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 2),
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

// ── Weekly View ───────────────────────────────────────────────────────────────
class _WeeklyView extends StatelessWidget {
  final List<int> data;
  final List<String> labels;
  final List<NutritionLog> logs;
  final int goal;
  const _WeeklyView({
    required this.data,
    required this.labels,
    required this.logs,
    required this.goal,
  });

  @override
  Widget build(BuildContext context) {
    final maxVal = data.fold(0, (a, b) => a > b ? a : b).toDouble();
    final todayIdx = DateTime.now().weekday - 1;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 4),
          child: Row(
            crossAxisAlignment: CrossAxisAlignment.end,
            children: List.generate(7, (i) {
              final h = maxVal > 0 ? (data[i] / maxVal) * 80 : 0.0;
              return Expanded(
                child: Column(
                  children: [
                    if (data[i] > 0)
                      Text(
                        '${data[i]}',
                        style: const TextStyle(
                          fontSize: 9,
                          color: AppColors.textTertiary,
                        ),
                      ),
                    const SizedBox(height: 4),
                    AnimatedContainer(
                      duration: const Duration(milliseconds: 400),
                      height: h.toDouble(),
                      margin: const EdgeInsets.symmetric(horizontal: 3),
                      decoration: BoxDecoration(
                        color: i == todayIdx
                            ? AppColors.primary
                            : AppColors.primaryLight,
                        borderRadius: const BorderRadius.vertical(
                          top: Radius.circular(4),
                        ),
                      ),
                    ),
                    const SizedBox(height: 4),
                    Text(
                      labels[i],
                      style: TextStyle(
                        fontSize: 11,
                        color: i == todayIdx
                            ? AppColors.primary
                            : AppColors.textTertiary,
                        fontWeight: i == todayIdx
                            ? FontWeight.w600
                            : FontWeight.normal,
                      ),
                    ),
                  ],
                ),
              );
            }),
          ),
        ),
        // Goal line indicator
        Padding(
          padding: const EdgeInsets.fromLTRB(16, 8, 16, 16),
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
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 0, 20, 10),
          child: Text(
            'Riwayat makanan minggu ini',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
        ),
        if (logs.isEmpty)
          const Padding(
            padding: EdgeInsets.only(top: 24),
            child: EmptyState(
              icon: Icons.history,
              title: 'Belum ada riwayat',
              subtitle: 'Mulai log makananmu!',
            ),
          )
        else
          ListView.separated(
            shrinkWrap: true,
            physics: const NeverScrollableScrollPhysics(),
            padding: const EdgeInsets.symmetric(horizontal: 16),
            itemCount: logs.take(10).length,
            separatorBuilder: (_, __) => const Divider(),
            itemBuilder: (_, i) => LogItem(log: logs[i]),
          ),
        const SizedBox(height: 100),
      ],
    );
  }
}

// ── Monthly View ──────────────────────────────────────────────────────────────
class _MonthlyView extends StatelessWidget {
  final List<NutritionLog> logs;
  final int goal;
  const _MonthlyView({required this.logs, required this.goal});

  Map<String, int> get _totals {
    final Map<String, int> m = {};
    for (final l in logs) {
      final key = l.displayName;
      m[key] = (m[key] ?? 0) + l.caloriesAdded;
    }
    return Map.fromEntries(
      m.entries.toList()..sort((a, b) => b.value.compareTo(a.value)),
    );
  }

  @override
  Widget build(BuildContext context) {
    final t = _totals;
    final total = logs.fold(0, (a, b) => a + b.caloriesAdded);
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Expanded(
                child: _MacroBox(
                  label: 'Total bulan ini',
                  value: '$total kkal',
                  color: AppColors.primary,
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _MacroBox(
                  label: 'Rata-rata/hari',
                  value: '${logs.isEmpty ? 0 : total ~/ 30} kkal',
                ),
              ),
              const SizedBox(width: 8),
              Expanded(
                child: _MacroBox(label: 'Total log', value: '${logs.length}x'),
              ),
            ],
          ),
        ),
        const Padding(
          padding: EdgeInsets.fromLTRB(20, 0, 20, 10),
          child: Text(
            'Makanan terbanyak',
            style: TextStyle(
              fontSize: 16,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
        ),
        if (t.isEmpty)
          const Padding(
            padding: EdgeInsets.only(top: 24),
            child: EmptyState(
              icon: Icons.pie_chart_outline,
              title: 'Belum ada data',
              subtitle: 'Mulai catat makananmu',
            ),
          )
        else
          ...t.entries
              .take(8)
              .map(
                (e) => Padding(
                  padding: const EdgeInsets.fromLTRB(16, 0, 16, 0),
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(vertical: 10),
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
                                e.key,
                                style: const TextStyle(
                                  fontSize: 14,
                                  fontWeight: FontWeight.w500,
                                  color: AppColors.textPrimary,
                                ),
                              ),
                            ),
                            Text(
                              '${e.value} kkal',
                              style: const TextStyle(
                                fontSize: 13,
                                fontWeight: FontWeight.w500,
                                color: AppColors.primary,
                              ),
                            ),
                          ],
                        ),
                      ),
                      const Divider(),
                    ],
                  ),
                ),
              ),
        const SizedBox(height: 100),
      ],
    );
  }
}

// ── Add Log Bottom Sheet ──────────────────────────────────────────────────────
class _AddLogSheet extends StatefulWidget {
  final VoidCallback onAdded;
  const _AddLogSheet({required this.onAdded});

  @override
  State<_AddLogSheet> createState() => _AddLogSheetState();
}

class _AddLogSheetState extends State<_AddLogSheet> {
  int _mode = -1; // -1=pick, 0=photo, 1=manual, 2=quick
  final _nameCtrl = TextEditingController();
  final _kcalCtrl = TextEditingController();
  bool _submitting = false;

  @override
  void dispose() {
    _nameCtrl.dispose();
    _kcalCtrl.dispose();
    super.dispose();
  }

  Future<void> _pickPhoto() async {
    final picker = ImagePicker();
    final img = await picker.pickImage(source: ImageSource.camera);
    if (img != null && mounted) {
      // Simulate AI calorie detection
      setState(() {
        _mode = 1;
        _nameCtrl.text = 'Makanan dari foto';
        _kcalCtrl.text = '350'; // mock AI result
      });
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('AI mendeteksi ±350 kkal · Bisa disesuaikan 🤖'),
          behavior: SnackBarBehavior.floating,
          backgroundColor: AppColors.primary,
        ),
      );
    }
  }

  Future<void> _submit() async {
    final name = _nameCtrl.text.trim();
    final kcal = int.tryParse(_kcalCtrl.text.trim());
    if (name.isEmpty || kcal == null) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text('Isi nama dan kalori dulu ya!')),
      );
      return;
    }
    setState(() => _submitting = true);
    try {
      await ApiService.addNutritionLog(foodName: name, caloriesAdded: kcal);
      if (mounted) {
        Navigator.pop(context);
        widget.onAdded();
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text('$name ($kcal kkal) ditambahkan! ✅'),
            behavior: SnackBarBehavior.floating,
            backgroundColor: AppColors.primary,
          ),
        );
      }
    } catch (e) {
      setState(() => _submitting = false);
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(e.toString().replaceFirst('Exception: ', ''))),
      );
    }
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
                  onTap: _pickPhoto,
                ),
                _ModeOption(
                  icon: Icons.edit_outlined,
                  label: 'Input manual',
                  onTap: () => setState(() => _mode = 1),
                ),
                _ModeOption(
                  icon: Icons.menu_book_outlined,
                  label: 'Dari resep',
                  onTap: () => setState(() => _mode = 1),
                ),
                _ModeOption(
                  icon: Icons.bolt_outlined,
                  label: 'Quick add',
                  onTap: () => setState(() => _mode = 2),
                ),
              ],
            ),
          ] else ...[
            if (_mode == 2) ...[
              const Text(
                'Quick add — isi nama dan estimasi kalori',
                style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
              ),
              const SizedBox(height: 12),
            ],
            TextField(
              controller: _nameCtrl,
              decoration: const InputDecoration(labelText: 'Nama makanan'),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: _kcalCtrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Kalori (kkal)',
                suffixText: 'kkal',
              ),
            ),
            const SizedBox(height: 16),
            MainButton(
              text: 'Tambah ke tracker',
              onPressed: _submit,
              isLoading: _submitting,
              icon: Icons.add_circle_outline,
            ),
            const SizedBox(height: 8),
            TextButton(
              onPressed: () => setState(() => _mode = -1),
              child: const Text(
                'Kembali',
                style: TextStyle(color: AppColors.textSecondary),
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
  final VoidCallback onTap;
  const _ModeOption({
    required this.icon,
    required this.label,
    required this.onTap,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 12),
        decoration: BoxDecoration(
          color: AppColors.background,
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: AppColors.border, width: 0.5),
        ),
        child: Row(
          children: [
            Icon(icon, color: AppColors.primary, size: 22),
            const SizedBox(width: 8),
            Text(
              label,
              style: const TextStyle(
                fontSize: 13,
                fontWeight: FontWeight.w500,
                color: AppColors.textPrimary,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
