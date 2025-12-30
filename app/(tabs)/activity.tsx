
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import styles from '../(tabs)/ActivityStyles';
import Header from '../../components/Header';
import { supabase } from '../../src/supabaseClient';

export default function Activity() {
  const [tab, setTab] = useState<'orders' | 'listings'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingListings, setLoadingListings] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('No logged-in user in Activity:', userError?.message);
        setLoadingOrders(false);
        setLoadingListings(false);
        return;
      }

      const userEmail = user.email!;
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_email', userEmail)
        .order('created_at', { ascending: false });

      if (ordersError) {
        console.error('Fetch orders failed:', ordersError.message);
        setOrders([]);
      } else {
        setOrders(ordersData ?? []);
      }
      setLoadingOrders(false);

      
      const { data: listingsData, error: listingsError } = await supabase
        .from('listings')
        .select('*')
        .eq('user_email', userEmail) 
        .order('created_at', { ascending: false });

      if (listingsError) {
        console.error('Fetch listings failed:', listingsError.message);
        setListings([]);
      } else {
        setListings(listingsData ?? []);
      }
      setLoadingListings(false);
    };

    fetchData();
  }, []);

  const renderOrder = ({ item: order }: { item: any }) => (
    <View
      key={order.id}
      style={{
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 14,
      }}
    >
      {order.image_url ? (
        <Image
          source={{ uri: order.image_url }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 10,
            marginRight: 12,
            backgroundColor: '#eee',
          }}
        />
      ) : (
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 10,
            marginRight: 12,
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#888', fontSize: 12 }}>No Image</Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <View style={{ marginBottom: 4 }}>
          <Text style={{ fontWeight: '700', fontSize: 15 }} numberOfLines={2}>
            {order.item_title}
          </Text>
          <View style={{ marginTop: 4, alignSelf: 'flex-start' }}>
            <Text
              style={{
                backgroundColor: '#D1FAE5',
                color: '#047857',
                fontSize: 12,
                fontWeight: '600',
                paddingHorizontal: 8,
                paddingVertical: 3,
                borderRadius: 12,
                overflow: 'hidden',
              }}
            >
              Ready for Pickup
            </Text>
          </View>
        </View>

        <Text style={{ color: '#555', fontSize: 13 }}>
          Ordered{' '}
          {new Date(order.created_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>

        <Text style={{ fontWeight: '600', fontSize: 14, marginTop: 2 }}>
          ${parseFloat(order.total).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  const renderListing = ({ item: listing }: { item: any }) => (
    <View
      key={listing.id}
      style={{
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 14,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        marginBottom: 14,
      }}
    >
      {listing.image_url ? (
        <Image
          source={{ uri: listing.image_url }}
          style={{
            width: 72,
            height: 72,
            borderRadius: 10,
            marginRight: 12,
            backgroundColor: '#eee',
          }}
        />
      ) : (
        <View
          style={{
            width: 72,
            height: 72,
            borderRadius: 10,
            marginRight: 12,
            backgroundColor: '#eee',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#888', fontSize: 12 }}>No Image</Text>
        </View>
      )}

      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', fontSize: 15 }} numberOfLines={2}>
          {listing.title}
        </Text>
        <Text style={{ color: '#555', fontSize: 13, marginTop: 4 }}>
          Posted{' '}
          {new Date(listing.created_at).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </Text>
        <Text style={{ fontWeight: '600', fontSize: 14, marginTop: 2 }}>
          ${parseFloat(listing.price).toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Activity" balance={25} />

      <View style={styles.tabRow}>
        <Pressable
          style={[styles.tabButton, tab === 'orders' && styles.activeTab]}
          onPress={() => setTab('orders')}
        >
          <Text style={[styles.tabText, tab === 'orders' && styles.activeTabText]}>
            Orders
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tabButton, tab === 'listings' && styles.activeTab]}
          onPress={() => setTab('listings')}
        >
          <Text
            style={[styles.tabText, tab === 'listings' && styles.activeTabText]}
          >
            Listings
          </Text>
        </Pressable>
      </View>

      {tab === 'orders' ? (
        loadingOrders ? (
          <Text style={{ textAlign: 'center', marginTop: 40 }}>Loading…</Text>
        ) : orders.length === 0 ? (
          <>
            <Image
              source={require('../../assets/Listingsempty.png')}
              style={{
                width: 200,
                height: 290,
                position: 'relative',
                alignSelf: 'center',
                top: 40,
              }}
            />
            <Text
              style={{
                fontSize: 26,
                marginTop: 9,
                fontWeight: '700',
                alignSelf: 'center',
                textAlign: 'center',
                position: 'relative',
                top: 40,
                fontFamily: 'Albert Sans',
                color: 'rgba(0, 0, 0, 1)',
              }}
            >
              Treasure awaits...
            </Text>
            <Text
              style={{
                fontSize: 17,
                marginTop: 13,
                fontWeight: '500',
                position: 'relative',
                alignSelf: 'center',
                textAlign: 'center',
                top: 40,
                fontFamily: 'Albert Sans',
                color: 'rgba(107, 114, 128, 1)',
              }}
            >
              Order stuff from the feed. Then you’ll see it here and get your new
              items.
            </Text>
            <Image
              source={require('../../assets/arrowleft.png')}
              style={{
                width: '35%',
                height: '18%',
                position: 'relative',
                top: '13%',
                left: '10%',
                right: '5%',
              }}
            />
          </>
        ) : (
          <FlatList
            data={orders}
            keyExtractor={(item) => String(item.id)}
            renderItem={renderOrder}
            showsVerticalScrollIndicator
            contentContainerStyle={{
              paddingHorizontal: 16,
              paddingTop: 8,
              paddingBottom: 120,
            }}
          />
        )
      ) : loadingListings ? (
        <Text style={{ textAlign: 'center', marginTop: 40 }}>Loading…</Text>
      ) : listings.length === 0 ? (
        <>
          <Image
            source={require('../../assets/Listingsempty.png')}
            style={{ width: 200, height: 290, alignSelf: 'center', top: 40 }}
          />
          <Text
            style={{
              fontSize: 26,
              marginTop: 9,
              fontWeight: '700',
              alignSelf: 'center',
              textAlign: 'center',
              top: 40,
              fontFamily: 'Albert Sans',
              color: 'rgba(0, 0, 0, 1)',
            }}
          >
            Sell your first item.
          </Text>
          <Text
            style={{
              fontSize: 17,
              marginTop: 13,
              fontWeight: '500',
              alignSelf: 'center',
              textAlign: 'center',
              position: 'relative',
              top: 40,
              fontFamily: 'Albert Sans',
              color: 'rgba(107, 114, 128, 1)',
            }}
          >
            Sell stuff just by taking a picture. Get paid instantly in Loop
            credits.
          </Text>
          <Image
            source={require('../../assets/arrowright.png')}
            style={{
              width: '35%',
              height: '18%',
              position: 'relative',
              top: '13%',
              left: '18%',
              right: '5%',
            }}
          />
        </>
      ) : (
        <FlatList
          data={listings}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderListing}
          showsVerticalScrollIndicator
          contentContainerStyle={{
            paddingHorizontal: 16,
            paddingTop: 8,
            paddingBottom: 120,
          }}
        />
      )}
    </View>
  );
}
