import 'package:flutter/material.dart';
import '../../core/theme.dart';

class CalorieRing extends StatelessWidget {
  final int consumed;
  final int goal;

  const CalorieRing({super.key, required this.consumed, required this.goal});

  double get progress => (consumed / goal).clamp(0.0, 1.0);
  bool get isOver => consumed > goal;
  int get remaining => goal - consumed;

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      width: 180,
      height: 180,
      child: Stack(
        alignment: Alignment.center,
        children: [
          SizedBox(
            width: 180,
            height: 180,
            child: CircularProgressIndicator(
              value: progress,
              strokeWidth: 14,
              backgroundColor: AppColors.primaryLight,
              valueColor: AlwaysStoppedAnimation(
                isOver ? AppColors.danger : AppColors.primary,
              ),
              strokeCap: StrokeCap.round,
            ),
          ),
          Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                consumed.toString(),
                style: const TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              Text(
                'dari $goal kkal',
                style: const TextStyle(
                  fontSize: 12,
                  color: AppColors.textSecondary,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                isOver ? '+${(-remaining)} kkal over' : '$remaining kkal lagi',
                style: TextStyle(
                  fontSize: 12,
                  color: isOver ? AppColors.danger : AppColors.primary,
                  fontWeight: FontWeight.w500,
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
