import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Image, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, ChevronRight } from "lucide-react-native";
import { useRouter } from "expo-router";
import NoiseTexture from "../components/NoiseTexture";
import LoadingScreen from "../components/LoadingScreen";

export default function DiscoverScreen() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2C1810", "#3D2419"]}
        style={styles.background}
      />
      <NoiseTexture opacity={0.2} />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={21} color="#FFF5E9" />
        </Pressable>
        <Text style={styles.headerTitle}>Découvrir</Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1556911220-bda9f7f7597e?q=80&w=2940&auto=format&fit=crop' }}
            style={styles.heroImage}
          />
          <View style={styles.heroOverlay}>
            <Text style={styles.heroTitle}>Découvrez BatchCooka</Text>
            <Text style={styles.heroSubtitle}>L'application qui révolutionne votre façon de cuisiner</Text>
          </View>
        </View>
        
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Fonctionnalités</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1607877361964-d8a8f69567d8?q=80&w=2787&auto=format&fit=crop' }}
                style={styles.featureImage}
              />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Planification de repas</Text>
              <Text style={styles.featureDescription}>Organisez vos repas pour la semaine en quelques clics</Text>
            </View>
            <ChevronRight size={20} color="#FF6B35" />
          </View>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?q=80&w=2876&auto=format&fit=crop' }}
                style={styles.featureImage}
              />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Recettes personnalisées</Text>
              <Text style={styles.featureDescription}>Des recettes adaptées à vos préférences et restrictions alimentaires</Text>
            </View>
            <ChevronRight size={20} color="#FF6B35" />
          </View>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Image 
                source={{ uri: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?q=80&w=2800&auto=format&fit=crop' }}
                style={styles.featureImage}
              />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Liste de courses</Text>
              <Text style={styles.featureDescription}>Générez automatiquement votre liste de courses basée sur vos repas</Text>
            </View>
            <ChevronRight size={20} color="#FF6B35" />
          </View>
        </View>
        
        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Prêt à commencer?</Text>
          <Text style={styles.ctaDescription}>Rejoignez des milliers d'utilisateurs qui optimisent leur temps en cuisine</Text>
          <Pressable 
            style={styles.ctaButton}
            onPress={() => router.push("/(auth)/register")}
          >
            <Text style={styles.ctaButtonText}>Créer un compte</Text>
          </Pressable>
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 15,
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  backButton: {
    marginRight: 15,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 21,
    fontWeight: '700',
    color: '#FFF5E9',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: 240,
    position: 'relative',
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: 'rgba(44, 24, 16, 0.7)',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF5E9',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FFF5E9',
    opacity: 0.9,
  },
  featuresSection: {
    paddingHorizontal: 16,
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF5E9',
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 245, 233, 0.05)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: 'hidden',
    marginRight: 16,
  },
  featureImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF5E9',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#FFF5E9',
    opacity: 0.8,
  },
  ctaSection: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF5E9',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    color: '#FFF5E9',
    opacity: 0.9,
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#FF6B35',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  ctaButtonText: {
    color: '#FFF5E9',
    fontSize: 16,
    fontWeight: '600',
  },
  spacer: {
    height: 80,
  }
});
