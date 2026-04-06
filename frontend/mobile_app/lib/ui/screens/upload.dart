import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import '../../data/services/apiServices.dart';
import '../../core/theme.dart';

class UploadScreen extends StatefulWidget {
  const UploadScreen({super.key});

  @override
  State<UploadScreen> createState() => _UploadScreenState();
}

class _UploadScreenState extends State<UploadScreen> {
  // Controller untuk mengambil teks dari input
  final _titleController = TextEditingController();
  final _descController = TextEditingController();
  final _calorieController = TextEditingController();
  final _timeController = TextEditingController();
  final _ingredientController = TextEditingController();
  final _instructionController = TextEditingController();

  File? _selectedImage;
  bool _isLoading = false;
  final _apiService = ApiService();
  final _picker = ImagePicker();

  // Fungsi untuk mengambil gambar dari galeri
  Future<void> _pickImage() async {
    final pickedFile = await _picker.pickImage(
      source: ImageSource.gallery,
      imageQuality: 70, // Kompres gambar agar tidak terlalu berat saat upload
    );

    if (pickedFile != null) {
      setState(() {
        _selectedImage = File(pickedFile.path);
      });
    }
  }

  // Fungsi untuk mengirim data ke backend
  Future<void> _submitRecipe() async {
    // Validasi sederhana
    if (_selectedImage == null ||
        _titleController.text.isEmpty ||
        _calorieController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text("Mohon lengkapi foto, judul, dan kalori!"),
        ),
      );
      return;
    }

    setState(() => _isLoading = true);

    try {
      final success = await _apiService.uploadRecipe(
        authorId: 1, // Sementara hardcode ID User (nanti ambil dari data login)
        title: _titleController.text,
        description: _descController.text,
        calories: int.parse(_calorieController.text),
        cookTime: int.parse(_timeController.text),
        ingredients: _ingredientController.text,
        instructions: _instructionController.text,
        imageFile: _selectedImage!,
      );

      if (success) {
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text("Resep berhasil dibagikan! 🎉")),
          );
          Navigator.pop(context); // Kembali ke beranda setelah berhasil
        }
      }
    } catch (e) {
      ScaffoldMessenger.of(
        context,
      ).showSnackBar(SnackBar(content: Text("Gagal upload: $e")));
    } finally {
      setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Bagikan Resep Sehat")),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : SingleChildScrollView(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Area Pilih Gambar
                  GestureDetector(
                    onTap: _pickImage,
                    child: Container(
                      height: 200,
                      width: double.infinity,
                      decoration: BoxDecoration(
                        color: Colors.grey[200],
                        borderRadius: BorderRadius.circular(16),
                        border: Border.all(color: Colors.grey[300]!),
                      ),
                      child: _selectedImage == null
                          ? const Column(
                              mainAxisAlignment: MainAxisAlignment.center,
                              children: [
                                Icon(
                                  Icons.add_a_photo,
                                  size: 50,
                                  color: Colors.grey,
                                ),
                                Text(
                                  "Ketuk untuk pilih foto masakan",
                                  style: TextStyle(color: Colors.grey),
                                ),
                              ],
                            )
                          : ClipRRect(
                              borderRadius: BorderRadius.circular(16),
                              child: Image.file(
                                _selectedImage!,
                                fit: BoxFit.cover,
                              ),
                            ),
                    ),
                  ),
                  const SizedBox(height: 20),

                  // Form Input
                  _buildTextField(
                    _titleController,
                    "Nama Masakan (Contoh: Salad Ayam)",
                  ),
                  _buildTextField(
                    _descController,
                    "Deskripsi Singkat",
                    maxLines: 2,
                  ),

                  Row(
                    children: [
                      Expanded(
                        child: _buildTextField(
                          _calorieController,
                          "Kalori (kkal)",
                          isNumber: true,
                        ),
                      ),
                      const SizedBox(width: 10),
                      Expanded(
                        child: _buildTextField(
                          _timeController,
                          "Durasi (menit)",
                          isNumber: true,
                        ),
                      ),
                    ],
                  ),

                  _buildTextField(
                    _ingredientController,
                    "Bahan-bahan",
                    maxLines: 4,
                  ),
                  _buildTextField(
                    _instructionController,
                    "Langkah Memasak",
                    maxLines: 4,
                  ),

                  const SizedBox(height: 30),

                  // Tombol Submit
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton(
                      onPressed: _submitRecipe,
                      child: const Text("POSTING RESEP SEKARANG"),
                    ),
                  ),
                ],
              ),
            ),
    );
  }

  // Widget pembantu untuk membuat TextField agar kode tidak berulang
  Widget _buildTextField(
    TextEditingController controller,
    String label, {
    int maxLines = 1,
    bool isNumber = false,
  }) {
    return Padding(
      padding: const EdgeInsets.only(bottom: 16),
      child: TextField(
        controller: controller,
        maxLines: maxLines,
        keyboardType: isNumber ? TextInputType.number : TextInputType.text,
        decoration: InputDecoration(
          labelText: label,
          alignLabelWithHint: true,
          border: OutlineInputBorder(borderRadius: BorderRadius.circular(12)),
        ),
      ),
    );
  }
}
