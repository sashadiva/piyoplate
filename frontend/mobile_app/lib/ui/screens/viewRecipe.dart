import 'dart:convert';
import 'package:flutter/material.dart';
import '../../data/models/model.dart';
import '../../data/services/apiServices.dart';
import '../../core/theme.dart';
import '../widgets/mainButton.dart';
import '../widgets/statusBox.dart';
import '../widgets/emptyState.dart';

class RecipeDetailScreen extends StatefulWidget {
  final Recipe recipe;
  const RecipeDetailScreen({super.key, required this.recipe});

  @override
  State<RecipeDetailScreen> createState() => _RecipeDetailScreenState();
}

class _RecipeDetailScreenState extends State<RecipeDetailScreen>
    with SingleTickerProviderStateMixin {
  late TabController _tabCtrl;
  int _portion = 1;
  bool _isBookmarked = false;
  bool _isCooking = false;
  List<Review> _reviews = [];
  bool _reviewsLoaded = false;
  int _activeTab = 0;

  static const _portions = [1, 2, 4, 6];

  @override
  void initState() {
    super.initState();
    _tabCtrl = TabController(length: 3, vsync: this);
    _tabCtrl.addListener(() {
      if (!_tabCtrl.indexIsChanging) {
        setState(() => _activeTab = _tabCtrl.index);
        if (_tabCtrl.index == 2 && !_reviewsLoaded) _loadReviews();
      }
    });
    _checkBookmark();
  }

  Widget _buildHeroImage(String url) {
    if (url.startsWith('data:')) {
      try {
        final comma = url.indexOf(',');
        if (comma != -1) {
          final bytes = base64Decode(url.substring(comma + 1));
          return Image.memory(
            bytes,
            fit: BoxFit.cover,
            errorBuilder: (_, __, ___) => _PlaceholderImage(),
          );
        }
      } catch (_) {}
      return _PlaceholderImage();
    }
    return Image.network(
      url,
      fit: BoxFit.cover,
      errorBuilder: (_, __, ___) => _PlaceholderImage(),
    );
  }

  Future<void> _checkBookmark() async {
    try {
      final result = await ApiService.isBookmarked(widget.recipe.id);
      if (mounted) setState(() => _isBookmarked = result);
    } catch (_) {}
  }

  @override
  void dispose() {
    _tabCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadReviews() async {
    try {
      final reviews = await ApiService.getRecipeReviews(widget.recipe.id);
      if (mounted) {
        setState(() {
          _reviews = reviews;
          _reviewsLoaded = true;
        });
      }
    } catch (_) {
      if (mounted) setState(() => _reviewsLoaded = true);
    }
  }

  Future<void> _toggleBookmark() async {
    try {
      if (_isBookmarked) {
        await ApiService.removeBookmark(widget.recipe.id);
      } else {
        await ApiService.addBookmark(widget.recipe.id);
      }
      setState(() => _isBookmarked = !_isBookmarked);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              _isBookmarked ? 'Resep disimpan ❤️' : 'Bookmark dihapus',
            ),
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString().replaceFirst('Exception: ', '')),
            backgroundColor: AppColors.danger,
          ),
        );
      }
    }
  }

  Future<void> _cookRecipe() async {
    setState(() => _isCooking = true);
    try {
      await ApiService.cookRecipe(widget.recipe.id);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(
              '+${widget.recipe.caloriesPerServing} kkal ditambahkan ke tracker! 🍳',
            ),
            backgroundColor: AppColors.primary,
            behavior: SnackBarBehavior.floating,
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            content: Text(e.toString().replaceFirst('Exception: ', '')),
            backgroundColor: AppColors.danger,
          ),
        );
      }
    } finally {
      if (mounted) setState(() => _isCooking = false);
    }
  }

  void _showReviewDialog() {
    int rating = 5;
    final commentCtrl = TextEditingController();
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: AppColors.surface,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(20)),
      ),
      builder: (_) => Padding(
        padding: EdgeInsets.only(
          left: 20,
          right: 20,
          top: 20,
          bottom: MediaQuery.of(context).viewInsets.bottom + 20,
        ),
        child: StatefulBuilder(
          builder: (ctx, setS) => Column(
            mainAxisSize: MainAxisSize.min,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                'Tulis ulasan',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 16),
              const Text(
                'Rating',
                style: TextStyle(color: AppColors.textSecondary, fontSize: 13),
              ),
              const SizedBox(height: 8),
              Row(
                children: List.generate(
                  5,
                  (i) => GestureDetector(
                    onTap: () => setS(() => rating = i + 1),
                    child: Padding(
                      padding: const EdgeInsets.only(right: 4),
                      child: Icon(
                        i < rating
                            ? Icons.star_rounded
                            : Icons.star_outline_rounded,
                        color: AppColors.amber,
                        size: 32,
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 16),
              TextField(
                controller: commentCtrl,
                maxLines: 3,
                decoration: const InputDecoration(
                  hintText: 'Ceritakan pengalamanmu...',
                  labelText: 'Komentar (opsional)',
                ),
              ),
              const SizedBox(height: 16),
              MainButton(
                text: 'Kirim ulasan',
                icon: Icons.send_rounded,
                onPressed: () async {
                  try {
                    await ApiService.createReview(
                      recipeId: widget.recipe.id,
                      rating: rating,
                      comment: commentCtrl.text.isEmpty
                          ? null
                          : commentCtrl.text,
                    );
                    if (mounted) {
                      Navigator.pop(context);
                      _loadReviews();
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text('Ulasan berhasil dikirim! ⭐'),
                          behavior: SnackBarBehavior.floating,
                        ),
                      );
                    }
                  } catch (_) {
                    if (mounted) Navigator.pop(context);
                  }
                },
              ),
              const SizedBox(height: 8),
            ],
          ),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final recipe = widget.recipe;
    return Scaffold(
      body: SingleChildScrollView(
        // ✅ Ganti CustomScrollView+SliverFillRemaining → SingleChildScrollView
        // SliverFillRemaining crash di Flutter Web karena infinite height conflict
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // ── Hero image + AppBar ───────────────────────────────────────
            Stack(
              children: [
                // Gambar resep
                SizedBox(
                  height: 260,
                  width: double.infinity,
                  child: recipe.imageUrl != null && recipe.imageUrl!.isNotEmpty
                      ? _buildHeroImage(recipe.imageUrl!)
                      : _PlaceholderImage(),
                ),
                // Gradient overlay supaya tombol back terbaca
                Positioned(
                  top: 0,
                  left: 0,
                  right: 0,
                  child: Container(
                    height: 100,
                    decoration: BoxDecoration(
                      gradient: LinearGradient(
                        begin: Alignment.topCenter,
                        end: Alignment.bottomCenter,
                        colors: [
                          Colors.black.withOpacity(0.35),
                          Colors.transparent,
                        ],
                      ),
                    ),
                  ),
                ),
                // Back button
                Positioned(
                  top: MediaQuery.of(context).padding.top + 8,
                  left: 12,
                  child: _CircleBtn(
                    icon: Icons.arrow_back,
                    onTap: () => Navigator.pop(context),
                  ),
                ),
                // Bookmark button
                Positioned(
                  top: MediaQuery.of(context).padding.top + 8,
                  right: 12,
                  child: _CircleBtn(
                    icon: _isBookmarked
                        ? Icons.bookmark
                        : Icons.bookmark_border,
                    iconColor: _isBookmarked
                        ? AppColors.primary
                        : AppColors.textSecondary,
                    onTap: _toggleBookmark,
                  ),
                ),
              ],
            ),

            // ── Info utama ────────────────────────────────────────────────
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    recipe.title,
                    style: const TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.w600,
                      color: AppColors.textPrimary,
                    ),
                  ),
                  const SizedBox(height: 6),
                  Row(
                    children: [
                      const Icon(
                        Icons.person_outline,
                        size: 14,
                        color: AppColors.textSecondary,
                      ),
                      const SizedBox(width: 4),
                      Text(
                        'oleh ${recipe.authorName}',
                        style: const TextStyle(
                          fontSize: 13,
                          color: AppColors.textSecondary,
                        ),
                      ),
                      const SizedBox(width: 12),
                      const Icon(
                        Icons.star_rounded,
                        size: 14,
                        color: AppColors.amber,
                      ),
                      const SizedBox(width: 2),
                      Text(
                        '${recipe.avgRating.toStringAsFixed(1)} (${recipe.reviewCount} ulasan)',
                        style: const TextStyle(
                          fontSize: 13,
                          color: AppColors.textSecondary,
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // Stats
                  Row(
                    children: [
                      Expanded(
                        child: StatBox(
                          value: '${recipe.caloriesPerServing}',
                          label: 'kkal',
                          color: AppColors.primary,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: StatBox(
                          value: recipe.cookingDurationMinutes > 0
                              ? '${recipe.cookingDurationMinutes}'
                              : '-',
                          label: 'menit',
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: StatBox(
                          value: recipe.cuisineType.isEmpty
                              ? '-'
                              : recipe.cuisineType,
                          label: 'masakan',
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 14),

                  // Portion calculator
                  Container(
                    padding: const EdgeInsets.symmetric(
                      horizontal: 14,
                      vertical: 12,
                    ),
                    decoration: BoxDecoration(
                      color: AppColors.background,
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: Row(
                      children: [
                        const Text(
                          'Hitung untuk:',
                          style: TextStyle(
                            fontSize: 14,
                            color: AppColors.textSecondary,
                          ),
                        ),
                        const Spacer(),
                        ..._portions.map(
                          (p) => Padding(
                            padding: const EdgeInsets.only(left: 6),
                            child: GestureDetector(
                              onTap: () => setState(() => _portion = p),
                              child: AnimatedContainer(
                                duration: const Duration(milliseconds: 150),
                                width: 36,
                                height: 32,
                                alignment: Alignment.center,
                                decoration: BoxDecoration(
                                  color: _portion == p
                                      ? AppColors.primary
                                      : AppColors.surface,
                                  borderRadius: BorderRadius.circular(8),
                                  border: Border.all(
                                    color: _portion == p
                                        ? AppColors.primary
                                        : AppColors.border,
                                  ),
                                ),
                                child: Text(
                                  '$p',
                                  style: TextStyle(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w500,
                                    color: _portion == p
                                        ? Colors.white
                                        : AppColors.textSecondary,
                                  ),
                                ),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 16),
                ],
              ),
            ),

            // ── Tab bar ───────────────────────────────────────────────────
            Container(
              color: AppColors.surface,
              child: TabBar(
                controller: _tabCtrl,
                indicatorColor: AppColors.primary,
                labelColor: AppColors.primary,
                unselectedLabelColor: AppColors.textSecondary,
                tabs: const [
                  Tab(text: 'Bahan'),
                  Tab(text: 'Cara masak'),
                  Tab(text: 'Ulasan'),
                ],
              ),
            ),

            // ── Tab content (BUKAN TabBarView — langsung render berdasarkan index) ──
            // ✅ TabBarView di dalam SingleChildScrollView crash di web
            // karena dua scroll controller bentrok
            if (_activeTab == 0)
              _IngredientsContent(recipe: recipe, portion: _portion)
            else if (_activeTab == 1)
              _StepsContent(recipe: recipe)
            else
              _ReviewsContent(
                reviews: _reviews,
                loaded: _reviewsLoaded,
                onAddReview: _showReviewDialog,
              ),

            const SizedBox(height: 100),
          ],
        ),
      ),
      bottomNavigationBar: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: MainButton(
            text: 'Masak sekarang!',
            onPressed: _cookRecipe,
            isLoading: _isCooking,
            icon: Icons.outdoor_grill_rounded,
          ),
        ),
      ),
    );
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

class _PlaceholderImage extends StatelessWidget {
  @override
  Widget build(BuildContext context) => Container(
    decoration: const BoxDecoration(
      gradient: LinearGradient(
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
        colors: [AppColors.primaryLight, AppColors.primary],
      ),
    ),
    child: const Center(
      child: Icon(Icons.restaurant, size: 72, color: Colors.white70),
    ),
  );
}

class _CircleBtn extends StatelessWidget {
  final IconData icon;
  final VoidCallback onTap;
  final Color? iconColor;
  const _CircleBtn({required this.icon, required this.onTap, this.iconColor});

  @override
  Widget build(BuildContext context) => GestureDetector(
    onTap: onTap,
    child: Container(
      width: 36,
      height: 36,
      decoration: BoxDecoration(
        color: Colors.white.withOpacity(0.9),
        shape: BoxShape.circle,
      ),
      child: Icon(icon, size: 18, color: iconColor ?? AppColors.textPrimary),
    ),
  );
}

// ── Tab contents (plain Column, bukan ListView dengan physics) ────────────────

class _IngredientsContent extends StatelessWidget {
  final Recipe recipe;
  final int portion;
  const _IngredientsContent({required this.recipe, required this.portion});

  /// Parse bahan seperti "Tepung 200 gr" → skala jumlahnya jika portion > 1
  String _scaleIngredient(String ingredient, int multiplier) {
    if (multiplier <= 1) return ingredient;
    // Regex: cari angka (termasuk desimal) dalam string
    final numRegex = RegExp(r'(\d+(?:[.,]\d+)?)');
    return ingredient.replaceAllMapped(numRegex, (match) {
      final original = match.group(1)!.replaceAll(',', '.');
      final value = double.tryParse(original);
      if (value == null) return match.group(1)!;
      final scaled = value * multiplier;
      // Tampilkan tanpa desimal kalau hasil bulat
      if (scaled == scaled.roundToDouble()) {
        return scaled.toInt().toString();
      }
      return scaled.toStringAsFixed(1);
    });
  }

  @override
  Widget build(BuildContext context) {
    final ingrs = recipe.ingredientList;
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: List.generate(
          ingrs.length,
          (i) => Column(
            children: [
              Padding(
                padding: const EdgeInsets.symmetric(vertical: 8),
                child: Row(
                  children: [
                    Container(
                      width: 8,
                      height: 8,
                      decoration: const BoxDecoration(
                        color: AppColors.primary,
                        shape: BoxShape.circle,
                      ),
                    ),
                    const SizedBox(width: 12),
                    Expanded(
                      child: Text(
                        _scaleIngredient(ingrs[i], portion),
                        style: const TextStyle(
                          fontSize: 14,
                          color: AppColors.textPrimary,
                        ),
                      ),
                    ),
                    if (portion > 1)
                      Container(
                        padding: const EdgeInsets.symmetric(
                          horizontal: 8,
                          vertical: 3,
                        ),
                        decoration: BoxDecoration(
                          color: AppColors.primaryLight,
                          borderRadius: BorderRadius.circular(6),
                        ),
                        child: Text(
                          'x$portion',
                          style: const TextStyle(
                            fontSize: 11,
                            color: AppColors.primaryDark,
                            fontWeight: FontWeight.w500,
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              if (i < ingrs.length - 1) const Divider(),
            ],
          ),
        ),
      ),
    );
  }
}

class _StepsContent extends StatelessWidget {
  final Recipe recipe;
  const _StepsContent({required this.recipe});

  @override
  Widget build(BuildContext context) {
    final steps = recipe.stepList;
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        children: List.generate(
          steps.length,
          (i) => Padding(
            padding: const EdgeInsets.only(bottom: 16),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  width: 30,
                  height: 30,
                  decoration: const BoxDecoration(
                    color: AppColors.primaryLight,
                    shape: BoxShape.circle,
                  ),
                  alignment: Alignment.center,
                  child: Text(
                    '${i + 1}',
                    style: const TextStyle(
                      fontSize: 13,
                      fontWeight: FontWeight.w600,
                      color: AppColors.primaryDark,
                    ),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Padding(
                    padding: const EdgeInsets.only(top: 5),
                    child: Text(
                      steps[i],
                      style: const TextStyle(
                        fontSize: 14,
                        color: AppColors.textPrimary,
                        height: 1.5,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class _ReviewsContent extends StatelessWidget {
  final List<Review> reviews;
  final bool loaded;
  final VoidCallback onAddReview;
  const _ReviewsContent({
    required this.reviews,
    required this.loaded,
    required this.onAddReview,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          MainButton(
            text: 'Tulis ulasan',
            onPressed: onAddReview,
            icon: Icons.rate_review_outlined,
          ),
          const SizedBox(height: 16),
          if (!loaded)
            const Center(
              child: CircularProgressIndicator(color: AppColors.primary),
            )
          else if (reviews.isEmpty)
            const EmptyState(
              icon: Icons.chat_bubble_outline,
              title: 'Belum ada ulasan',
              subtitle: 'Jadilah yang pertama memberi ulasan!',
            )
          else
            ...reviews.map(
              (r) => Padding(
                padding: const EdgeInsets.only(bottom: 12),
                child: Container(
                  padding: const EdgeInsets.all(12),
                  decoration: BoxDecoration(
                    color: AppColors.background,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            r.username,
                            style: const TextStyle(
                              fontSize: 13,
                              fontWeight: FontWeight.w500,
                              color: AppColors.textPrimary,
                            ),
                          ),
                          Row(
                            children: List.generate(
                              5,
                              (i) => Icon(
                                i < r.rating
                                    ? Icons.star_rounded
                                    : Icons.star_outline_rounded,
                                color: AppColors.amber,
                                size: 14,
                              ),
                            ),
                          ),
                        ],
                      ),
                      if (r.comment != null && r.comment!.isNotEmpty) ...[
                        const SizedBox(height: 6),
                        Text(
                          r.comment!,
                          style: const TextStyle(
                            fontSize: 13,
                            color: AppColors.textSecondary,
                            height: 1.4,
                          ),
                        ),
                      ],
                    ],
                  ),
                ),
              ),
            ),
        ],
      ),
    );
  }
}
