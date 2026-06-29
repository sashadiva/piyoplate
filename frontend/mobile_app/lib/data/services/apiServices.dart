import 'dart:convert';
import 'dart:io';
import 'dart:typed_data';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import '../../core/constants.dart';
import '../models/model.dart';

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

  /// Parse error message dari response backend NestJS
  static String _parseError(http.Response res, String fallback) {
    try {
      final body = jsonDecode(res.body);
      final msg = body['message'];
      if (msg is List) return msg.join(', ');
      if (msg is String) return msg;
    } catch (_) {}
    return fallback;
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
      throw Exception(_parseError(res, 'Registrasi gagal'));
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
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception(_parseError(res, 'Login gagal'));
    }
    final data = jsonDecode(res.body);
    await saveToken(data['access_token']);
    await saveUser(data['user']);
    return data;
  }

  // ── Recipes ───────────────────────────────────────────

  static Future<List<Recipe>> getRecipes({String? search}) async {
    final headers = await _authHeaders();
    final uri = Uri.parse('$baseUrl/recipes').replace(
      queryParameters: search != null && search.isNotEmpty
          ? {'search': search}
          : null,
    );
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
      throw Exception(_parseError(res, 'Gagal membuat resep'));
    }
    return jsonDecode(res.body);
  }

  static Future<Map<String, dynamic>> estimateCaloriesAI({
    required String title,
    required String ingredients,
    int servings = 1,
  }) async {
    final headers = await _authHeaders();
    final res = await http.post(
      Uri.parse('$baseUrl/recipes/ai/estimate-calories'),
      headers: headers,
      body: jsonEncode({
        'title': title,
        'ingredients': ingredients,
        'servings': servings,
      }),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception(_parseError(res, 'Gagal estimasi kalori'));
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
      throw Exception(_parseError(res, 'Gagal memasak resep'));
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

  static Future<List<WeeklyData>> getWeeklyData(int userId) async {
    final headers = await _authHeaders();
    final res = await http.get(
      Uri.parse('$baseUrl/nutrition/weekly/$userId'),
      headers: headers,
    );
    if (res.statusCode != 200) throw Exception('Gagal mengambil data mingguan');
    final List data = jsonDecode(res.body);
    return data.map((e) => WeeklyData.fromJson(e)).toList();
  }

  static Future<Map<String, dynamic>> getMonthlySummary(int userId) async {
    final headers = await _authHeaders();
    final res = await http.get(
      Uri.parse('$baseUrl/nutrition/monthly/$userId'),
      headers: headers,
    );
    if (res.statusCode != 200) throw Exception('Gagal mengambil data bulanan');
    return jsonDecode(res.body);
  }

  /// Log kalori MANUAL — user input nama + kalori sendiri
  static Future<Map<String, dynamic>> logManual({
    required String foodName,
    required int caloriesAdded,
    int? recipeId,
    String source = 'manual',
  }) async {
    final headers = await _authHeaders();
    final res = await http.post(
      Uri.parse('$baseUrl/nutrition/log/manual'),
      headers: headers,
      body: jsonEncode({
        'food_name': foodName,
        'calories_added': caloriesAdded,
        if (recipeId != null) 'recipe_id': recipeId,
        'source': source,
      }),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception(_parseError(res, 'Gagal menambah log'));
    }
    return jsonDecode(res.body);
  }

  /// Log kalori dari FOTO — terima bytes (Uint8List), works di Web & Mobile
  static Future<Map<String, dynamic>> logFromPhoto({
    required Uint8List imageBytes,
    String imageExt = 'jpg',
    String? portionNote,
  }) async {
    final headers = await _authHeaders();

    final base64Image = base64Encode(imageBytes);

    final mediaType = imageExt == 'png'
        ? 'image/png'
        : imageExt == 'webp'
        ? 'image/webp'
        : 'image/jpeg';

    final res = await http.post(
      Uri.parse('$baseUrl/nutrition/log/photo'),
      headers: headers,
      body: jsonEncode({
        'image_base64': base64Image,
        'media_type': mediaType,
        if (portionNote != null && portionNote.isNotEmpty)
          'portion_note': portionNote,
      }),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception(_parseError(res, 'Gagal memproses foto'));
    }
    return jsonDecode(res.body);
  }

  static Future<void> deleteLog(int logId) async {
    final headers = await _authHeaders();
    final res = await http.delete(
      Uri.parse('$baseUrl/nutrition/log/$logId'),
      headers: headers,
    );
    if (res.statusCode != 200) {
      throw Exception('Gagal menghapus log');
    }
  }

  // ── Bookmarks ─────────────────────────────────────────

  static Future<List<Recipe>> getBookmarks() async {
    final headers = await _authHeaders();
    final res = await http.get(
      Uri.parse('$baseUrl/bookmarks'),
      headers: headers,
    );
    if (res.statusCode != 200) throw Exception('Gagal mengambil bookmark');
    final List data = jsonDecode(res.body);
    return data.map((e) => Recipe.fromJson(e)).toList();
  }

  static Future<void> addBookmark(int recipeId) async {
    final headers = await _authHeaders();
    final res = await http.post(
      Uri.parse('$baseUrl/bookmarks/$recipeId'),
      headers: headers,
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception(_parseError(res, 'Gagal bookmark resep'));
    }
  }

  static Future<void> removeBookmark(int recipeId) async {
    final headers = await _authHeaders();
    final res = await http.delete(
      Uri.parse('$baseUrl/bookmarks/$recipeId'),
      headers: headers,
    );
    if (res.statusCode != 200) throw Exception('Gagal hapus bookmark');
  }

  static Future<bool> isBookmarked(int recipeId) async {
    final headers = await _authHeaders();
    final res = await http.get(
      Uri.parse('$baseUrl/bookmarks/check/$recipeId'),
      headers: headers,
    );
    if (res.statusCode != 200) return false;
    return jsonDecode(res.body)['bookmarked'] == true;
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
      throw Exception(_parseError(res, 'Gagal mengirim ulasan'));
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
    if (res.statusCode != 200) {
      throw Exception(_parseError(res, 'Gagal update profil'));
    }
    return User.fromJson(jsonDecode(res.body));
  }

  static Future<void> changePassword({
    required String oldPassword,
    required String newPassword,
  }) async {
    final headers = await _authHeaders();
    final res = await http.patch(
      Uri.parse('$baseUrl/users/change-password'),
      headers: headers,
      body: jsonEncode({
        'old_password': oldPassword,
        'new_password': newPassword,
      }),
    );
    if (res.statusCode != 200 && res.statusCode != 201) {
      throw Exception(_parseError(res, 'Gagal mengubah password'));
    }
  }

  static Future<String> uploadImage(File imageFile) async {
    final uri = Uri.parse('$baseUrl/upload'); // your upload endpoint
    final request = http.MultipartRequest('POST', uri);

    request.files.add(
      await http.MultipartFile.fromPath(
        'image', // field name your backend expects
        imageFile.path,
      ),
    );

    final response = await request.send();
    final body = await response.stream.bytesToString();
    final json = jsonDecode(body);

    if (response.statusCode == 200 || response.statusCode == 201) {
      return json['image_url'] as String; // whatever key your backend returns
    } else {
      throw Exception('Gagal upload gambar: ${json['message']}');
    }
  }
}
