import 'package:flutter/material.dart';

class AppTheme {
  // 1. Definisi Warna Utama
  static const Color primaryGreen = Color(0xFF4CAF50); // Hijau Segar
  static const Color secondaryOrange = Color(0xFFFF9800); // Oranye Energi
  static const Color backgroundWhite = Color(0xFFF5F5F5); // Abu-abu sangat muda
  static const Color textDark = Color(0xFF212121); // Hitam elegan

  static ThemeData get lightTheme {
    return ThemeData(
      useMaterial3: true,
      colorScheme: ColorScheme.fromSeed(
        seedColor: primaryGreen,
        primary: primaryGreen,
        secondary: secondaryOrange,
        surface: Colors.white,
      ),
      scaffoldBackgroundColor: backgroundWhite,

      // 2. Gaya Teks (Typography)
      textTheme: const TextTheme(
        displayLarge: TextStyle(
          fontSize: 24,
          fontWeight: FontWeight.bold,
          color: textDark,
        ),
        bodyLarge: TextStyle(fontSize: 16, color: textDark),
        bodyMedium: TextStyle(fontSize: 14, color: Colors.grey),
      ),

      // 3. Gaya Card (Untuk Resep)
      // cardTheme: CardTheme(
      //   elevation: 2,
      //   shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
      //   color: Colors.white,
      // ),

      // 4. Gaya Button
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primaryGreen,
          foregroundColor: Colors.white,
          textStyle: const TextStyle(fontWeight: FontWeight.bold),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
          padding: const EdgeInsets.symmetric(vertical: 16),
        ),
      ),

      // 5. Gaya AppBar
      appBarTheme: const AppBarTheme(
        backgroundColor: primaryGreen,
        foregroundColor: Colors.white,
        elevation: 0,
        centerTitle: true,
      ),
    );
  }
}
