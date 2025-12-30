import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../src/supabaseClient';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);

  const onLogin = async () => {
    try {
      setBusy(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
     
      router.replace('/(tabs)/feed');
    } catch (e: any) {
      Alert.alert('Login failed', e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={s.container} behavior={Platform.select({ ios: 'padding' })}>
      <View style={s.card}>
        <Text style={s.title}>Welcome back</Text>

        <TextInput
          style={s.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={s.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Pressable style={[s.btn, busy && { opacity: 0.7 }]} disabled={busy} onPress={onLogin}>
          <Text style={s.btnText}>{busy ? 'Signing in…' : 'Sign In'}</Text>
        </Pressable>

        <Pressable onPress={() => router.push('/signup')}>
          <Text style={s.link}>New here? Create an account</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#f7f7f7' },
  card: { backgroundColor: 'white', padding: 20, borderRadius: 12 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginBottom: 12 },
  btn: { backgroundColor: '#FA3D50', padding: 14, borderRadius: 10, alignItems: 'center' },
  btnText: { color: 'white', fontSize: 16, fontWeight: '700' },
  link: { marginTop: 12, textAlign: 'center', color: '#555' },
});
