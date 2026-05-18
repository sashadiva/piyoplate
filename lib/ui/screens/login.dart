import 'package:flutter/material.dart';
import 'package:mobile_app/ui/screens/register.dart';
import 'package:mobile_app/ui/widgets/mainButton.dart';
import 'package:mobile_app/ui/widgets/customTextFields.dart';
import 'package:mobile_app/ui/widgets/waveClipper.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({super.key});

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Column(
          children: [
            Stack(
              children: [
                ClipPath(
                  clipper: WaveClipper(),
                  child: Container(height: 280, color: const Color(0xFFF5F5F5)),
                ),
                Positioned(
                  bottom: 40,
                  left: 0,
                  right: 0,
                  child: Image.asset('assets/images/login.png', height: 140),
                ),
              ],
            ),
            Padding(
              padding: const EdgeInsets.all(24.0),
              child: Column(
                children: [
                  const Text(
                    "Hello,",
                    style: TextStyle(fontSize: 32, fontWeight: FontWeight.bold),
                  ),
                  const Text(
                    "Welcome Back!",
                    style: TextStyle(fontSize: 24, color: Colors.black54),
                  ),
                  const SizedBox(height: 30),
                  const CustomTextField(label: "Email", hint: "Enter Email"),
                  const CustomTextField(
                    label: "Enter Password",
                    hint: "Enter Password",
                    isPassword: true,
                  ),
                  Align(
                    alignment: Alignment.centerLeft,
                    child: TextButton(
                      onPressed: () {},
                      child: const Text(
                        "Forgot Password?",
                        style: TextStyle(color: Color(0xFFFF9830)),
                      ),
                    ),
                  ),
                  const SizedBox(height: 20),
                  MainButton(text: "Log in", onPressed: () {}),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      const Text("Don't have an account?"),
                      TextButton(
                        onPressed: () => Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) => const RegisterPage(),
                          ),
                        ),
                        child: const Text(
                          "Register",
                          style: TextStyle(
                            color: Color(0xFFFF9830),
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
