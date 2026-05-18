class Recipe {
  final int id;
  final String title;
  final int calories;
  final String? imageUrl;

  Recipe({
    required this.id,
    required this.title,
    required this.calories,
    this.imageUrl,
  });

  factory Recipe.fromJson(Map<String, dynamic> json) {
    return Recipe(
      id: json['id'],
      title: json['title'],
      calories: json['calories_per_serving'],
      imageUrl: json['image_url'],
    );
  }
}
