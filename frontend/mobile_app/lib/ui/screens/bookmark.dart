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
  List<Recipe> _bookmarked = [];
  bool _loading = true;

  @override
  void initState() {
    super.initState();
    _load();
  }

  Future<void> _load() async {
    setState(() => _loading = true);
    try {
      final list = await ApiService.getBookmarks();
      setState(() {
        _bookmarked = list;
        _loading = false;
      });
    } catch (_) {
      setState(() => _loading = false);
    }
  }

  Future<void> _remove(int recipeId) async {
    try {
      await ApiService.removeBookmark(recipeId);
      setState(() => _bookmarked.removeWhere((r) => r.id == recipeId));
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Dihapus dari bookmark'),
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(e.toString().replaceFirst('Exception: ', ''))),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: RefreshIndicator(
        onRefresh: _load,
        color: AppColors.primary,
        child: CustomScrollView(
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
                      ).then((_) => _load()),
                    ),
                    childCount: _bookmarked.length,
                  ),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
