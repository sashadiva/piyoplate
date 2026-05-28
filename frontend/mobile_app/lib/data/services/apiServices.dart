import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../../data/models/model.dart';
import '../../core/constants.dart';

class ApiService {
  static const String baseUrl = AppConstants.baseUrl;

  static Future<String?> getToken() async {
    final prefs = await SharedPreferences.getInstance();
    return prefs.getString('access_token');
  }

  static Future<void> saveToken(String token) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('access_token', token);
  }

  static Future<void> saveUser(Map<String, dynamic> user) async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('user', jsonEncode(user));
  }

  static Future<Map<String, dynamic>?> getSavedUser() async {
    final prefs = await SharedPreferences.getInstance();
    final str = prefs.getString('user');
    if (str == null) return null;
    return jsonDecode(str);
  }

  static Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('access_token');
    await prefs.remove('user');
  }

  static Future<Map<String, String>> _authHeaders() async {
    final token = await getToken();
    return {
      'Content-Type': 'application/json',
      if (token != null) 'Authorization': 'Bearer $token',
    };
  }

  // ── Auth ──────────────────────────────────────────────
  static Future<Map<String, dynamic>> register({
    required String username,
    required String email,
    required String password,
  }) async {
    final res = await http.post(
      Uri.parse('$baseUrl/auth/register'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'username': username,
        'email': email,
        'password': password,
      }),
    );
    final data = jsonDecode(res.body);
    if (res.statusCode != 201 && res.statusCode != 200) {
      throw Exception(data['message'] ?? 'Registrasi gagal');
    }
    return data;
  }

  static Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    final res = await http.post(
      Uri.parse('$baseUrl/auth/login'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'password': password}),
    );
    final data = jsonDecode(res.body);
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception(data['message'] ?? 'Login gagal');
    }
    await saveToken(data['access_token']);
    await saveUser(data['user']);
    return data;
  }

  // ── Recipes ───────────────────────────────────────────
  static Future<List<Recipe>> getRecipes({String? search}) async {
    final headers = await _authHeaders();
    final uri = Uri.parse(
      '$baseUrl/recipes',
    ).replace(queryParameters: search != null ? {'search': search} : null);
    final res = await http.get(uri, headers: headers);
    if (res.statusCode != 200) throw Exception('Gagal mengambil resep');
    final List data = jsonDecode(res.body);
    return data.map((e) => Recipe.fromJson(e)).toList();
  }

  static Future<Recipe> getRecipeDetail(int id) async {
    final headers = await _authHeaders();
    final res = await http.get(
      Uri.parse('$baseUrl/recipes/$id'),
      headers: headers,
    );
    if (res.statusCode != 200) throw Exception('Resep tidak ditemukan');
    return Recipe.fromJson(jsonDecode(res.body));
  }

  static Future<Map<String, dynamic>> createRecipe(
    Map<String, dynamic> data,
  ) async {
    final headers = await _authHeaders();
    final res = await http.post(
      Uri.parse('$baseUrl/recipes'),
      headers: headers,
      body: jsonEncode(data),
    );
    if (res.statusCode != 201 && res.statusCode != 200) {
      throw Exception('Gagal membuat resep');
    }
    return jsonDecode(res.body);
  }

  static Future<Map<String, dynamic>> cookRecipe(int recipeId) async {
    final headers = await _authHeaders();
    final res = await http.post(
      Uri.parse('$baseUrl/recipes/$recipeId/cook'),
      headers: headers,
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception('Gagal memasak resep');
    }
    return jsonDecode(res.body);
  }

  // ── Nutrition ─────────────────────────────────────────
  static Future<DailySummary> getDailySummary(int userId) async {
    final headers = await _authHeaders();
    final res = await http.get(
      Uri.parse('$baseUrl/nutrition/summary/$userId'),
      headers: headers,
    );
    if (res.statusCode != 200) throw Exception('Gagal mengambil summary');
    return DailySummary.fromJson(jsonDecode(res.body));
  }

  static Future<List<NutritionLog>> getNutritionHistory(int userId) async {
    final headers = await _authHeaders();
    final res = await http.get(
      Uri.parse('$baseUrl/nutrition/history/$userId'),
      headers: headers,
    );
    if (res.statusCode != 200) throw Exception('Gagal mengambil riwayat');
    final List data = jsonDecode(res.body);
    return data.map((e) => NutritionLog.fromJson(e)).toList();
  }

  static Future<Map<String, dynamic>> addNutritionLog({
    int? recipeId,
    String? foodName,
    required int caloriesAdded,
  }) async {
    final headers = await _authHeaders();
    final res = await http.post(
      Uri.parse('$baseUrl/nutrition/log'),
      headers: headers,
      body: jsonEncode({
        if (recipeId != null) 'recipe_id': recipeId,
        if (foodName != null) 'food_name': foodName,
        'calories_added': caloriesAdded,
      }),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception('Gagal menambah log');
    }
    return jsonDecode(res.body);
  }

  // ── Reviews ───────────────────────────────────────────
  static Future<List<Review>> getRecipeReviews(int recipeId) async {
    final headers = await _authHeaders();
    final res = await http.get(
      Uri.parse('$baseUrl/review/recipe/$recipeId'),
      headers: headers,
    );
    if (res.statusCode != 200) throw Exception('Gagal mengambil ulasan');
    final List data = jsonDecode(res.body);
    return data.map((e) => Review.fromJson(e)).toList();
  }

  static Future<Review> createReview({
    required int recipeId,
    required int rating,
    String? comment,
  }) async {
    final headers = await _authHeaders();
    final res = await http.post(
      Uri.parse('$baseUrl/review'),
      headers: headers,
      body: jsonEncode({
        'recipe_id': recipeId,
        'rating': rating,
        if (comment != null) 'comment': comment,
      }),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception('Gagal mengirim ulasan');
    }
    return Review.fromJson(jsonDecode(res.body));
  }

  // ── Users ─────────────────────────────────────────────
  static Future<User> getUserProfile(int id) async {
    final headers = await _authHeaders();
    final res = await http.get(
      Uri.parse('$baseUrl/users/profile/$id'),
      headers: headers,
    );
    if (res.statusCode != 200) throw Exception('User tidak ditemukan');
    return User.fromJson(jsonDecode(res.body));
  }

  static Future<User> updateUserProfile(
    int id,
    Map<String, dynamic> data,
  ) async {
    final headers = await _authHeaders();
    final res = await http.patch(
      Uri.parse('$baseUrl/users/profile/$id'),
      headers: headers,
      body: jsonEncode(data),
    );
    if (res.statusCode != 200) throw Exception('Gagal update profil');
    return User.fromJson(jsonDecode(res.body));
  }
}
