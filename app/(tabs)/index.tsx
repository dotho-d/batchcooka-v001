import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, RockSalt_400Regular } from '@expo-google-fonts/rock-salt';
import { ActivityIndicator } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    RockSalt_400Regular,
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={['#2C1810', '#3D2419']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.logo}>BatchCooka</Text>
          <Text style={styles.welcomeText}>Bonjour, Chef!</Text>
        </View>
        
        <View style={styles.featuredSection}>
          <Text style={styles.sectionTitle}>Recettes populaires</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {popularRecipes.map((recipe, index) => (
              <Pressable key={index} style={styles.recipeCard}>
                <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
                <View style={styles.recipeInfo}>
                  <Text style={styles.recipeTitle}>{recipe.title}</Text>
                  <View style={styles.recipeMetaInfo}>
                    <Text style={styles.recipeTime}>{recipe.time} min</Text>
                    <Text style={styles.recipeDifficulty}>{recipe.difficulty}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Catégories</Text>
            <Pressable style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Voir tout</Text>
              <ChevronRight size={16} color="#FF6B35" />
            </Pressable>
          </View>
          <View style={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <Pressable key={index} style={styles.categoryCard}>
                <Image source={{ uri: category.image }} style={styles.categoryImage} />
                <Text style={styles.categoryTitle}>{category.title}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        
        <View style={styles.weeklyPlanSection}>
          <Text style={styles.sectionTitle}>Votre plan de la semaine</Text>
          <Pressable style={styles.weeklyPlanCard}>
            <LinearGradient
              colors={['rgba(255, 107, 53, 0.8)', 'rgba(255, 107, 53, 0.6)']}
              style={styles.weeklyPlanGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.weeklyPlanContent}>
                <Text style={styles.weeklyPlanTitle}>Plan de repas</Text>
                <Text style={styles.weeklyPlanSubtitle}>Organisez vos repas pour la semaine</Text>
                <Pressable style={styles.weeklyPlanButton}>
                  <Text style={styles.weeklyPlanButtonText}>Commencer</Text>
                </Pressable>
              </View>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2940&auto=format&fit=crop' }} 
                style={styles.weeklyPlanImage} 
              />
            </LinearGradient>
          </Pressable>
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
    </LinearGradient>
  );
}

const popularRecipes = [
  {
    title: 'Poulet rôti aux herbes',
    image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=3076&auto=format&fit=crop',
    time: 45,
    difficulty: 'Facile'
  },
  {
    title: 'Lasagnes végétariennes',
    image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=2835&auto=format&fit=crop',
    time: 60,
    difficulty: 'Moyen'
  },
  {
    title: 'Saumon grillé',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2940&auto=format&fit=crop',
    time: 30,
    difficulty: 'Facile'
  }
];

const categories = [
  {
    title: 'Petit-déjeuner',
    image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=2940&auto=format&fit=crop'
  },
  {
    title: 'Déjeuner',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=3000&auto=format&fit=crop'
  },
  {
    title: 'Dîner',
    image: 'https://images.unsplash.com/photo-1559847844-5315695dadae?q=80&w=2940&auto=format&fit=crop'
  },
  {
    title: 'Desserts',
    image: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2787&auto=format&fit=crop'
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2C1810',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
  },
  logo: {
    fontSize: 28,
    fontFamily: 'RockSalt_400Regular',
    color: '#FFF5E9',
    transform: [{ rotate: '-3deg' }],
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF5E9',
    marginTop: 8,
  },
  featuredSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF5E9',
    marginBottom: 16,
  },
  horizontalScroll: {
    marginLeft: -8,
  },
  recipeCard: {
    width: 280,
    height: 180,
    marginRight: 16,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#3D2419',
  },
  recipeImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  recipeInfo: {
    padding: 12,
  },
  recipeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF5E9',
    marginBottom: 4,
  },
  recipeMetaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  recipeTime: {
    fontSize: 14,
    color: '#FF6B35',
  },
  recipeDifficulty: {
    fontSize: 14,
    color: '#FFF5E9',
    opacity: 0.7,
  },
  categoriesSection: {
    marginTop: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF6B35',
    marginRight: 4,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    height: 120,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  categoryTitle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(44, 24, 16, 0.7)',
    padding: 8,
    color: '#FFF5E9',
    fontWeight: '600',
    textAlign: 'center',
  },
  weeklyPlanSection: {
    marginTop: 32,
    marginBottom: 24,
  },
  weeklyPlanCard: {
    borderRadius: 16,
    overflow: 'hidden',
    height: 180,
  },
  weeklyPlanGradient: {
    flexDirection: 'row',
    height: '100%',
  },
  weeklyPlanContent: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  weeklyPlanTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFF5E9',
    marginBottom: 8,
  },
  weeklyPlanSubtitle: {
    fontSize: 14,
    color: '#FFF5E9',
    marginBottom: 16,
    opacity: 0.9,
  },
  weeklyPlanButton: {
    backgroundColor: '#FFF5E9',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  weeklyPlanButtonText: {
    color: '#FF6B35',
    fontWeight: '600',
  },
  weeklyPlanImage: {
    width: '40%',
    height: '100%',
    resizeMode: 'cover',
  },
  spacer: {
    height: 80,
  }
});