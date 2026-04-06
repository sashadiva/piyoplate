import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import '../../core/constants.dart';
import '../models/recipe.dart';

class ApiService {
  // Mengambil URL dari constants agar rapi
  final String _baseUrl = AppConstants.baseUrl;

  // 1. MENGAMBIL SEMUA RESEP (Home Feed)
  Future<List<Recipe>> getAllRecipes() async {
    try {
      final response = await http.get(Uri.parse("$_baseUrl/recipes"));

      if (response.statusCode == 200) {
        final Map<String, dynamic> decodedData = jsonDecode(response.body);
        final List<dynamic> recipeList = decodedData['data'];

        // Mengubah List JSON menjadi List Object Recipe
        return recipeList.map((json) => Recipe.fromJson(json)).toList();
      } else {
        throw Exception("Gagal memuat resep: ${response.statusCode}");
      }
    } catch (e) {
      throw Exception("Kesalahan koneksi: $e");
    }
  }

  // 2. MENGAMBIL DETAIL RESEP (Berdasarkan ID)
  Future<Recipe> getRecipeById(int id) async {
    try {
      final response = await http.get(Uri.parse("$_baseUrl/recipes/$id"));

      if (response.statusCode == 200) {
        final Map<String, dynamic> decodedData = jsonDecode(response.body);
        return Recipe.fromJson(decodedData['data']);
      } else {
        throw Exception("Resep tidak ditemukan");
      }
    } catch (e) {
      throw Exception("Gagal mengambil detail resep: $e");
    }
  }

  // 3. LOG KALORI OTOMATIS (Saat Klik Tombol Masak)
  Future<bool> logNutrition(int userId, int recipeId) async {
    try {
      final response = await http.post(
        Uri.parse("$_baseUrl/logs/cook"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"user_id": userId, "recipe_id": recipeId}),
      );

      return response.statusCode == 200 || response.statusCode == 201;
    } catch (e) {
      print("Error logging nutrition: $e");
      return false;
    }
  }

  // 4. UPLOAD RESEP BARU (Multipart untuk Foto/Video)
  Future<bool> uploadRecipe({
    required int authorId,
    required String title,
    required String description,
    required int calories,
    required int cookTime,
    required String ingredients,
    required String instructions,
    required File imageFile,
  }) async {
    try {
      var request = http.MultipartRequest(
        'POST',
        Uri.parse("$_baseUrl/recipes"),
      );

      // Menambahkan field teks
      request.fields['author_id'] = authorId.toString();
      request.fields['title'] = title;
      request.fields['description'] = description;
      request.fields['calories_per_serving'] = calories.toString();
      request.fields['cook_time_minutes'] = cookTime.toString();
      request.fields['ingredients'] = ingredients;
      request.fields['instructions'] = instructions;

      // Menambahkan file gambar dari galeri
      var stream = http.ByteStream(imageFile.openRead());
      var length = await imageFile.length();
      var multipartFile = http.MultipartFile(
        'image', // Pastikan nama field ini sama dengan di Multer (Backend)
        stream,
        length,
        filename: imageFile.path.split('/').last,
      );

      request.files.add(multipartFile);

      // Eksekusi pengiriman
      var streamedResponse = await request.send();
      var response = await http.Response.fromStream(streamedResponse);

      return response.statusCode == 201;
    } catch (e) {
      print("Error uploading recipe: $e");
      return false;
    }
  }
}
