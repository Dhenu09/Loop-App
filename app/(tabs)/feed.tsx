import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, Image, Pressable, Text, View } from 'react-native';
import Header from '../../components/Header';
import { supabase } from '../../src/supabaseClient';
import styles from './FeedStyles';
import GiftCardsSection from './GiftCardsSection';

type Item = {
  id: number;
  title: string;
  price: number;
  image_url: string;
  posted_by: string;
  is_sold?: boolean;
};

export default function Feed() {
  const router = useRouter();
  const [items, setItems] = useState<Item[]>([]);
  const [selectedTab, setSelectedTab] = useState<'recent' | 'gift'>('recent');

  useEffect(() => {
    const fetchItems = async () => {
      const { data, error } = await supabase
        .from('items')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) setItems(data);
    };

    fetchItems();
  }, []);

  const renderItem = ({ item }: { item: Item }) => (
    <View style={[styles.card, { width: '100%' }]}>
      <View style={{ position: 'relative' }}>
        {item.is_sold && (
          <View
            style={{
              position: 'absolute',
              top: 8,
              left: 8,
              zIndex: 1,
              backgroundColor: 'white',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 12,
            }}
          >
            <Text style={{ fontSize: 11, fontWeight: '600' }}>Sold</Text>
          </View>
        )}

        {item.image_url ? (
          <Image
            source={{ uri: item.image_url }}
            style={[styles.image, { width: '100%' }]}
          />
        ) : (
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>No Image</Text>
          </View>
        )}
      </View>

      <View style={styles.details}>
        <View style={styles.priceRow}>
          <Text style={styles.price}>${item.price}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>

        {item.is_sold ? (
          <View
            style={{
              marginTop: 8,
              borderRadius: 8,
              paddingVertical: 12,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#F1F1F3',
            }}
          >
            <Text
              style={{
                color: '#A0A0A5',
                fontWeight: '500',
              }}
            >
              Item has been sold
            </Text>
          </View>
        ) : (
          <Pressable
            style={styles.button}
            onPress={() => {
              if (item.is_sold) return;
              router.push({
                pathname: '/order',
                params: {
                  title: item.title,
                  price: item.price.toString(),
                  image_url: item.image_url,
                  item_id: item.id.toString(),
                },
              });
            }}
          >
            <Text style={styles.buttonText}>I want this!</Text>
          </Pressable>
        )}
      </View>
    </View>
  );

  const renderRecentHeader = () => (
    <View
      style={{
        backgroundColor: '#F3F4F6',
        borderRadius: 10,
        paddingHorizontal: 14,
        paddingVertical: 10,
        marginBottom: 12,
        marginTop:15,
        flexDirection: 'row',
        alignItems: 'center',
        height:120,
        width:'100%',
       

      }}
    >
      <View style={{ flex: 1, paddingRight: 10 }}>
        <Text style={{ fontFamily: 'Albert Sans', fontSize: 17, fontWeight: '800', marginBottom: 13}}>
          Welcome to Loop! 🎉
        </Text>
        <Text style={{ fontFamily: 'Albert Sans',fontSize: 17, fontWeight:'500', color: '#6B7280' }}>
          New stuff is added every day.</Text>
          <Text style={{ fontFamily: 'Albert Sans',fontSize: 16.5, fontWeight:'500',color: '#6B7280', marginTop:5 }}>Featured items drop Thursdays at 6pm.</Text>
          
      </View>
      <View
        style={{
          width: 52,
          height: 52,
          borderRadius: 12,
          backgroundColor: '#FFF1E5',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text style={{ fontSize: 26 }}>🎁</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header title="Feed" balance={25} />

     
      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 16,
          marginTop: 8,
          marginBottom: 8,
          backgroundColor: '#F0EDF3',
          borderRadius: 10,
          padding: 4,
        }}
      >
        <Pressable
          onPress={() => setSelectedTab('recent')}
          style={{
            flex: 1,
            paddingVertical: 7,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor:
              selectedTab === 'recent' ? 'white' : 'transparent',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: selectedTab === 'recent' ? '#000' : '#7A7385',
            }}
          >
            Recent items
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedTab('gift')}
          style={{
            flex: 1,
            paddingVertical: 7,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: selectedTab === 'gift' ? 'white' : 'transparent',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '800',
              color: selectedTab === 'gift' ? '#000' : '#7A7385',
            }}
          >
            Gift cards
          </Text>
        </Pressable>
      </View>

      {selectedTab === 'gift' ? (
        <GiftCardsSection />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ListHeaderComponent={renderRecentHeader}
        />
      )}
    </View>
  );
}
