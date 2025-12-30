import Header from '@/components/Header';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { supabase } from '../../src/supabaseClient';

export default function Profile() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace('/login');
      } else {
        setUserEmail(data.session.user.email ?? null);
      }
    })();
  }, []);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Log Out failed', error.message);
    } else {
      router.replace('/login'); 
    }
  };

  const handleMenuPress = (label: string) => {
    const cleaned = label.trim().toLowerCase();
    if (cleaned === 'log out') {
      handleLogout();
    } else {
      Alert.alert(label, `${label} not available yet`);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="always"
    >
      <Header title="Profile" />

      <View style={styles.profileCard}>
        <View>
          <Text style={styles.name}>Dhenu Patel</Text>
          <Text style={styles.email}>{userEmail ?? 'user@example.com'}</Text>
          <Text style={styles.member}>Member since: {'\n'}July 2025</Text>
        </View>

        <Image
          source={require('../../assets/looplogo2.png')}
          style={styles.logo}
        />
      </View>

      <View style={styles.menu}>
        {menuItems.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleMenuPress(item.label)}
            style={styles.menuItem}
          >
            <View style={styles.row}>
              <Image source={item.icon} style={styles.icon} />
              <Text style={styles.label}>{item.label}</Text>
            </View>
            <Image
              source={require('../../assets/chevron.png')}
              style={styles.chevron}
            />
          </Pressable>
        ))}
      </View>

      <Text style={styles.footer}>v1.45 (1) • Made with soul in Decatur</Text>
    </ScrollView>
  );
}

const menuItems = [
  { label: 'User guide', icon: require('../../assets/Userguide.png') },
  { label: 'Intro video', icon: require('../../assets/Introvideo.png') },
  { label: 'Get a yard sign', icon: require('../../assets/Yardsign.png') },
  { label: 'Invite friends', icon: require('../../assets/Invite.png') },
  { label: 'Contact us', icon: require('../../assets/Contact.png') },
  { label: 'Log out', icon: require('../../assets/Logout.png') },
  { label: 'Delete account', icon: require('../../assets/DelAcc.png') },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f7f7' },
  profileCard: {
    backgroundColor: '#FA3D50',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 18,
    marginBottom: 16,
    width: 390,
    height: 190,
    alignSelf: 'center',
  },
  name: { fontSize: 26, fontWeight: '700', color: '#fff', fontFamily: 'Albert Sans' },
  email: { fontSize: 17, fontWeight: '500', color: '#fff', fontFamily: 'Albert Sans' },
  member: { fontSize: 17, fontWeight: '500', color: 'rgb(216, 211, 211)', fontFamily: 'Albert Sans', top: 55 },
  logo: { width: 50.95, height: 40, resizeMode: 'contain', marginTop: 105, marginLeft: 55 },
  menu: { marginHorizontal: 16, backgroundColor: 'white', borderRadius: 12, marginTop: 16, marginBottom: 16 },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  icon: { width: 25, height: 25, marginRight: 12, resizeMode: 'contain' },
  label: { fontSize: 17, fontWeight: '700', fontFamily: 'Albert Sans', lineHeight: 24, letterSpacing: 0, color: 'rgba(0, 0, 0, 1)' },
  chevron: { width: 23, height: 23, tintColor: 'rgb(121, 123, 127)' },
  footer: { marginLeft: 35, fontSize: 17, color: 'rgba(107, 114, 128, 1)', marginTop: 2, marginBottom: 32, fontWeight: '500' },
  scroll: { paddingHorizontal: 20, paddingBottom: 60, backgroundColor: '#fff' },
});
