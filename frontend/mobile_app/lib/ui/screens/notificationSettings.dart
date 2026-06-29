import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../../core/theme.dart';

class NotificationSettingsScreen extends StatefulWidget {
  const NotificationSettingsScreen({super.key});

  @override
  State<NotificationSettingsScreen> createState() =>
      _NotificationSettingsScreenState();
}

class _NotificationSettingsScreenState
    extends State<NotificationSettingsScreen> {
  bool _loading = true;
  bool _reminderMeal = true;
  bool _reminderWater = false;
  bool _weeklySummary = true;
  bool _recipeReview = true;

  @override
  void initState() {
    super.initState();
    _loadPrefs();
  }

  Future<void> _loadPrefs() async {
    final prefs = await SharedPreferences.getInstance();
    setState(() {
      _reminderMeal = prefs.getBool('notif_reminder_meal') ?? true;
      _reminderWater = prefs.getBool('notif_reminder_water') ?? false;
      _weeklySummary = prefs.getBool('notif_weekly_summary') ?? true;
      _recipeReview = prefs.getBool('notif_recipe_review') ?? true;
      _loading = false;
    });
  }

  Future<void> _setPref(String key, bool value) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setBool(key, value);
  }

  @override
  Widget build(BuildContext context) {
    if (_loading) {
      return const Scaffold(body: Center(child: CircularProgressIndicator()));
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Notifikasi')),
      body: ListView(
        padding: const EdgeInsets.symmetric(vertical: 8),
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(20, 8, 20, 4),
            child: Text(
              'Pengingat',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                color: AppColors.textTertiary,
                letterSpacing: 0.8,
              ),
            ),
          ),
          _NotifSwitch(
            title: 'Pengingat jam makan',
            subtitle: 'Diingatkan saat waktunya makan',
            value: _reminderMeal,
            onChanged: (v) {
              setState(() => _reminderMeal = v);
              _setPref('notif_reminder_meal', v);
            },
          ),
          _NotifSwitch(
            title: 'Pengingat minum air',
            subtitle: 'Diingatkan untuk minum air secara rutin',
            value: _reminderWater,
            onChanged: (v) {
              setState(() => _reminderWater = v);
              _setPref('notif_reminder_water', v);
            },
          ),
          const Padding(
            padding: EdgeInsets.fromLTRB(20, 20, 20, 4),
            child: Text(
              'Aktivitas',
              style: TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w600,
                color: AppColors.textTertiary,
                letterSpacing: 0.8,
              ),
            ),
          ),
          _NotifSwitch(
            title: 'Ringkasan mingguan',
            subtitle: 'Laporan kalori dan progres setiap minggu',
            value: _weeklySummary,
            onChanged: (v) {
              setState(() => _weeklySummary = v);
              _setPref('notif_weekly_summary', v);
            },
          ),
          _NotifSwitch(
            title: 'Ulasan resep',
            subtitle: 'Saat ada yang memberi ulasan di resepmu',
            value: _recipeReview,
            onChanged: (v) {
              setState(() => _recipeReview = v);
              _setPref('notif_recipe_review', v);
            },
          ),
        ],
      ),
    );
  }
}

class _NotifSwitch extends StatelessWidget {
  final String title;
  final String subtitle;
  final bool value;
  final ValueChanged<bool> onChanged;

  const _NotifSwitch({
    required this.title,
    required this.subtitle,
    required this.value,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return SwitchListTile(
      contentPadding: const EdgeInsets.symmetric(horizontal: 20),
      activeColor: AppColors.primary,
      title: Text(
        title,
        style: const TextStyle(fontSize: 15, color: AppColors.textPrimary),
      ),
      subtitle: Text(
        subtitle,
        style: const TextStyle(fontSize: 12, color: AppColors.textSecondary),
      ),
      value: value,
      onChanged: onChanged,
    );
  }
}
