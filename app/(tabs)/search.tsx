import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Search as SearchIcon, Filter, X } from 'lucide-react-native';
import { useState } from 'react';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tout');
  
  return (
    <LinearGradient
      colors={['#2C1810', '#3D2419']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Recherche</Text>
        
        <View style={styles.searchContainer}>
          <SearchIcon size={20} color="#8A8A8A" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher des recettes..."
            placeholderTextColor="#8A8A8A"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <Pressable onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <X size={18} color="#8A8A8A" />
            </Pressable>
          )}
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersContainer}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filter, index) => (
            <Pressable 
              key={index} 
              style={[
                styles.filterChip,
                activeFilter === filter && styles.activeFilterChip
              ]}
              onPress={() => setActiveFilter(filter)}
            >
              <Text 
                style={[
                  styles.filterText,
                  activeFilter === filter && styles.activeFilterText
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
      
      <ScrollView style={styles.resultsContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.popularSearchesSection}>
          <Text style={styles.sectionTitle}>Recherches populaires</Text>
          <View style={styles.popularSearchesGrid}>
            {popularSearches.map((item, index) => (
              <Pressable key={index} style={styles.popularSearchItem}>
                <Text style={styles.popularSearchText}>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View style={styles.trendingSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Tendances</Text>
            <Pressable>
              <Text style={styles.seeAllText}>Voir tout</Text>
            </Pressable>
          </View>
          
          {trendingRecipes.map((recipe, index) => (
            <Pressable key={index} style={styles.recipeCard}>
              <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
              <View style={styles.recipeInfo}>
                <Text style={styles.recipeTitle}>{recipe.title}</Text>
                <Text style={styles.recipeDescription}>{recipe.description}</Text>
                <View style={styles.recipeMetaInfo}>
                  <Text style={styles.recipeTime}>{recipe.time} min</Text>
                  <View style={styles.recipeDifficultyContainer}>
                    <Text style={styles.recipeDifficulty}>{recipe.difficulty}</Text>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
    </LinearGradient>
  );
}

const filters = ['Tout', 'Petit-déjeuner', 'Déjeuner', 'Dîner', 'Desserts', 'Végétarien', 'Rapide'];

const popularSearches = [
  'Poulet', 'Végétarien', 'Sans gluten', 'Rapide', 'Pâtes', 'Healthy', 'Dessert'
];

const trendingRecipes = [
  {
    title: 'Bowl de Buddha aux légumes grillés',
    description: 'Un repas équilibré et coloré avec des légumes de saison',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2940&auto=format&fit=crop',
    time: 30,
    difficulty: 'Facile'
  },
  {
    title: 'Curry de pois chiches',
    description: 'Un plat végétarien riche en protéines et en saveurs',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2371&auto=format&fit=crop',
    time: 45,
    difficulty: 'Moyen'
  },
  {
    title: 'Smoothie bowl aux fruits rouges',
    description: 'Un petit-déjeuner frais et vitaminé pour bien commencer la journée',
    image: 'https://images.unsplash.com/photo-1577805947697-89e18249d767?q=80&w=2898&auto=format&fit=crop',
    time: 15,
    difficulty: 'Facile'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF5E9',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 245, 233, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    color: '#FFF5E9',
    fontSize: 16,
  },
  clearButton: {
    padding: 4,
  },
  filtersContainer: {
    marginBottom: 8,
  },
  filtersContent: {
    paddingRight: 16,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 245, 233, 0.1)',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#FF6B35',
  },
  filterText: {
    color: '#FFF5E9',
    fontSize: 14,
  },
  activeFilterText: {
    fontWeight: '600',
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  popularSearchesSection: {
    marginTop: 24,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF5E9',
    marginBottom: 16,
  },
  popularSearchesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  popularSearchItem: {
    backgroundColor: 'rgba(255, 245, 233, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  popularSearchText: {
    color: '#FFF5E9',
    fontSize: 14,
  },
  trendingSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '500',
  },
  recipeCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 245, 233, 0.05)',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    height: 120,
  },
  recipeImage: {
    width: 120,
    height: '100%',
    resizeMode: 'cover',
  },
  recipeInfo: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF5E9',
    marginBottom: 4,
  },
  recipeDescription: {
    fontSize: 12,
    color: '#FFF5E9',
    opacity: 0.8,
    marginBottom: 8,
  },
  recipeMetaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recipeTime: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '500',
  },
  recipeDifficultyContainer: {
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  recipeDifficulty: {
    fontSize: 12,
    color: '#FF6B35',
  },
  spacer: {
    height: 80,
  }
});