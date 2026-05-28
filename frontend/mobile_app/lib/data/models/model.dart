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
    cookingDurationMinutes: json['cooking_duration_minutes'] ?? 0,
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

  const NutritionLog({
    required this.id,
    required this.userId,
    this.recipeId,
    this.foodName,
    required this.caloriesAdded,
    required this.loggedAt,
    this.recipeTitle,
  });

  factory NutritionLog.fromJson(Map<String, dynamic> json) => NutritionLog(
    id: json['id'],
    userId: json['user_id'],
    recipeId: json['recipe_id'],
    foodName: json['food_name'],
    caloriesAdded: json['calories_added'],
    loggedAt: DateTime.parse(json['logged_at']),
    recipeTitle: json['recipe']?['title'],
  );

  String get displayName => recipeTitle ?? foodName ?? 'Unknown food';
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

  const DailySummary({
    required this.dailyGoal,
    required this.totalConsumed,
    required this.remainingCalories,
    required this.status,
  });

  factory DailySummary.fromJson(Map<String, dynamic> json) => DailySummary(
    dailyGoal: json['daily_goal'],
    totalConsumed: json['total_consumed'],
    remainingCalories: json['remaining_calories'],
    status: json['status'],
  );

  double get progressPercent =>
      (totalConsumed / dailyGoal).clamp(0.0, 1.0).toDouble();
  bool get isOverLimit => status == 'Overlimit';
}

// Ingredient model for Add Recipe form
class IngredientInput {
  String name;
  String qty;
  String unit;

  IngredientInput({this.name = '', this.qty = '', this.unit = 'gr'});
}
