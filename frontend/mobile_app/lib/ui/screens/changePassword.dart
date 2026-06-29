import 'package:flutter/material.dart';
import '../../data/services/apiServices.dart';
import '../../ui/widgets/mainButton.dart';
import '../../core/theme.dart';

class ChangePasswordScreen extends StatefulWidget {
  const ChangePasswordScreen({super.key});

  @override
  State<ChangePasswordScreen> createState() => _ChangePasswordScreenState();
}

class _ChangePasswordScreenState extends State<ChangePasswordScreen> {
  final _oldPassCtrl = TextEditingController();
  final _newPassCtrl = TextEditingController();
  final _confirmPassCtrl = TextEditingController();

  bool _obscureOld = true;
  bool _obscureNew = true;
  bool _obscureConfirm = true;
  bool _submitting = false;

  @override
  void dispose() {
    _oldPassCtrl.dispose();
    _newPassCtrl.dispose();
    _confirmPassCtrl.dispose();
    super.dispose();
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

  bool _validate() {
    if (_oldPassCtrl.text.isEmpty) {
      _showError('Masukkan password lama');
      return false;
    }
    if (_newPassCtrl.text.length < 6) {
      _showError('Password baru minimal 6 karakter');
      return false;
    }
    if (_newPassCtrl.text != _confirmPassCtrl.text) {
      _showError('Konfirmasi password tidak cocok');
      return false;
    }
    return true;
  }

  Future<void> _submit() async {
    if (!_validate()) return;
    setState(() => _submitting = true);
    try {
      await ApiService.changePassword(
        oldPassword: _oldPassCtrl.text,
        newPassword: _newPassCtrl.text,
      );
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Password berhasil diubah ✓'),
            backgroundColor: AppColors.primary,
            behavior: SnackBarBehavior.floating,
          ),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      _showError(e.toString().replaceFirst('Exception: ', ''));
    } finally {
      if (mounted) setState(() => _submitting = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Ubah password')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          const Text(
            'Pastikan password baru kamu mudah diingat tapi tetap aman.',
            style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
          ),
          const SizedBox(height: 24),
          TextField(
            controller: _oldPassCtrl,
            obscureText: _obscureOld,
            decoration: InputDecoration(
              labelText: 'Password lama',
              suffixIcon: IconButton(
                icon: Icon(
                  _obscureOld
                      ? Icons.visibility_off_outlined
                      : Icons.visibility_outlined,
                  size: 20,
                  color: AppColors.textTertiary,
                ),
                onPressed: () => setState(() => _obscureOld = !_obscureOld),
              ),
            ),
          ),
          const SizedBox(height: 14),
          TextField(
            controller: _newPassCtrl,
            obscureText: _obscureNew,
            decoration: InputDecoration(
              labelText: 'Password baru',
              suffixIcon: IconButton(
                icon: Icon(
                  _obscureNew
                      ? Icons.visibility_off_outlined
                      : Icons.visibility_outlined,
                  size: 20,
                  color: AppColors.textTertiary,
                ),
                onPressed: () => setState(() => _obscureNew = !_obscureNew),
              ),
            ),
          ),
          const SizedBox(height: 14),
          TextField(
            controller: _confirmPassCtrl,
            obscureText: _obscureConfirm,
            decoration: InputDecoration(
              labelText: 'Konfirmasi password baru',
              suffixIcon: IconButton(
                icon: Icon(
                  _obscureConfirm
                      ? Icons.visibility_off_outlined
                      : Icons.visibility_outlined,
                  size: 20,
                  color: AppColors.textTertiary,
                ),
                onPressed: () =>
                    setState(() => _obscureConfirm = !_obscureConfirm),
              ),
            ),
          ),
          const SizedBox(height: 28),
          MainButton(
            text: 'Simpan password baru',
            onPressed: _submit,
            isLoading: _submitting,
            icon: Icons.check_rounded,
          ),
        ],
      ),
    );
  }
}
