import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../../components/Header';

const categories = [
  'Home decor',
  'Furniture & storage',
  'Electronics & appliances',
  'Lighting & lamps',
  'Sports & outdoors',
  'Kitchen & dining',
  'Fitness & exercise',
  'Gaming & entertainment',
  'Kids & babies',
  'Travel & luggage',
  'Tools & DIY',
];

export default function Search() {
  return (
    <View style={styles.container}>
      <Header title="Search" balance={25} />

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        <View style={styles.searchBox}>
          <TextInput
            placeholder="Search near Oak Grove"
            placeholderTextColor="#999"
            style={styles.searchInput}
          />
        </View>

  

        <Text style={styles.sectionTitle}>Browse by category</Text>
        {categories.map((item, index) => (
          <Pressable key={index} style={styles.categoryRow}>
            <View style={styles.rowLeft}>
              <Text style={styles.catText}>{item}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  searchBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 30,
  },
  searchInput: {
    fontSize: 16,
    color: 'black',
  },
  sectionTitle: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 10,
    color: 'black',
    marginRight: 10,
    marginLeft: 20,
    marginTop: -20,
  },
 
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  catText: {
    fontSize: 15,
    color: 'black',
  },
  arrow: {
    fontSize: 20,
    color: '#999',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    paddingBottom: 20,
  },
});

