import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../data/models/model.dart';
import '../../data/services/apiServices.dart';
import '../../data/services/authProvider.dart';
import '../../core/theme.dart';
import '../../ui/widgets/emptyState.dart';
import '../../ui/widgets/recipeCard.dart';
import '../../ui/widgets/sectionHeader.dart';
import '../../ui/widgets/categoryChip.dart';
import './viewRecipe.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final _searchCtrl = TextEditingController();
  List<Recipe> _recipes = [];
  bool _loading = true;
  String _selectedCategory = 'Semua';
  final Set<int> _bookmarked = {};

  final _categories = [
    'Semua',
    'Indonesia',
    'Asia',
    'Western',
    'Vegetarian',
    'Dessert',
  ];

  @override
  void initState() {
    super.initState();
    _loadRecipes();
    _loadBookmarks();
  }

  @override
  void dispose() {
    _searchCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadRecipes({String? search}) async {
    setState(() => _loading = true);
    try {
      final list = await ApiService.getRecipes(search: search);
      setState(() {
        _recipes = list;
        _loading = false;
      });
    } catch (e) {
      setState(() => _loading = false);
    }
  }

  List<Recipe> get _filtered {
    if (_selectedCategory == 'Semua') return _recipes;
    return _recipes
        .where(
          (r) => r.cuisineType.toLowerCase() == _selectedCategory.toLowerCase(),
        )
        .toList();
  }
  Future<void> _loadBookmarks() async {
    try {
      final bookmarks = await ApiService.getBookmarks();
      setState(() {
        _bookmarked.addAll(bookmarks.map((r) => r.id));
      });
    } catch (_) {}
  }

  Future<void> _toggleBookmark(int id) async {
    final isCurrentlyBookmarked = _bookmarked.contains(id);
    setState(() {
      if (isCurrentlyBookmarked) {
        _bookmarked.remove(id);
      } else {
        _bookmarked.add(id);
      }
    });
    try {
      if (isCurrentlyBookmarked) {
        await ApiService.removeBookmark(id);
      } else {
        await ApiService.addBookmark(id);
      }
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              _bookmarked.contains(id)
                  ? 'Resep disimpan ❤️'
                  : 'Resep dihapus dari bookmark',
            ),
            duration: const Duration(seconds: 2),
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } catch(e){
        setState(() {
          if (isCurrentlyBookmarked) {
            _bookmarked.add(id);
          } else {
            _bookmarked.remove(id);
          }
        });
        if (mounted) {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Gagal menyimpan bookmark')),
          );
        }
    }
  }

  @override
  Widget build(BuildContext context) {
    final user = context.watch<AuthProvider>().user;

    return Scaffold(
      body: RefreshIndicator(
        onRefresh: _loadRecipes,
        color: AppColors.primary,
        child: CustomScrollView(
          slivers: [
            SliverToBoxAdapter(
              child: Padding(
                padding: const EdgeInsets.fromLTRB(20, 16, 20, 12),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      'Selamat ${_greeting()}, ${user?.username ?? 'Kamu'} 👋',
                      style: const TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w600,
                        color: AppColors.textPrimary,
                      ),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'Mau masak apa hari ini?',
                      style: TextStyle(
                        fontSize: 14,
                        color: AppColors.textSecondary,
                      ),
                    ),
                    const SizedBox(height: 16),
                    // Search bar
                    Container(
                      decoration: BoxDecoration(
                        color: AppColors.background,
                        borderRadius: BorderRadius.circular(12),
                        border: Border.all(color: AppColors.border, width: 0.5),
                      ),
                      child: TextField(
                        controller: _searchCtrl,
                        decoration: const InputDecoration(
                          hintText: 'Cari resep, bahan, masakan...',
                          prefixIcon: Icon(
                            Icons.search,
                            color: AppColors.textTertiary,
                            size: 20,
                          ),
                          border: InputBorder.none,
                          enabledBorder: InputBorder.none,
                          focusedBorder: InputBorder.none,
                          contentPadding: EdgeInsets.symmetric(vertical: 12),
                          fillColor: Colors.transparent,
                          filled: true,
                        ),
                        onSubmitted: (v) =>
                            _loadRecipes(search: v.isEmpty ? null : v),
                        onChanged: (v) {
                          if (v.isEmpty) _loadRecipes();
                        },
                      ),
                    ),
                  ],
                ),
              ),
            ),
            // Category chips
            SliverToBoxAdapter(
              child: SizedBox(
                height: 42,
                child: ListView.separated(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  scrollDirection: Axis.horizontal,
                  itemCount: _categories.length,
                  separatorBuilder: (_, __) => const SizedBox(width: 8),
                  itemBuilder: (_, i) => CategoryChip(
                    label: _categories[i],
                    isSelected: _selectedCategory == _categories[i],
                    onTap: () =>
                        setState(() => _selectedCategory = _categories[i]),
                  ),
                ),
              ),
            ),
            const SliverToBoxAdapter(child: SizedBox(height: 20)),
            const SliverToBoxAdapter(
              child: SectionHeader(title: 'Resep populer'),
            ),
            if (_loading)
              const SliverFillRemaining(
                child: Center(
                  child: CircularProgressIndicator(color: AppColors.primary),
                ),
              )
            else if (_filtered.isEmpty)
              const SliverFillRemaining(
                child: EmptyState(
                  icon: Icons.search_off_rounded,
                  title: 'Resep tidak ditemukan',
                  subtitle: 'Coba kata kunci lain atau ganti kategori',
                ),
              )
            else
              SliverPadding(
                padding: const EdgeInsets.symmetric(horizontal: 16),
                sliver: SliverGrid(
                  gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                    crossAxisCount: 2,
                    crossAxisSpacing: 12,
                    mainAxisSpacing: 12,
                    childAspectRatio: 0.78,
                  ),
                  delegate: SliverChildBuilderDelegate(
                    (_, i) => RecipeCard(
                      recipe: _filtered[i],
                      isBookmarked: _bookmarked.contains(_filtered[i].id),
                      onBookmark: () => _toggleBookmark(_filtered[i].id),
                      onTap: () => Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (_) =>
                              RecipeDetailScreen(recipe: _filtered[i]),
                        ),
                      ).then((_) {
                        _loadRecipes();
                        _loadBookmarks();
                      }),
                    ),
                    childCount: _filtered.length,
                  ),
                ),
              ),
            const SliverToBoxAdapter(child: SizedBox(height: 20)),
          ],
        ),
      ),
    );
  }

  String _greeting() {
    final h = DateTime.now().hour;
    if (h < 11) return 'pagi';
    if (h < 15) return 'siang';
    if (h < 18) return 'sore';
    return 'malam';
  }
}
