import 'package:flutter/material.dart';
import '../../data/models/model.dart';
import '../../core/theme.dart';

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
      case 'western':
        return const Color(0xFF5DCAA5);
      case 'indonesia':
        return const Color(0xFFFAC775);
      case 'asia':
        return const Color(0xFFF5C4B3);
      case 'vegetarian':
        return const Color(0xFFC0DD97);
      default:
        return const Color(0xFF9FE1CB);
    }
  }

  Color get _gradientEnd {
    switch (cuisineType.toLowerCase()) {
      case 'western':
        return const Color(0xFF1D9E75);
      case 'indonesia':
        return const Color(0xFFBA7517);
      case 'asia':
        return const Color(0xFFD85A30);
      case 'vegetarian':
        return const Color(0xFF3B6D11);
      default:
        return const Color(0xFF1D9E75);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        if (imageUrl != null)
          Image.network(
            imageUrl!,
            height: 110,
            width: double.infinity,
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => _placeholder(),
          )
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
