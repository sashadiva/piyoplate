import 'dart:convert';
import 'package:flutter/material.dart';
import '../../core/theme.dart';
import '../../data/models/model.dart';

class RecipeCard extends StatelessWidget {
  final Recipe recipe;
  final VoidCallback onTap;
  final bool isBookmarked;
  final VoidCallback? onBookmark;

  const RecipeCard({
    super.key,
    required this.recipe,
    required this.onTap,
    this.isBookmarked = false,
    this.onBookmark,
  });

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        decoration: BoxDecoration(
          color: AppColors.surface,
          borderRadius: BorderRadius.circular(16),
          border: Border.all(color: AppColors.border, width: 0.5),
        ),
        clipBehavior: Clip.antiAlias,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _RecipeImage(
              imageUrl: recipe.imageUrl,
              cuisineType: recipe.cuisineType,
              isBookmarked: isBookmarked,
              onBookmark: onBookmark,
            ),
            Padding(
              padding: const EdgeInsets.all(10),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    recipe.title,
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w500,
                      color: AppColors.textPrimary,
                      height: 1.3,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      Flexible(
                        child: Text(
                          recipe.authorName,
                          overflow: TextOverflow.ellipsis,
                          style: const TextStyle(
                            fontSize: 11,
                            color: AppColors.textSecondary,
                          ),
                        ),
                      ),
                      Text(
                        '${recipe.caloriesPerServing} kkal',
                        style: const TextStyle(
                          fontSize: 11,
                          color: AppColors.primary,
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                    ],
                  ),
                  if (recipe.cookingDurationMinutes > 0) ...[
                    const SizedBox(height: 4),
                    Row(
                      children: [
                        const Icon(
                          Icons.timer_outlined,
                          size: 12,
                          color: AppColors.textTertiary,
                        ),
                        const SizedBox(width: 3),
                        Text(
                          '${recipe.cookingDurationMinutes} mnt',
                          style: const TextStyle(
                            fontSize: 11,
                            color: AppColors.textTertiary,
                          ),
                        ),
                        const SizedBox(width: 8),
                        const Icon(
                          Icons.star_rounded,
                          size: 12,
                          color: AppColors.amber,
                        ),
                        const SizedBox(width: 3),
                        Text(
                          recipe.avgRating.toStringAsFixed(1),
                          style: const TextStyle(
                            fontSize: 11,
                            color: AppColors.textTertiary,
                          ),
                        ),
                      ],
                    ),
                  ],
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _RecipeImage extends StatelessWidget {
  final String? imageUrl;
  final String cuisineType;
  final bool isBookmarked;
  final VoidCallback? onBookmark;

  const _RecipeImage({
    this.imageUrl,
    required this.cuisineType,
    required this.isBookmarked,
    this.onBookmark,
  });

  Color get _gradientStart {
    switch (cuisineType.toLowerCase()) {
      case 'indonesia':
        return const Color(0xFFFFCC80); // orange muda
      case 'western':
        return const Color(0xFFFFAB91); // salmon
      case 'asia':
        return const Color(0xFFF5C4B3); // peach
      case 'vegetarian':
        return const Color(0xFFC0DD97); // hijau muda
      case 'dessert':
        return const Color(0xFFF8BBD0); // pink
      default:
        return AppColors.primaryLight;
    }
  }

  Color get _gradientEnd {
    switch (cuisineType.toLowerCase()) {
      case 'indonesia':
        return AppColors.primaryDark;
      case 'western':
        return const Color(0xFFD35400);
      case 'asia':
        return const Color(0xFFBF360C);
      case 'vegetarian':
        return const Color(0xFF558B2F);
      case 'dessert':
        return const Color(0xFFE91E63);
      default:
        return AppColors.primary;
    }
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        if (imageUrl != null && imageUrl!.isNotEmpty)
          _buildImage()
        else
          _placeholder(),
        if (onBookmark != null)
          Positioned(
            top: 6,
            right: 6,
            child: GestureDetector(
              onTap: onBookmark,
              child: Container(
                width: 28,
                height: 28,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.9),
                  shape: BoxShape.circle,
                ),
                child: Icon(
                  isBookmarked ? Icons.bookmark : Icons.bookmark_border,
                  size: 16,
                  color: isBookmarked
                      ? AppColors.primary
                      : AppColors.textSecondary,
                ),
              ),
            ),
          ),
      ],
    );
  }

  Widget _buildImage() {
    final url = imageUrl!;
    // Support base64 data URL (data:image/...;base64,...)
    if (url.startsWith('data:')) {
      try {
        final comma = url.indexOf(',');
        if (comma != -1) {
          final bytes = base64Decode(url.substring(comma + 1));
          return Image.memory(
            bytes,
            height: 110,
            width: double.infinity,
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => _placeholder(),
          );
        }
      } catch (_) {}
      return _placeholder();
    }
    return Image.network(
      url,
      height: 110,
      width: double.infinity,
      fit: BoxFit.cover,
      errorBuilder: (_, __, ___) => _placeholder(),
    );
  }

  Widget _placeholder() => Container(
    height: 110,
    decoration: BoxDecoration(
      gradient: LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [_gradientStart, _gradientEnd],
      ),
    ),
    child: const Center(
      child: Icon(Icons.restaurant, size: 36, color: Colors.white70),
    ),
  );
}
