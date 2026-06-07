import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../data/services/authProvider.dart';
import '../../core/theme.dart';
import '../../ui/screens/Login.dart';
import '../../ui/screens/Register.dart';
import '../../ui/screens/mainShell.dart';

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
