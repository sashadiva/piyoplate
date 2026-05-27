import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import '../../core/constants.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List recipes = [];
  bool isLoading = true;
  String searchQuery = "";

  @override
  void initState() {
    super.initState();
    fetchRecipes(); // Ambil data pas halaman dibuka
  }

  // Fungsi buat ambil data dari Backend NestJS
  Future<void> fetchRecipes() async {
    setState(() => isLoading = true);
    try {
      // Kita pakai satu endpoint getAll yang baru kita rapihin!
      final url = searchQuery.isEmpty
          ? '${AppConstants.baseUrl}/recipes'
          : '${AppConstants.baseUrl}/recipes?search=$searchQuery';

      final response = await http.get(Uri.parse(url));

      if (response.statusCode == 200) {
        setState(() {
          recipes = jsonDecode(response.body);
          isLoading = false;
        });
      }
    } catch (e) {
      print("Error ambil resep: $e");
      setState(() => isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'PiyoPlate 🐥',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        backgroundColor: Colors.green,
        foregroundColor: Colors.white,
      ),
      body: Column(
        children: [
          // 1. Kotak Pencarian
          Padding(
            padding: const EdgeInsets.all(16.0),
            child: TextField(
              onChanged: (value) {
                searchQuery = value;
                fetchRecipes(); // Langsung cari pas ngetik!
              },
              decoration: InputDecoration(
                hintText: 'Cari resep atau bahan...',
                prefixIcon: const Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
                filled: true,
                fillColor: Colors.grey[100],
              ),
            ),
          ),

          // 2. Daftar Resep
          Expanded(
            child: isLoading
                ? const Center(child: CircularProgressIndicator())
                : ListView.builder(
                    itemCount: recipes.length,
                    itemBuilder: (context, index) {
                      final recipe = recipes[index];
                      return Card(
                        margin: const EdgeInsets.symmetric(
                          horizontal: 16,
                          vertical: 8,
                        ),
                        child: ListTile(
                          leading: ClipRRect(
                            borderRadius: BorderRadius.circular(8),
                            child: Image.network(
                              recipe['image_url'] ??
                                  'https://via.placeholder.com/150',
                              width: 60,
                              height: 60,
                              fit: BoxFit.cover,
                            ),
                          ),
                          title: Text(
                            recipe['title'],
                            style: const TextStyle(fontWeight: FontWeight.bold),
                          ),
                          subtitle: Text(
                            '${recipe['calories_per_serving']} kkal • ${recipe['cuisine_type'] ?? 'Umum'}',
                          ),
                          trailing: const Icon(Icons.chevron_right),
                          onTap: () {
                            // Nanti pindah ke Detail Page
                          },
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
