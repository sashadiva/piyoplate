import 'package:flutter/material.dart';
import 'package:mobile_app/ui/screens/login.dart';
// import 'package:mobile_app/viewRecipe.dart';
import 'package:firebase_core/firebase_core.dart';
import 'firebase_options.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // 2. Hidupkan Firebase
  await Firebase.initializeApp(options: DefaultFirebaseOptions.currentPlatform);
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
