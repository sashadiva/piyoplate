import 'changePassword.dart';
import 'notificationSettings.dart';
import 'about.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../data/services/apiServices.dart';
import '../../data/services/authProvider.dart';
import '../../ui/widgets/mainButton.dart';
import '../../ui/widgets/statusBox.dart';
import '../../core/theme.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  void _editCalorieGoal() {
    final user = context.read<AuthProvider>().user!;
    final ctrl = TextEditingController(text: '${user.calorieGoal}');

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) => Padding(
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
            const Text(
              'Target kalori harian',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 6),
            const Text(
              'Rata-rata orang dewasa butuh 1.800–2.200 kkal/hari',
              style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: ctrl,
              keyboardType: TextInputType.number,
              decoration: const InputDecoration(
                labelText: 'Target kalori (kkal)',
                suffixText: 'kkal',
              ),
            ),
            const SizedBox(height: 16),
            MainButton(
              text: 'Simpan',
              onPressed: () async {
                final goal = int.tryParse(ctrl.text.trim());
                if (goal == null || goal < 500) return;
                await ApiService.updateUserProfile(user.id, {
                  'daily_calorie_goal': goal,
                });
                await context.read<AuthProvider>().refreshUser();
                if (mounted) Navigator.pop(context);
              },
              icon: Icons.check_rounded,
            ),
          ],
        ),
      ),
    );
  }

  void _editProfile() {
    final user = context.read<AuthProvider>().user!;
    final usernameCtrl = TextEditingController(text: user.username);
    final fullNameCtrl = TextEditingController(text: user.fullName ?? '');

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(24)),
      ),
      builder: (_) => Padding(
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
            const Text(
              'Edit profil',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: usernameCtrl,
              decoration: const InputDecoration(labelText: 'Username'),
            ),
            const SizedBox(height: 12),
            TextField(
              controller: fullNameCtrl,
              decoration: const InputDecoration(labelText: 'Nama lengkap'),
            ),
            const SizedBox(height: 16),
            MainButton(
              text: 'Simpan perubahan',
              onPressed: () async {
                await ApiService.updateUserProfile(user.id, {
                  'username': usernameCtrl.text.trim(),
                  'full_name': fullNameCtrl.text.trim(),
                });
                await context.read<AuthProvider>().refreshUser();
                if (mounted) Navigator.pop(context);
              },
              icon: Icons.check_rounded,
            ),
          ],
        ),
      ),
    );
  }

  void _confirmLogout() {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
        title: const Text('Keluar?'),
        content: const Text('Kamu yakin mau keluar dari akun ini?'),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text(
              'Batal',
              style: TextStyle(color: AppColors.textSecondary),
            ),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              context.read<AuthProvider>().logout();
            },
            child: const Text(
              'Keluar',
              style: TextStyle(color: AppColors.danger),
            ),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;
    if (user == null) return const SizedBox();

    return Scaffold(
      body: CustomScrollView(
        slivers: [
          const SliverAppBar(title: Text('Profil'), floating: true),
          SliverToBoxAdapter(
            child: Column(
              children: [
                // Avatar
                const SizedBox(height: 16),
                _Avatar(initials: user.initials),
                const SizedBox(height: 12),
                Text(
                  user.displayName,
                  style: const TextStyle(
                    fontSize: 20,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  user.email,
                  style: const TextStyle(
                    fontSize: 13,
                    color: AppColors.textSecondary,
                  ),
                ),
                const SizedBox(height: 20),

                // Stats row
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  child: Row(
                    children: [
                      Expanded(
                        child: StatBox(
                          value: '${user.calorieGoal}',
                          label: 'Target kkal/hari',
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: StatBox(value: user.username, label: 'Username'),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 24),

                // Settings list
                const Padding(
                  padding: EdgeInsets.fromLTRB(20, 0, 20, 8),
                  child: Align(
                    alignment: Alignment.centerLeft,
                    child: Text(
                      'PENGATURAN',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textTertiary,
                        letterSpacing: 0.8,
                      ),
                    ),
                  ),
                ),
                _SettingsItem(
                  icon: Icons.person_outline,
                  label: 'Edit profil',
                  onTap: _editProfile,
                ),
                _SettingsItem(
                  icon: Icons.track_changes_outlined,
                  label: 'Atur target kalori harian',
                  onTap: _editCalorieGoal,
                  trailing: Text(
                    '${user.calorieGoal} kkal',
                    style: const TextStyle(
                      fontSize: 13,
                      color: AppColors.primary,
                    ),
                  ),
                ),
                _SettingsItem(
                  icon: Icons.notifications_none_outlined,
                  label: 'Notifikasi',
                  onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const NotificationSettingsScreen(),
                    ),
                  ),
                ),
                _SettingsItem(
                  icon: Icons.lock_outline,
                  label: 'Ubah password',
                  onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const ChangePasswordScreen(),
                    ),
                  ),
                ),
                _SettingsItem(
                  icon: Icons.info_outline,
                  label: 'Tentang PiyoPlate',
                  onTap: () => Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const AboutScreen(),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                _SettingsItem(
                  icon: Icons.logout_rounded,
                  label: 'Keluar',
                  onTap: _confirmLogout,
                  isDestructive: true,
                ),
                const SizedBox(height: 48),
                const Text(
                  'PiyoPlate v1.0.0',
                  style: TextStyle(fontSize: 12, color: AppColors.textTertiary),
                ),
                const SizedBox(height: 32),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Avatar extends StatelessWidget {
  final String initials;
  const _Avatar({required this.initials});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 80,
      height: 80,
      alignment: Alignment.center,
      decoration: const BoxDecoration(
        color: AppColors.primaryLight,
        shape: BoxShape.circle,
      ),
      child: Text(
        initials,
        style: const TextStyle(
          fontSize: 28,
          fontWeight: FontWeight.w600,
          color: AppColors.primaryDark,
        ),
      ),
    );
  }
}

class _SettingsItem extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;
  final bool isDestructive;
  final Widget? trailing;

  const _SettingsItem({
    required this.icon,
    required this.label,
    required this.onTap,
    this.isDestructive = false,
    this.trailing,
  });

  @override
  Widget build(BuildContext context) {
    final color = isDestructive ? AppColors.danger : AppColors.textPrimary;
    final iconColor = isDestructive
        ? AppColors.danger
        : AppColors.textSecondary;

    return InkWell(
      onTap: onTap,
      child: Padding(
        padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 14),
        child: Row(
          children: [
            Icon(icon, size: 22, color: iconColor),
            const SizedBox(width: 14),
            Expanded(
              child: Text(label, style: TextStyle(fontSize: 15, color: color)),
            ),
            trailing ??
                Icon(
                  Icons.chevron_right,
                  size: 18,
                  color: AppColors.textTertiary,
                ),
          ],
        ),
      ),
    );
  }
}
