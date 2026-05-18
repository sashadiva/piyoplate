import 'package:flutter/material.dart';
import 'package:mobile_app/ui/widgets/mainButton.dart';
import 'package:mobile_app/ui/widgets/customTextFields.dart';

class RegisterPage extends StatefulWidget {
  const RegisterPage({super.key});

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 24.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const SizedBox(height: 60),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          "Create an account",
                          style: TextStyle(
                            fontSize: 28,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        SizedBox(height: 8),
                        Text(
                          "Let's get your account set up, it won't take long.",
                          style: TextStyle(color: Colors.black54),
                        ),
                      ],
                    ),
                  ),
                  // FIX 1: Ganti Image.asset dengan Icon supaya tidak error
                  Container(
                    height: 100,
                    width: 100,
                    decoration: BoxDecoration(
                      color: const Color(0xFFFFEDD5),
                      borderRadius: BorderRadius.circular(16),
                    ),
                    child: const Icon(
                      Icons.pets,
                      size: 50,
                      color: Color(0xFFFF9830),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 30),
              const CustomTextField(label: "Username", hint: "Enter Name"),
              const CustomTextField(label: "Email", hint: "Enter Email"),
              const CustomTextField(
                label: "Password",
                hint: "Enter Password",
                isPassword: true,
              ),
              const CustomTextField(
                label: "Confirm Password",
                hint: "Retype Password",
                isPassword: true,
              ),
              const SizedBox(height: 20),
              MainButton(text: "Register", onPressed: () {}),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Already a member?"),
                  TextButton(
                    onPressed: () => Navigator.pop(context),
                    child: const Text(
                      "Log in",
                      // FIX 2: Tambahkan TextStyle wrapper yang hilang
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
      ),
    );
  }
}
