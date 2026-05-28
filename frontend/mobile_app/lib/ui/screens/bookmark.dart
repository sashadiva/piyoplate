import 'package:flutter/material.dart';
import '../../data/models/model.dart';
import '../../data/services/apiServices.dart';
import '../../core/theme.dart';
import '../../ui/widgets/emptyState.dart';
import '../../ui/widgets/recipeCard.dart';
import './viewRecipe.dart';

class BookmarkScreen extends StatefulWidget {
  const BookmarkScreen({super.key});

  @override
  State<BookmarkScreen> createState() => _BookmarkScreenState();
}

class _BookmarkScreenState extends State<BookmarkScreen> {
  // In a real app this would be persisted; here we mock with a local set
  // that syncs with HomeScreen via shared state/provider
  List<Recipe> _bookmarked = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _loadBookmarks();
  }

  Future<void> _loadBookmarks() async {
    setState(() => _loading = true);
    try {
      // Fetch all recipes; filter by bookmarked IDs (mocked for demo)
      final all = await ApiService.getRecipes();
      // For demo: show first 3 as "bookmarked"
      setState(() {
        _bookmarked = all.take(3).toList();
        _loading = false;
      });
    } catch (_) {
      setState(() => _loading = false);
    }
  }

  void _remove(int id) {
    setState(() => _bookmarked.removeWhere((r) => r.id == id));
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(
        content: Text('Dihapus dari bookmark'),
        behavior: SnackBarBehavior.floating,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          const SliverAppBar(title: Text('Tersimpan'), floating: true),
          if (_loading)
            const SliverFillRemaining(
              child: Center(
                child: CircularProgressIndicator(color: AppColors.primary),
              ),
            )
          else if (_bookmarked.isEmpty)
            const SliverFillRemaining(
              child: EmptyState(
                icon: Icons.bookmark_border_rounded,
                title: 'Belum ada resep tersimpan',
                subtitle: 'Bookmark resep favoritmu dari halaman beranda ❤️',
              ),
            )
          else
            SliverPadding(
              padding: const EdgeInsets.all(16),
              sliver: SliverGrid(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 12,
                  mainAxisSpacing: 12,
                  childAspectRatio: 0.78,
                ),
                delegate: SliverChildBuilderDelegate(
                  (_, i) => RecipeCard(
                    recipe: _bookmarked[i],
                    isBookmarked: true,
                    onBookmark: () => _remove(_bookmarked[i].id),
                    onTap: () => Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) =>
                            RecipeDetailScreen(recipe: _bookmarked[i]),
                      ),
                    ),
                  ),
                  childCount: _bookmarked.length,
                ),
              ),
            ),
        ],
      ),
    );
  }
}
