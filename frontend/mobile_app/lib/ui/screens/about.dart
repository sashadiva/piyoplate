import 'package:flutter/material.dart';
import '../../core/theme.dart';

class AboutScreen extends StatelessWidget {
  const AboutScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Tentang PiyoPlate')),
      body: ListView(
        padding: const EdgeInsets.all(20),
        children: [
          Center(
            child: Container(
              width: 72,
              height: 72,
              alignment: Alignment.center,
              decoration: const BoxDecoration(
                color: AppColors.primaryLight,
                shape: BoxShape.circle,
              ),
              child: const Icon(
                Icons.restaurant_menu_rounded,
                size: 34,
                color: AppColors.primaryDark,
              ),
            ),
          ),
          const SizedBox(height: 16),
          const Center(
            child: Text(
              'PiyoPlate',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
          ),
          const SizedBox(height: 4),
          const Center(
            child: Text(
              'Versi 1.0.0',
              style: TextStyle(fontSize: 13, color: AppColors.textSecondary),
            ),
          ),
          const SizedBox(height: 24),
          const _AboutSection(
            title: 'Apa itu PiyoPlate?',
            content:
                'PiyoPlate adalah aplikasi resep dan pelacak kalori yang '
                'membantu kamu memasak makanan sehat sekaligus memantau '
                'asupan kalori harian dengan mudah.',
          ),
          const _AboutSection(
            title: 'Fitur utama',
            content:
                '• Cari dan simpan resep favorit\n'
                '• Estimasi kalori otomatis dengan AI\n'
                '• Pelacakan kalori harian & mingguan\n'
                '• Ulasan dan rating resep dari komunitas',
          ),
          const _AboutSection(
            title: 'Kontak & dukungan',
            content:
                'Punya saran atau menemukan masalah? Hubungi tim kami di '
                'support@piyoplate.app',
          ),
          const SizedBox(height: 24),
          const Center(
            child: Text(
              '© 2026 PiyoPlate. Dibuat dengan 🧡 untuk hidup lebih sehat.',
              textAlign: TextAlign.center,
              style: TextStyle(fontSize: 12, color: AppColors.textTertiary),
            ),
          ),
          const SizedBox(height: 24),
        ],
      ),
    );
  }
}

class _AboutSection extends StatelessWidget {
  final String title;
  final String content;
  const _AboutSection({required this.title, required this.content});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            title,
            style: const TextStyle(
              fontSize: 14,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 6),
          Text(
            content,
            style: const TextStyle(
              fontSize: 13,
              color: AppColors.textSecondary,
              height: 1.5,
            ),
          ),
        ],
      ),
    );
  }
}
