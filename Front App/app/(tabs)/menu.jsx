// app/(tabs)/ProfileScreen.jsx
import { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    Easing,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const translations = {
  en: { editProfile: 'Edit Profile', save: 'Save', pastTrips: 'Past Trips', settings: 'Settings', language: 'Language', darkMode: 'Dark Mode', account: 'Account', logout: 'Logout', deleteAccount: 'Delete Account', cancel: 'Cancel', yes: 'Yes', updateSuccess: 'Profile updated successfully!', updateFailed: 'Failed to update profile.', deleteSuccess: 'Your account has been successfully deleted.', deleteFailed: 'Failed to delete account.' },
  ar: { editProfile: 'تعديل الملف الشخصي', save: 'حفظ', pastTrips: 'رحلاتي السابقة', settings: 'الإعدادات', language: 'اللغة', darkMode: 'الوضع الداكن', account: 'الحساب', logout: 'تسجيل الخروج', deleteAccount: 'حذف الحساب', cancel: 'إلغاء', yes: 'نعم', updateSuccess: 'تم تحديث الملف الشخصي بنجاح!', updateFailed: 'فشل تحديث الملف الشخصي.', deleteSuccess: 'تم حذف حسابك بنجاح.', deleteFailed: 'فشل حذف الحساب.' },
};

export default function ProfileScreen() {
  const [user, setUser] = useState({
    full_name: 'أحمد محمد',
    email: 'ahmed@example.com',
    phone: '+963 912345678',
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editableName, setEditableName] = useState('');
  const [editableEmail, setEditableEmail] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('ar');
  const [trips, setTrips] = useState([]);

  const formAnim = useRef(new Animated.Value(height)).current;
  const T = translations[language];

  // Animation
  useEffect(() => {
    Animated.timing(formAnim, {
      toValue: 0,
      duration: 1100,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, []);

  // Initialize editable fields and trips
  useEffect(() => {
    if (user) {
      setEditableName(user.full_name);
      setEditableEmail(user.email);
    }
    const mockTrips = [
      { id: '1', en: { destination: 'Trip to Damascus', date: 'Nov 15, 2024' }, ar: { destination: 'رحلة إلى دمشق', date: '15 نوفمبر 2024' } },
      { id: '2', en: { destination: 'Trip to Aleppo', date: 'Oct 22, 2024' }, ar: { destination: 'رحلة إلى حلب', date: '22 أكتوبر 2024' } },
    ];
    setTrips(mockTrips);
  }, [user]);

  const COLORS = {
    background: isDarkMode ? '#121212' : '#20373B',
    card: isDarkMode ? '#1E1E1E' : '#FFFFFF',
    text: isDarkMode ? '#FFFFFF' : '#111827',
    textSecondary: isDarkMode ? '#A9A9A9' : '#888888',
    primary: '#519CAB',
    danger: '#D32F2F',
    inputBg: isDarkMode ? '#2C2C2C' : '#F7F8F9',
    border: isDarkMode ? '#444' : '#E0E0E0',
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setUser({ ...user, full_name: editableName, email: editableEmail });
      setIsEditMode(false);
      setIsSaving(false);
      Alert.alert(T.updateSuccess);
    }, 1000);
  };

  const handleCancel = () => {
    setEditableName(user.full_name);
    setEditableEmail(user.email);
    setIsEditMode(false);
  };

  const toggleTheme = () => setIsDarkMode(prev => !prev);
  const toggleLanguage = () => setLanguage(lang => (lang === 'ar' ? 'en' : 'ar'));

  const handleLogout = () => Alert.alert(T.logout, 'Logged out (simulated)');
  const handleDeleteAccount = () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      Alert.alert(T.deleteSuccess);
      setUser({ full_name: '', email: '', phone: '' });
    }, 1000);
  };

  return (
    <Animated.View style={[styles.formArea, { transform: [{ translateY: formAnim }], backgroundColor: COLORS.card }]}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {user && (
          <View style={{ marginBottom: 20 }}>
            {isEditMode ? (
              <>
                <TextInput
                  style={[styles.input, { color: COLORS.text, backgroundColor: COLORS.inputBg, borderColor: COLORS.border }]}
                  value={editableName}
                  onChangeText={setEditableName}
                  placeholder="Full Name"
                  placeholderTextColor="#999"
                />
                <TextInput
                  style={[styles.input, { color: COLORS.text, backgroundColor: COLORS.inputBg, borderColor: COLORS.border }]}
                  value={editableEmail}
                  onChangeText={setEditableEmail}
                  placeholder="Email"
                  keyboardType="email-address"
                  placeholderTextColor="#999"
                />
                <Text style={{ color: COLORS.textSecondary, textAlign: 'center', marginVertical: 10 }}>{user.phone}</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E0E0E0', flex: 1, marginRight: 5 }]} onPress={handleCancel}>
                    <Text style={{ color: '#333', fontWeight: 'bold' }}>{T.cancel}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, { backgroundColor: COLORS.primary, flex: 1, marginLeft: 5 }]} onPress={handleSave}>
                    {isSaving ? <ActivityIndicator color="#fff" /> : <Text style={{ color: '#fff', fontWeight: 'bold' }}>{T.save}</Text>}
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={[styles.fullName, { color: COLORS.text }]}>{user.full_name}</Text>
                <Text style={{ color: COLORS.textSecondary, textAlign: 'center', marginTop: 5 }}>{user.email}</Text>
                <Text style={{ color: COLORS.textSecondary, textAlign: 'center', marginTop: 5 }}>{user.phone}</Text>
                <TouchableOpacity style={[styles.editButton, { backgroundColor: COLORS.primary }]} onPress={() => setIsEditMode(true)}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>{T.editProfile}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{T.pastTrips}</Text>
          {trips.map(trip => (
            <View key={trip.id} style={{ borderBottomWidth: 1, borderBottomColor: COLORS.background, paddingVertical: 10 }}>
              <Text style={{ color: COLORS.text }}>{trip[language].destination}</Text>
              <Text style={{ color: COLORS.textSecondary, marginTop: 2 }}>{trip[language].date}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{T.settings}</Text>
          <View style={styles.settingRow}>
            <Text style={{ color: COLORS.text }}>{T.language}</Text>
            <TouchableOpacity onPress={toggleLanguage}><Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>{language.toUpperCase()}</Text></TouchableOpacity>
          </View>
          <View style={styles.settingRow}>
            <Text style={{ color: COLORS.text }}>{T.darkMode}</Text>
            <Switch trackColor={{ false: '#767577', true: '#81b0ff' }} thumbColor={isDarkMode ? COLORS.primary : '#f4f3f4'} onValueChange={toggleTheme} value={isDarkMode} />
          </View>
        </View>

        <View style={{ marginBottom: 20 }}>
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>{T.account}</Text>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.primary }]} onPress={handleLogout}>
            <Text style={{ color: COLORS.primary, fontWeight: 'bold' }}>{T.logout}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { borderWidth: 1, borderColor: COLORS.danger, marginTop: 10 }]} onPress={handleDeleteAccount}>
            {isDeleting ? <ActivityIndicator color={COLORS.danger} /> : <Text style={{ color: COLORS.danger, fontWeight: 'bold' }}>{T.deleteAccount}</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  formArea: { flex: 1, paddingHorizontal: 20, paddingTop: 55, backgroundColor: '#fff' },
  scrollContainer: { paddingBottom: 30 },
  fullName: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 5 },
  editButton: { borderRadius: 20, paddingVertical: 10, paddingHorizontal: 30, alignSelf: 'center', marginTop: 15, alignItems: 'center' },
  input: { fontSize: 16, borderWidth: 1, borderRadius: 8, padding: 15, marginBottom: 15 },
  actionButton: { flex: 1, paddingVertical: 15, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 },
});
