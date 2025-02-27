import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';

// Chemin vers la police locale
const customFonts = {
  RockSalt: require('./asset/fonts/RockSalt-Regular.ttf'),
  LovedbytheKing: require('./asset/fonts/LovedbytheKing-Regular.ttf'),
  Gruppo: require('./asset/fonts/Gruppo-Regular.ttf'),
};

export default function WelcomeScreen() {
  const router = useRouter();

  const [fontsLoaded] = useFonts(customFonts);

  // Garder l'écran de démarrage visible jusqu'à ce que les polices soient chargées
  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <LinearGradient colors={['#2C1810', '#3D2419']} style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>BatchCooka</Text>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push('/auth/register')}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              S'inscrire
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push('/auth/discover')}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Découvrir
            </Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
}

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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '35%',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 48,
    fontFamily: 'RockSalt', // Utilisation de la police locale
    color: '#FFF5E9',
    marginBottom: 120,
    textAlign: 'center',
    transform: [{ rotate: '-5deg' }],
  },
  buttonContainer: {
    width: '100%',
    gap: 20,
    alignItems: 'center',
  },
  button: {
    width: '80%',
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 12,
  },
  primaryButtonText: {
    color: '#FFF5E9',
  },
  secondaryButtonText: {
    color: '#FF6B35',
  },
});
