import 'package:flutter/foundation.dart';
import '../../data/models/model.dart';
import 'apiServices.dart';

class AuthProvider extends ChangeNotifier {
  User? _user;
  bool _isLoading = false;
  String? _error;

  User? get user => _user;
  bool get isLoading => _isLoading;
  String? get error => _error;
  bool get isLoggedIn => _user != null;

  Future<void> tryAutoLogin() async {
    final savedUser = await ApiService.getSavedUser();
    final token = await ApiService.getToken();
    if (savedUser != null && token != null) {
      _user = User.fromJson(savedUser);
      notifyListeners();
    }
  }

  Future<bool> login(String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      final data = await ApiService.login(email: email, password: password);
      final userData = data['user'];
      // Refresh full profile
      _user = await ApiService.getUserProfile(userData['id']);
      _isLoading = false;
      notifyListeners();
      return true;
    } catch (e) {
      _error = e.toString().replaceFirst('Exception: ', '');
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<bool> register(String username, String email, String password) async {
    _isLoading = true;
    _error = null;
    notifyListeners();
    try {
      await ApiService.register(
        username: username,
        email: email,
        password: password,
      );
      // Auto-login after register
      return login(email, password);
    } catch (e) {
      _error = e.toString().replaceFirst('Exception: ', '');
      _isLoading = false;
      notifyListeners();
      return false;
    }
  }

  Future<void> refreshUser() async {
    if (_user == null) return;
    try {
      _user = await ApiService.getUserProfile(_user!.id);
      notifyListeners();
    } catch (_) {}
  }

  Future<void> logout() async {
    await ApiService.logout();
    _user = null;
    notifyListeners();
  }

  void clearError() {
    _error = null;
    notifyListeners();
  }
}
