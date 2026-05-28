import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:mobile_app/core/theme.dart';
import 'package:mobile_app/ui/screens/login.dart';
import 'package:mobile_app/ui/screens/register.dart';
import 'package:mobile_app/data/services/authProvider.dart';
import 'package:mobile_app/ui/screens/mainShell.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => AuthProvider()..tryAutoLogin(),
      child: const MyApp(),
    ),
  );
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'PiyoPlate',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      home: const _RootScreen(),
    );
  }
}

class _RootScreen extends StatelessWidget {
  const _RootScreen();

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (_, auth, __) {
        if (auth.isLoggedIn) return const MainShell();
        return const _AuthFlow();
      },
    );
  }
}

class _AuthFlow extends StatefulWidget {
  const _AuthFlow();

  @override
  State<_AuthFlow> createState() => _AuthFlowState();
}

class _AuthFlowState extends State<_AuthFlow> {
  bool _showLogin = true;

  @override
  Widget build(BuildContext context) {
    return _showLogin
        ? LoginScreen(
            onNavigateToRegister: () => setState(() => _showLogin = false),
          )
        : RegisterScreen(
            onNavigateToLogin: () => setState(() => _showLogin = true),
          );
  }
}
