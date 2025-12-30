import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Header from '../components/Header';
import { supabase } from '../src/supabaseClient';

export default function Order() {
  const router = useRouter();
  const { title, price = '20', image_url, item_id } = useLocalSearchParams();
  const itemPrice = parseFloat(price as string) || 20;

  const itemId =
    typeof item_id === 'string' ? parseInt(item_id as string, 10) : null;

  const [deliveryType, setDeliveryType] = useState<'courier' | 'pickup'>(
    'courier'
  );
  const [name, setName] = useState('Dhenu Patel');
  const [phone, setPhone] = useState('617-749-5301');
  const [address, setAddress] = useState('5340 Budding Ct. Marietta, GA');
  const [editing, setEditing] = useState(false);

  const [balance, setBalance] = useState<number>(25);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('No logged in user in Order:', userError?.message);
        return;
      }

      setUserEmail(user.email!);

      const { data: userRow, error: balanceError } = await supabase
        .from('users')
        .select('balance')
        .eq('email', user.email)
        .maybeSingle();

      if (balanceError) {
        console.error('Could not load balance:', balanceError.message);
        setBalance(25);
      } else if (!userRow) {
        setBalance(25);
      } else {
        setBalance(userRow.balance ?? 25);
      }
    };

    init();
  }, []);

  const deliveryFee = deliveryType === 'courier' ? 3.99 : 0;
  const subtotal = itemPrice;
  const total = subtotal + deliveryFee;
  const remaining = Math.max(0, total - balance);

  const handleOrder = async () => {
    if (!userEmail) {
      alert('Please log in again.');
      return;
    }

    const oldBalance = balance;
    const newBalance = Math.max(0, oldBalance - total);

    const { error } = await supabase.from('orders').insert({
      user_email: userEmail,
      item_id: itemId,
      item_title: title,
      item_price: itemPrice,
      delivery_type: deliveryType,
      name,
      phone,
      address,
      delivery_fee: deliveryFee,
      total,
      image_url,
    });

    if (error) {
      console.error('Order save failed:', error.message);
      alert('Order failed to save.');
      return;
    }

    const { error: updateError } = await supabase
      .from('users')
      .update({ balance: newBalance })
      .eq('email', userEmail);

    if (updateError) {
      console.error('Balance update failed:', updateError.message);
    }

    if (itemId !== null && !Number.isNaN(itemId)) {
      const { error: soldError } = await supabase
        .from('items')
        .update({ is_sold: true })
        .eq('id', itemId);

      if (soldError) {
        console.error('Failed to mark item as sold:', soldError.message);
      }
    }

    setBalance(newBalance);

    const cardAmount = Math.max(0, total - oldBalance);

    alert(
      cardAmount > 0
        ? `Paid $${cardAmount.toFixed(2)} with card.`
        : 'Order placed using Loop credits!'
    );

    router.push('/(tabs)/feed');
  };

  return (
    <View style={styles.container}>
      <Header
        title="Order"
        balance={balance}
        showBack
        onBack={() => router.push('/(tabs)/feed')}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.itemPreview}>
          {image_url ? (
            <Image source={{ uri: image_url as string }} style={styles.itemImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}
          <View style={styles.itemInfo}>
            <Text style={styles.itemPrice}>${itemPrice.toFixed(2)}</Text>
            <Text style={styles.itemTitle}>{title}</Text>
            <Text style={styles.itemSeller}>
              Peter Parker {'\n'}Oak Grove
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Pressable
            onPress={() => setDeliveryType('courier')}
            style={[
              styles.deliveryBox,
              deliveryType === 'courier' && styles.selectedBox,
            ]}
          >
            <Text style={styles.deliveryText}> Courier delivery</Text>
            <Text style={styles.deliverySub}>2–3 business days • $3.99</Text>
          </Pressable>
          <Pressable
            onPress={() => setDeliveryType('pickup')}
            style={[
              styles.deliveryBox,
              deliveryType === 'pickup' && styles.selectedBox,
            ]}
          >
            <Text style={styles.deliveryText}>Pick it up</Text>
            <Text style={styles.deliverySub}>
              14.4 mi away in Decatur • Free
            </Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Delivery</Text>
            <Pressable onPress={() => setEditing(!editing)}>
              <Text style={styles.editButtonText}>
                {editing ? 'Save' : 'Edit'}
              </Text>
            </Pressable>
          </View>
          {editing ? (
            <>
              <TextInput value={name} onChangeText={setName} style={styles.input} />
              <TextInput value={phone} onChangeText={setPhone} style={styles.input} />
              <TextInput
                value={address}
                onChangeText={setAddress}
                style={styles.input}
              />
            </>
          ) : (
            <View style={styles.infoBlock}>
              <Text>{name}</Text>
              <Text>{phone}</Text>
              <Text>{address}</Text>
            </View>
          )}
        </View>

        <View style={styles.summaryBox}>
          <Text style={styles.sectionTitle}>Summary</Text>
          <View style={styles.row}>
            <Text>Item subtotal</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text>Loop credits (${balance.toFixed(2)})</Text>
            <Text style={styles.negative}>
              -${Math.min(balance, total).toFixed(2)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text>Delivery fee</Text>
            <Text>${deliveryFee.toFixed(2)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalLabel}>${total.toFixed(2)}</Text>
          </View>
          {remaining > 0 && (
            <Text style={styles.remaining}>
              Pay by card: ${remaining.toFixed(2)}
            </Text>
          )}
        </View>
      </ScrollView>

      <Pressable style={styles.orderButton} onPress={handleOrder}>
        <Text style={styles.orderButtonText}>Place Order</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  content: { padding: 24, paddingBottom: 100 },
  itemPreview: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#f1f1f1',
    resizeMode: 'cover',
  },
  placeholderImage: {
    width: '30%',
    height: '50%',
    borderRadius: 12,
    backgroundColor: '#f1f1f1',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 40,
  },
  placeholderText: { color: '#888' },
  itemInfo: { flex: 1 },
  itemPrice: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 4,
    bottom: 40,
  },
  itemTitle: {
    fontSize: 17,
    fontWeight: '500',
    color: 'black',
    marginBottom: 4,
    bottom: 40,
  },
  itemSeller: {
    fontSize: 16,
    fontWeight: '500',
    color: 'rgb(154, 157, 163)',
    bottom: 40,
  },
  section: { marginBottom: 20, bottom: 60 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontWeight: '700',
    marginBottom: 20,
    color: 'black',
  },
  negative: { color: 'black' },
  sectionTitle: { fontSize: 22, fontWeight: '700', color: 'black' },
  deliveryBox: {
    borderWidth: 1.5,
    borderColor: '#eee',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },
  selectedBox: {
    borderWidth: 2,
    borderColor: '#030303',
    backgroundColor: '#fcf7f9',
  },
  deliveryText: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
    color: 'black',
  },
  deliverySub: { fontSize: 16, fontWeight: '500', color: 'black' },
  input: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  infoBlock: { gap: 4 },
  editButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgb(47, 112, 244)',
    textAlign: 'right',
    marginBottom: 10,
  },
  summaryBox: { marginBottom: 10, bottom: 40, padding: 10, left: -10, right: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  totalLabel: { fontWeight: 'bold' },
  remaining: { marginTop: 8, color: '#f54646', fontWeight: 'bold' },
  orderButton: {
    width: '90%',
    height: '7%',
    position: 'absolute',
    borderRadius: 5,
    opacity: 1,
    backgroundColor: '#FA3D50',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: '10%',
    left: '4.5%',
  },
  orderButtonText: { color: 'white', fontWeight: 'bold', fontSize: 17 },
});
