import 'package:flutter/material.dart';
import 'package:mobile_app/login.dart';
import 'package:mobile_app/viewRecipe.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        primarySwatch: Colors.orange,
        fontFamily: 'Poppins', // Pastikan font ini terpasang jika ingin mirip
      ),
      home: const LoginPage(),
    );
  }
}
