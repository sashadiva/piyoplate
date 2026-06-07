class Recipe {
  final int id;
  final String title;
  final String cuisineType;
  final String ingredients;
  final String instructions;
  final int caloriesPerServing;
  final String? imageUrl;
  final int authorId;
  final String authorName;
  final double avgRating;
  final int reviewCount;
  final int cookingDurationMinutes;
  final String? aiCalorieBreakdown;

  const Recipe({
    required this.id,
    required this.title,
    required this.cuisineType,
    required this.ingredients,
    required this.instructions,
    required this.caloriesPerServing,
    this.imageUrl,
    required this.authorId,
    required this.authorName,
    this.avgRating = 0,
    this.reviewCount = 0,
    this.cookingDurationMinutes = 0,
    this.aiCalorieBreakdown,
  });

  factory Recipe.fromJson(Map<String, dynamic> json) => Recipe(
    id: json['id'],
    title: json['title'],
    cuisineType: json['cuisine_type'] ?? '',
    ingredients: json['ingredients'],
    instructions: json['instructions'],
    caloriesPerServing: json['calories_per_serving'],
    imageUrl: json['image_url'],
    authorId: json['author_id'],
    authorName: json['author']?['username'] ?? 'Unknown',
    avgRating: (json['avgRating'] ?? 0).toDouble(),
    reviewCount: json['_count']?['reviews'] ?? 0,
    cookingDurationMinutes: json['cook_time_minutes'] ?? 0,
    aiCalorieBreakdown: json['ai_calorie_breakdown'],
  );

  List<String> get ingredientList =>
      ingredients.split(',').map((e) => e.trim()).toList();

  List<String> get stepList =>
      instructions.split('. ').where((s) => s.isNotEmpty).toList();
}

class NutritionLog {
  final int id;
  final int userId;
  final int? recipeId;
  final String? foodName;
  final int caloriesAdded;
  final DateTime loggedAt;
  final String? recipeTitle;
  final String source; // 'recipe' | 'manual' | 'photo'
  final String? aiConfidence;
  final String? aiBreakdown;

  const NutritionLog({
    required this.id,
    required this.userId,
    this.recipeId,
    this.foodName,
    required this.caloriesAdded,
    required this.loggedAt,
    this.recipeTitle,
    this.source = 'manual',
    this.aiConfidence,
    this.aiBreakdown,
  });

  factory NutritionLog.fromJson(Map<String, dynamic> json) => NutritionLog(
    id: json['id'],
    userId: json['user_id'],
    recipeId: json['recipe_id'],
    foodName: json['food_name'],
    caloriesAdded: json['calories_added'],
    loggedAt: DateTime.parse(json['logged_at']),
    recipeTitle: json['recipe']?['title'],
    source: json['source'] ?? 'manual',
    aiConfidence: json['ai_confidence'],
    aiBreakdown: json['ai_breakdown'],
  );

  String get displayName => recipeTitle ?? foodName ?? 'Unknown food';

  // Icon berdasarkan sumber log
  String get sourceLabel {
    switch (source) {
      case 'recipe':
        return 'dari resep';
      case 'photo':
        return 'dari foto AI';
      default:
        return 'manual';
    }
  }
}

class Review {
  final int id;
  final int userId;
  final int recipeId;
  final int rating;
  final String? comment;
  final String username;

  const Review({
    required this.id,
    required this.userId,
    required this.recipeId,
    required this.rating,
    this.comment,
    required this.username,
  });

  factory Review.fromJson(Map<String, dynamic> json) => Review(
    id: json['id'],
    userId: json['user_id'],
    recipeId: json['recipe_id'],
    rating: json['rating'],
    comment: json['comment'],
    username: json['user']?['username'] ?? 'User',
  );
}

class User {
  final int id;
  final String username;
  final String email;
  final String? fullName;
  final int? dailyCalorieGoal;
  final String? profilePictureUrl;

  const User({
    required this.id,
    required this.username,
    required this.email,
    this.fullName,
    this.dailyCalorieGoal,
    this.profilePictureUrl,
  });

  factory User.fromJson(Map<String, dynamic> json) => User(
    id: json['id'],
    username: json['username'],
    email: json['email'],
    fullName: json['full_name'],
    dailyCalorieGoal: json['daily_calorie_goal'],
    profilePictureUrl: json['profile_picture_url'],
  );

  int get calorieGoal => dailyCalorieGoal ?? 2000;
  String get displayName => fullName ?? username;
  String get initials {
    final name = displayName;
    final parts = name.split(' ');
    if (parts.length >= 2) return '${parts[0][0]}${parts[1][0]}'.toUpperCase();
    return name.substring(0, name.length > 1 ? 2 : 1).toUpperCase();
  }
}

class DailySummary {
  final int dailyGoal;
  final num totalConsumed;
  final num remainingCalories;
  final String status;
  final int progressPercent;
  final Map<String, int> bySource;
  final List<NutritionLog> logs;

  const DailySummary({
    required this.dailyGoal,
    required this.totalConsumed,
    required this.remainingCalories,
    required this.status,
    this.progressPercent = 0,
    this.bySource = const {},
    this.logs = const [],
  });

  factory DailySummary.fromJson(Map<String, dynamic> json) {
    final src = json['by_source'] as Map<String, dynamic>? ?? {};
    final logsList = (json['logs'] as List? ?? [])
        .map((e) => NutritionLog.fromJson(e))
        .toList();
    return DailySummary(
      dailyGoal: json['daily_goal'],
      totalConsumed: json['total_consumed'],
      remainingCalories: json['remaining_calories'],
      status: json['status'],
      progressPercent: json['progress_percent'] ?? 0,
      bySource: {
        'recipe': src['from_recipe'] ?? 0,
        'manual': src['from_manual'] ?? 0,
        'photo': src['from_photo'] ?? 0,
      },
      logs: logsList,
    );
  }

  double get progressFraction =>
      (totalConsumed / dailyGoal).clamp(0.0, 1.0).toDouble();
  bool get isOverLimit => status == 'Overlimit';
}

class WeeklyData {
  final String date;
  final int totalCalories;
  final int logsCount;

  const WeeklyData({
    required this.date,
    required this.totalCalories,
    required this.logsCount,
  });

  factory WeeklyData.fromJson(Map<String, dynamic> json) => WeeklyData(
    date: json['date'],
    totalCalories: json['total_calories'] ?? 0,
    logsCount: json['logs_count'] ?? 0,
  );

  // Label hari singkat: 'Sen', 'Sel', dst
  String get dayLabel {
    final d = DateTime.parse(date);
    const labels = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'];
    return labels[d.weekday - 1];
  }

  bool get isToday {
    final d = DateTime.parse(date);
    final now = DateTime.now();
    return d.day == now.day && d.month == now.month && d.year == now.year;
  }
}

// Model untuk AI calorie estimate result
class AiCalorieResult {
  final int caloriesPerServing;
  final String breakdown;
  final String notes;

  const AiCalorieResult({
    required this.caloriesPerServing,
    required this.breakdown,
    required this.notes,
  });

  factory AiCalorieResult.fromJson(Map<String, dynamic> json) =>
      AiCalorieResult(
        caloriesPerServing: json['calories_per_serving'] ?? 0,
        breakdown: json['breakdown'] ?? '',
        notes: json['notes'] ?? '',
      );
}

// Ingredient model for Add Recipe form
class IngredientInput {
  String name;
  String qty;
  String unit;

  IngredientInput({this.name = '', this.qty = '', this.unit = 'gr'});
}
