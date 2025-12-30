import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  FlatList,
  Linking,
  Modal,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import styles from './FeedStyles';

type GiftCard = {
  id: string;
  brand: string;
  amount: number;
  credits: number;
  logoLetter: string;
  logoBg: string;
};

const GIFT_CARDS: GiftCard[] = [
  { id: 'publix', brand: 'Publix', amount: 30, credits: 100, logoLetter: 'P', logoBg: '#2E8B3E' },
  { id: 'chickfila', brand: 'Chick-fil-a', amount: 30, credits: 100, logoLetter: 'C', logoBg: '#E11E3C' },
  { id: 'buttercream', brand: 'Butter & Cream', amount: 30, credits: 100, logoLetter: 'B', logoBg: '#4B2C20' },
  { id: 'homedepot', brand: 'Home Depot', amount: 30, credits: 100, logoLetter: 'H', logoBg: '#F26622' },
  { id: 'doordash', brand: 'DoorDash', amount: 30, credits: 100, logoLetter: 'D', logoBg: '#F74437' },
  { id: 'souperjenny', brand: 'Souper Jenny', amount: 30, credits: 100, logoLetter: 'S', logoBg: '#D09A3F' },
  { id: 'banjo', brand: 'Banjo Coffee', amount: 30, credits: 100, logoLetter: 'B', logoBg: '#222222' },
  { id: 'spiller', brand: 'Spiller Park', amount: 30, credits: 100, logoLetter: 'S', logoBg: '#2F5D37' },
  { id: 'flyingbiscuit', brand: 'Flying Biscuit', amount: 30, credits: 100, logoLetter: 'F', logoBg: '#F28B2E' },
  { id: 'apple', brand: 'Apple Store', amount: 30, credits: 100, logoLetter: '', logoBg: '#000000' },
  { id: 'revolution', brand: 'Revolution Donuts', amount: 30, credits: 100, logoLetter: 'R', logoBg: '#D9A061' },
  { id: 'chaipani', brand: 'Chai Pani', amount: 30, credits: 100, logoLetter: 'C', logoBg: '#4A7D42' },
  { id: 'jenis', brand: "Jeni's Ice Cream", amount: 30, credits: 100, logoLetter: 'J', logoBg: '#FFB341' },
  { id: 'firstwatch', brand: 'First Watch', amount: 30, credits: 100, logoLetter: 'F', logoBg: '#444444' },
  { id: 'fellinis', brand: "Fellini's Pizza", amount: 30, credits: 100, logoLetter: 'F', logoBg: '#E54433' },
  { id: 'barnes', brand: 'Barnes & Noble', amount: 30, credits: 100, logoLetter: 'B', logoBg: '#24513F' },
  { id: 'lululemon', brand: 'Lululemon', amount: 30, credits: 100, logoLetter: 'L', logoBg: '#D50032' },
];

