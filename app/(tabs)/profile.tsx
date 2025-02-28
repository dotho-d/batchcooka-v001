import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Settings, Heart, Clock, BookOpen } from 'lucide-react-native';
import LoadingScreen from '../../components/LoadingScreen';
import { useState, useEffect } from 'react';

export default function ProfileScreen() {
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
    <LinearGradient
      colors={['#2C1810', '#3D2419']}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Profil</Text>
            <Pressable style={styles.settingsButton}>
              <Settings size={24} color="#FFF5E9" />
            </Pressable>
          </View>
          
          <View style={styles.profileSection}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2787&auto=format&fit=crop' }} 
              style={styles.profileImage} 
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>Sophie Martin</Text>
              <Text style={styles.profileBio}>Passionnée de cuisine saine et rapide</Text>
            </View>
          </View>
          
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>24</Text>
              <Text style={styles.statLabel}>Recettes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>156</Text>
              <Text style={styles.statLabel}>Favoris</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>38</Text>
              <Text style={styles.statLabel}>Suivis</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.menuSection}>
          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Heart size={20} color="#FF6B35" />
            </View>
            <Text style={styles.menuText}>Recettes favorites</Text>
          </Pressable>
          
          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <Clock size={20} color="#FF6B35" />
            </View>
            <Text style={styles.menuText}>Historique</Text>
          </Pressable>
          
          <Pressable style={styles.menuItem}>
            <View style={styles.menuIconContainer}>
              <BookOpen size={20} color="#FF6B35" />
            </View>
            <Text style={styles.menuText}>Mes recettes</Text>
          </Pressable>
        </View>
        
        <View style={styles.recentActivitySection}>
          <Text style={styles.sectionTitle}>Activité récente</Text>
          
          {recentActivities.map((activity, index) => (
            <View key={index} style={styles.activityItem}>
              <Image source={{ uri: activity.image }} style={styles.activityImage} />
              <View style={styles.activityInfo}>
                <Text style={styles.activityTitle}>{activity.title}</Text>
                <Text style={styles.activityTime}>{activity.time}</Text>
              </View>
            </View>
          ))}
        </View>
        
        <View style={styles.spacer} />
      </ScrollView>
    </LinearGradient>
  );
}

const recentActivities = [
  {
    title: "Vous avez ajouté 'Poulet rôti aux herbes' à vos favoris",
    time: "Il y a 2 heures",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?q=80&w=3076&auto=format&fit=crop"
  },
  {
    title: "Vous avez cuisiné 'Lasagnes végétariennes'",
    time: "Hier",
    image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=2835&auto=format&fit=crop"
  },
  {
    title: "Vous avez ajouté 'Saumon grillé' à votre plan de la semaine",
    time: "Il y a 3 jours",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2940&auto=format&fit=crop"
  }
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFF5E9',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF5E9',
    marginBottom: 4,
  },
  profileBio: {
    fontSize: 14,
    color: '#FFF5E9',
    opacity: 0.8,
  },
  statsSection: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderRadius: 16,
    padding: 16,
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#FFF5E9',
    opacity: 0.8,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 245, 233, 0.2)',
  },
  menuSection: {
    paddingHorizontal: 16,
    marginTop: 24,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 245, 233, 0.1)',
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    fontSize: 16,
    color: '#FFF5E9',
    fontWeight: '500',
  },
  recentActivitySection: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF5E9',
    marginBottom: 16,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'rgba(255, 245, 233, 0.05)',
    borderRadius: 12,
    padding: 12,
  },
  activityImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 14,
    color: '#FFF5E9',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#FFF5E9',
    opacity: 0.6,
  },
  spacer: {
    height: 80,
  }
});
