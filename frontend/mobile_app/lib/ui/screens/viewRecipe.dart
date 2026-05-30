import 'package:flutter/material.dart';
import '../../data/models/model.dart';
import '../../data/services/apiServices.dart';
import '../../core/theme.dart';
import '../../ui/widgets/mainButton.dart';
import '../../ui/widgets/statusBox.dart';
import '../../ui/widgets/emptyState.dart';

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

  static const _portions = [1, 2, 4, 6];

  @override
  void initState() {
    super.initState();
    _tabCtrl = TabController(length: 3, vsync: this);
    _tabCtrl.addListener(() {
      if (_tabCtrl.index == 2 && !_reviewsLoaded) _loadReviews();
    });
  }

  @override
  void dispose() {
    _tabCtrl.dispose();
    super.dispose();
  }

  Future<void> _loadReviews() async {
    try {
      final reviews = await ApiService.getRecipeReviews(widget.recipe.id);
      setState(() {
        _reviews = reviews;
        _reviewsLoaded = true;
      });
    } catch (_) {}
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
      setState(() => _isCooking = false);
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
                  hintText: 'Ceritakan pengalamanmu memasak resep ini...',
                  labelText: 'Komentar (opsional)',
                ),
              ),
              const SizedBox(height: 16),
              MainButton(
                text: 'Kirim ulasan',
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
                  } catch (e) {
                    if (mounted) Navigator.pop(context);
                  }
                },
                icon: Icons.send_rounded,
              ),
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
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 240,
            pinned: true,
            leading: IconButton(
              onPressed: () => Navigator.pop(context),
              icon: Container(
                padding: const EdgeInsets.all(6),
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.9),
                  shape: BoxShape.circle,
                ),
                child: const Icon(
                  Icons.arrow_back,
                  size: 18,
                  color: AppColors.textPrimary,
                ),
              ),
            ),
            actions: [
              IconButton(
                onPressed: () => setState(() => _isBookmarked = !_isBookmarked),
                icon: Container(
                  padding: const EdgeInsets.all(6),
                  decoration: BoxDecoration(
                    color: Colors.white.withOpacity(0.9),
                    shape: BoxShape.circle,
                  ),
                  child: Icon(
                    _isBookmarked ? Icons.bookmark : Icons.bookmark_border,
                    size: 18,
                    color: _isBookmarked
                        ? AppColors.primary
                        : AppColors.textSecondary,
                  ),
                ),
              ),
            ],
            flexibleSpace: FlexibleSpaceBar(
              background: recipe.imageUrl != null
                  ? Image.network(recipe.imageUrl!, fit: BoxFit.cover)
                  : Container(
                      decoration: const BoxDecoration(
                        gradient: LinearGradient(
                          begin: Alignment.topLeft,
                          end: Alignment.bottomRight,
                          colors: [Color(0xFF9FE1CB), Color(0xFF1D9E75)],
                        ),
                      ),
                      child: const Center(
                        child: Icon(
                          Icons.restaurant,
                          size: 72,
                          color: Colors.white70,
                        ),
                      ),
                    ),
            ),
          ),
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20),
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
                  const SizedBox(height: 16),
                  // Stats row
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
                          value: '${recipe.cookingDurationMinutes}',
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
                  const SizedBox(height: 16),
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
                ],
              ),
            ),
          ),
          // Tab bar
          SliverPersistentHeader(
            pinned: true,
            delegate: _TabBarDelegate(
              TabBar(
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
          ),
          // Tab content
          SliverFillRemaining(
            child: TabBarView(
              controller: _tabCtrl,
              children: [
                _IngredientsTab(recipe: recipe, portion: _portion),
                _StepsTab(recipe: recipe),
                _ReviewsTab(
                  reviews: _reviews,
                  loaded: _reviewsLoaded,
                  onAddReview: _showReviewDialog,
                ),
              ],
            ),
          ),
        ],
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

class _TabBarDelegate extends SliverPersistentHeaderDelegate {
  final TabBar tabBar;
  const _TabBarDelegate(this.tabBar);

  @override
  Widget build(context, _, __) =>
      Container(color: AppColors.surface, child: tabBar);
  @override
  double get maxExtent => 46;
  @override
  double get minExtent => 46;
  @override
  bool shouldRebuild(_) => false;
}

class _IngredientsTab extends StatelessWidget {
  final Recipe recipe;
  final int portion;
  const _IngredientsTab({required this.recipe, required this.portion});

  @override
  Widget build(BuildContext context) {
    final ingrs = recipe.ingredientList;
    return ListView.separated(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      padding: const EdgeInsets.all(20),
      itemCount: ingrs.length,
      separatorBuilder: (_, __) => const Divider(),
      itemBuilder: (_, i) => Padding(
        padding: const EdgeInsets.symmetric(vertical: 6),
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
                ingrs[i],
                style: const TextStyle(
                  fontSize: 14,
                  color: AppColors.textPrimary,
                ),
              ),
            ),
            if (portion > 1)
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
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
    );
  }
}

class _StepsTab extends StatelessWidget {
  final Recipe recipe;
  const _StepsTab({required this.recipe});

  @override
  Widget build(BuildContext context) {
    final steps = recipe.stepList;
    return ListView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      padding: const EdgeInsets.all(20),
      itemCount: steps.length,
      itemBuilder: (_, i) => Padding(
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
    );
  }
}

class _ReviewsTab extends StatelessWidget {
  final List<Review> reviews;
  final bool loaded;
  final VoidCallback onAddReview;
  const _ReviewsTab({
    required this.reviews,
    required this.loaded,
    required this.onAddReview,
  });

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(20),
      child: SingleChildScrollView(
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
      )
    );
  }
}
