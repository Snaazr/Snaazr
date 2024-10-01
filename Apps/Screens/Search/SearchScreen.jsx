import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';

const SearchUI = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Text style={styles.searchText}>Search by product, brand & more...</Text>
        </View>

        {/* Image Search */}
        <View style={styles.imageSearchContainer}>
          <Text style={styles.imageSearchText}>Search By Image</Text>
          <Text style={styles.subText}>Find similar products by uploading an image</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text>Click a Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text>Upload a Photo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Categories */}
        <View style={styles.categoriesContainer}>
          <View style={styles.row}>
            <CategoryCard title="Kurtas & Sets" />
            <CategoryCard title="Tops" />
          </View>
          <View style={styles.row}>
            <CategoryCard title="Tees" />
          </View>
        </View>

        {/* Trending Section */}
        <Text style={styles.trendingTitle}>Trending in Women</Text>
        <View style={styles.trendingContainer}>
          <View style={styles.row}>
            <CategoryCard title="Dresses" />
            <CategoryCard title="Sarees" />
          </View>
          <View style={styles.row}>
            <CategoryCard title="Jeans & Jeggings" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const CategoryCard = ({ title }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    marginVertical: 16,
  },
  searchText: {
    flex: 1,
    color: '#aaa',
  },
  imageSearchContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imageSearchText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 12,
    color: '#555',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  trendingContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginHorizontal: 8,
  },
  cardText: {
    fontSize: 14,
    textAlign: 'center',
  },
});

export default SearchUI;
