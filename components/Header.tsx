
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import styles from './HeaderStyles';

type HeaderProps = {
  title: string;
  balance?: number;    
  showBack?: boolean;
  onBack?: () => void;
};

export default function Header({
  title,
  balance = 25,
  showBack = false,
  onBack,
}: HeaderProps) {
  const [showHelp, setShowHelp] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.header}>
      {showBack ? (
        <Pressable onPress={onBack || (() => router.back())}>
          <Text style={styles.backButton}>{"<  "}Feed</Text>
        </Pressable>
      ) : (
        <Pressable onPress={() => setShowHelp(true)}>
          <Text style={styles.help}>Get help</Text>
        </Pressable>
      )}

      <Text style={styles.title}>{title}</Text>

      <View style={styles.balanceBadge}>
        <Text style={styles.balanceText}>${balance}</Text>
      </View>

      {!showBack && (
        <Modal visible={showHelp} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modal}>
              <Text style={{ fontSize: 20, fontWeight: '800', color: '#000' }}>
                Need Help?
              </Text>
              <Text style={{ fontSize: 18, fontWeight: '600', marginTop: 13 }}>
                Dhenu Patel
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                Email: dhenupatel1836@gmail.com
              </Text>
              <Text style={{ fontSize: 16, fontWeight: '500' }}>
                Phone: +1 617-749-5301
              </Text>
              <Pressable onPress={() => setShowHelp(false)} style={styles.closeBtn}>
                <Text style={styles.closeText}>Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}
