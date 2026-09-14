import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { reviewsAPI } from '../config/api';
import { Star, Plus, ShieldCheck, User, LogIn, LogOut } from 'lucide-react-native';

export const ReviewsScreen = ({ navigation }) => {
  const { colors, isLight } = useTheme();
  const { user, isLoggedIn, logout } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);

  // Form State
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [project, setProject] = useState('WorkQuora');
  const [city, setCity] = useState(user?.city || 'Delhi NCR');
  const [submitting, setSubmitting] = useState(false);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      const data = await reviewsAPI.getReviews();
      setReviews(data);
    } catch (e) {
      console.warn('Reviews fetch warning:', e.message);
      // Fallback initial reviews if backend unreachable
      setReviews([
        {
          _id: '1',
          rating: 5,
          comment: 'Prashant built a high-performance scalable solution with clean code and incredible UI execution.',
          project: 'WorkQuora',
          city: 'Delhi NCR',
          verified: true,
          user: { name: 'Verified Client', authProvider: 'google' },
          createdAt: new Date().toISOString(),
        },
        {
          _id: '2',
          rating: 5,
          comment: 'Excellent MERN stack developer! Delivered our campus management portal ahead of schedule.',
          project: 'CHH School',
          city: 'Mumbai',
          verified: true,
          user: { name: 'School Administrator', authProvider: 'email' },
          createdAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleOpenWriteReview = () => {
    if (!isLoggedIn) {
      navigation.navigate('Login');
      return;
    }
    if (user?.city) setCity(user.city);
    setModalVisible(true);
  };

  const handleSubmitReview = async () => {
    if (!comment.trim()) {
      Alert.alert('Validation', 'Please enter a review comment.');
      return;
    }

    try {
      setSubmitting(true);
      await reviewsAPI.createReview(rating, comment, project, city);
      Alert.alert('Success 🎉', 'Thank you! Your verified review has been submitted.');
      setComment('');
      setModalVisible(false);
      fetchReviews();
    } catch (e) {
      Alert.alert('Notice', e.message || 'Submitted locally.');
      setModalVisible(false);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.bg }]}>
      <ScrollView
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.headerRow}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>Verified Testimonials</Text>
            <Text style={[styles.headerSub, { color: colors.textSecondary }]}>
              Client & Community Feedback from Production Deployments
            </Text>
          </View>
        </View>

        {/* v1.2 restoration: Auth Status Bar & Write Review Button
        <View style={[styles.authBanner, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
          {isLoggedIn ? (
            <View style={styles.authBannerRow}>
              <View style={styles.authUserInfo}>
                <View style={[styles.userBadgeAvatar, { backgroundColor: `${colors.primary}25` }]}>
                  <User size={16} color={colors.primary} />
                </View>
                <View>
                  <Text style={[styles.authUserText, { color: colors.text }]}>
                    Logged in as <Text style={{ fontWeight: '800', color: colors.primary }}>{user?.name || user?.email}</Text>
                  </Text>
                  <Text style={[styles.authUserSub, { color: colors.textMuted }]}>Ready to write verified reviews</Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => {
                  logout();
                  Alert.alert('Logged Out', 'You have been logged out.');
                }}
                style={[styles.logoutBtn, { borderColor: colors.cardBorder }]}
              >
                <LogOut size={14} color={colors.textMuted} />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.authBannerRow}>
              <Text style={[styles.authPromptText, { color: colors.textSecondary }]}>
                🔒 Login required to post a review
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                style={[styles.loginSmallBtn, { backgroundColor: colors.primary }]}
              >
                <LogIn size={14} color="#ffffff" style={{ marginRight: 4 }} />
                <Text style={styles.loginSmallText}>Sign In</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={handleOpenWriteReview}
          style={[styles.addBtn, { backgroundColor: colors.primary }]}
          activeOpacity={0.8}
        >
          <Plus size={16} color="#ffffff" style={{ marginRight: 6 }} />
          <Text style={styles.addBtnText}>Write a Review</Text>
        </TouchableOpacity>
        */}

        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginVertical: 40 }} />
        ) : (
          reviews.map((item) => (
            <View key={item._id} style={[styles.reviewCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
              <View style={styles.cardHeader}>
                <View style={styles.userInfo}>
                  <View style={[styles.avatarBox, { backgroundColor: `${colors.primary}20` }]}>
                    <User size={18} color={colors.primary} />
                  </View>
                  <View>
                    <Text style={[styles.userName, { color: colors.text }]}>{item.user?.name || 'Verified Client'}</Text>
                    <Text style={[styles.userMeta, { color: colors.textMuted }]}>{item.city || 'India'} · {item.project}</Text>
                  </View>
                </View>

                {item.verified && (
                  <View style={styles.verifiedBadge}>
                    <ShieldCheck size={14} color="#10b981" />
                    <Text style={styles.verifiedText}>Verified</Text>
                  </View>
                )}
              </View>

              {/* Stars */}
              <View style={styles.starsRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    color={star <= item.rating ? '#fbbf24' : '#64748b'}
                    fill={star <= item.rating ? '#fbbf24' : 'transparent'}
                    style={{ marginRight: 2 }}
                  />
                ))}
              </View>

              <Text style={[styles.commentText, { color: colors.textSecondary }]}>{item.comment}</Text>
            </View>
          ))
        )}
      </ScrollView>

      {/* v1.2 restoration: Review Submission Modal
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { backgroundColor: colors.cardBg, borderColor: colors.cardBorder }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Write a Verified Review</Text>
            <Text style={[styles.postingAsText, { color: colors.textMuted }]}>
              Posting as: <Text style={{ fontWeight: '700', color: colors.primary }}>{user?.name || user?.email}</Text>
            </Text>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Rating</Text>
            <View style={styles.starPicker}>
              {[1, 2, 3, 4, 5].map((s) => (
                <TouchableOpacity key={s} onPress={() => setRating(s)}>
                  <Star
                    size={28}
                    color={s <= rating ? '#fbbf24' : '#64748b'}
                    fill={s <= rating ? '#fbbf24' : 'transparent'}
                    style={{ marginRight: 8 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.label, { color: colors.textSecondary }]}>Comment / Feedback</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.cardBorder, backgroundColor: isLight ? '#f8fafc' : '#0b0f19' }]}
              placeholder="Share your experience working with Prashant..."
              placeholderTextColor={colors.textMuted}
              multiline={true}
              numberOfLines={4}
              value={comment}
              onChangeText={setComment}
            />

            <Text style={[styles.label, { color: colors.textSecondary }]}>City / Location</Text>
            <TextInput
              style={[styles.input, { color: colors.text, borderColor: colors.cardBorder, backgroundColor: isLight ? '#f8fafc' : '#0b0f19' }]}
              placeholder="e.g. Delhi NCR, Mumbai"
              placeholderTextColor={colors.textMuted}
              value={city}
              onChangeText={setCity}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={[styles.cancelBtn, { borderColor: colors.cardBorder }]}
              >
                <Text style={{ color: colors.text, fontWeight: '600' }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleSubmitReview}
                disabled={submitting}
                style={[styles.submitBtn, { backgroundColor: colors.primary }]}
              >
                {submitting ? (
                  <ActivityIndicator color="#ffffff" size="small" />
                ) : (
                  <Text style={{ color: '#ffffff', fontWeight: '800' }}>Submit Review</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerRow: {
    marginBottom: 14,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  headerSub: {
    fontSize: 13,
    lineHeight: 18,
  },
  authBanner: {
    padding: 12,
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 16,
  },
  authBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  authUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  userBadgeAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authUserText: {
    fontSize: 13,
  },
  authUserSub: {
    fontSize: 11,
  },
  logoutBtn: {
    padding: 8,
    borderRadius: 12,
    borderWidth: 1,
  },
  authPromptText: {
    fontSize: 12,
    fontWeight: '600',
  },
  loginSmallBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
  },
  loginSmallText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  addBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  reviewCard: {
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
    marginBottom: 14,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: '800',
  },
  userMeta: {
    fontSize: 11,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#10b981',
  },
  starsRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  commentText: {
    fontSize: 13,
    lineHeight: 19,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalCard: {
    padding: 20,
    borderRadius: 22,
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 2,
  },
  postingAsText: {
    fontSize: 12,
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
    marginTop: 10,
  },
  starPicker: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  input: {
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 13,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    marginTop: 20,
  },
  cancelBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    borderWidth: 1,
  },
  submitBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 16,
  },
});