const GiftCardsSection = () => {
  const [showGiftInfo, setShowGiftInfo] = useState(false);

  const sheetTranslateY = useRef(new Animated.Value(400)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          sheetTranslateY.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        const shouldClose = gesture.dy > 120 || gesture.vy > 0.7;
        if (shouldClose) {
          Animated.timing(sheetTranslateY, {
            toValue: 400,
            duration: 200,
            useNativeDriver: true,
          }).start(() => setShowGiftInfo(false));
        } else {
          Animated.spring(sheetTranslateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  useEffect(() => {
    if (showGiftInfo) {
      sheetTranslateY.setValue(400);
      Animated.timing(sheetTranslateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }).start();
    }
  }, [showGiftInfo, sheetTranslateY]);

  const renderGiftCardItem = ({ item }: { item: GiftCard }) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: 'white',
      }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          backgroundColor: item.logoBg,
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '700', fontSize: 20 }}>
          {item.logoLetter}
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: 'black' }}>
          ${item.amount} gift card
        </Text>
        <Text style={{ fontSize: 13, color: '#60636B' }}>{item.brand}</Text>
        <Text style={{ fontSize: 12, color: '#8A8D96' }}>
          {item.credits} credits
        </Text>
      </View>

      <Pressable
        style={{
          paddingVertical: 8,
          paddingHorizontal: 16,
          borderRadius: 8,
          backgroundColor: '#1877F2',
        }}
        onPress={() => {
          alert('Gift card claiming coming soon!');
        }}
      >
        <Text style={{ color: 'white', fontWeight: '600', fontSize: 14 }}>
          Claim
        </Text>
      </Pressable>
    </View>
  );

  const renderHeader = () => (
    <Pressable
      onPress={() => setShowGiftInfo(true)}
      style={{
        backgroundColor: '#FA3D50',
        borderRadius: 5,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        width:'95%',
        height:89,
        left:'3%'
        }}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: 'rgba(255,255,255,0.25)',
          alignItems: 'center',
          justifyContent: 'center',
          marginRight: 12,
        }}
      >
        <Text style={{ fontSize: 24, color: 'white' }}>🎁</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: 'white',
            fontSize: 15,
            fontWeight: '700',
            marginBottom: 2,
          }}
        >
          Cash out with a gift card.
        </Text>
        <Text style={{ color: 'white', fontSize: 13 }}>
          Tap for more details.
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={GIFT_CARDS}
        renderItem={renderGiftCardItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={renderHeader}
      />

      <Modal
        visible={showGiftInfo}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGiftInfo(false)}
      >
        <Pressable
          style={{
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            justifyContent: 'flex-end',
          }}
          onPress={() => {
            Animated.timing(sheetTranslateY, {
              toValue: 400,
              duration: 200,
              useNativeDriver: true,
            }).start(() => setShowGiftInfo(false));
          }}
        >
          <Animated.View
            style={{
              backgroundColor: 'white',
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              paddingTop: 12,
              paddingHorizontal: 20,
              maxHeight: '75%',
              transform: [{ translateY: sheetTranslateY }],
            }}
            {...panResponder.panHandlers}
          >
            <View
              style={{
                width: 40,
                height: 4,
                backgroundColor: '#CFCFCF',
                alignSelf: 'center',
                borderRadius: 4,
                marginBottom: 12,
                marginTop: 4,
              }}
            />

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 40 }}
            >
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  marginBottom: 16,
                  color: 'black',
                }}
              >
                How do gift cards work?
              </Text>

              <Text style={{ fontSize: 16, marginBottom: 12, color: 'black' }}>
                Sometimes you don’t want more stuff.
              </Text>

              <Text style={{ fontSize: 16, marginBottom: 12, color: 'black' }}>
                Maybe you’re moving.{'\n'}
                Maybe you’re a minimalist at heart.{'\n'}
                Maybe you just don’t want anything new.
              </Text>

              <Text style={{ fontSize: 16, marginBottom: 12, color: 'black' }}>
                Instead, you can redeem your credits for gift cards. Everyday
                places you already spend money.
              </Text>

              <Text style={{ fontSize: 16, marginBottom: 12, color: 'black' }}>
                It's not a 1–1 swap with credits. If it were, our whole little
                Loop economy would collapse.
              </Text>

              <Text style={{ fontSize: 16, marginBottom: 12, color: 'black' }}>
                But it's enough to feel valuable. And still sustainable for us to
                offer.
              </Text>

              <Text style={{ fontSize: 16, marginBottom: 12, color: 'black' }}>
                Claim a gift card, and we'll deliver to your mailbox for free in
                1–2 business days.
              </Text>

              <Text style={{ fontSize: 16, marginBottom: 12, color: 'black' }}>
                Text me if you have any questions :)
              </Text>

              <Pressable onPress={() => Linking.openURL('tel:6177495301')}>
                <Text
                  style={{
                    fontSize: 16,
                    color: '#2563EB',
                    marginBottom: 20,
                    textDecorationLine: 'underline',
                  }}
                >
                  617–749–5301
                </Text>
              </Pressable>

              <Text style={{ fontSize: 16, marginBottom: 12, color: 'black' }}>
                – Dhenu
              </Text>

              <Pressable
                onPress={() => {
                  Animated.timing(sheetTranslateY, {
                    toValue: 400,
                    duration: 200,
                    useNativeDriver: true,
                  }).start(() => setShowGiftInfo(false));
                }}
                style={{ alignSelf: 'center', marginTop: 16, marginBottom: 20 }}
              >
                <Text style={{ fontSize: 16, color: '#2563EB' }}>Close</Text>
              </Pressable>
            </ScrollView>
          </Animated.View>
        </Pressable>
      </Modal>
    </View>
  );
};

export default GiftCardsSection;
