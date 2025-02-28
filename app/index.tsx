import { useFonts } from 'expo-font';
import { Text, View, StyleSheet, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import NoiseTexture from '../components/NoiseTexture';
import Particles from '../components/Particles';
import LoadingScreen from '../components/LoadingScreen';

export default function WelcomeScreen() {
  const router = useRouter();

  const customFonts = {
    RockSalt: require("../assets/fonts/RockSalt-Regular.ttf"),
    LovedbytheKing: require("../assets/fonts/LovedbytheKing-Regular.ttf"),
    Gruppo: require("../assets/fonts/Gruppo-Regular.ttf"),
  };

  const [fontsLoaded] = useFonts(customFonts);

  if (!fontsLoaded) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2C1810", "#3D2419"]}
        style={styles.background}
      />
      <NoiseTexture opacity={0.2} />
      <Particles
        count={34}
        color="#FFF5E9"
        minSize={0.4}
        maxSize={2.4}
        minDuration={15000}
        maxDuration={25000}
      />
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image
            source={require("../assets/images/chef-hat.svg")}
            style={{ width: 46, height: 46, tintColor: "#FFF5E9" }}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, styles.titleBatch]}>Batch</Text>
          <Text style={[styles.title, styles.titleCooka]}>Cooka&apos;</Text>
          <Text style={styles.slogan}>L&apos;application qui t&apos;aide à cuisiner efficacement</Text>
          <Text style={styles.sloganBold}>une bonne fois pour toute !</Text>
        </View>
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.button, styles.primaryButton]}
            onPress={() => router.push("/(auth)/register")}
          >
            <Text style={[styles.buttonText, styles.primaryButtonText]}>
              S&apos;inscrire
            </Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={() => router.push("/discover")}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              Découvrir
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2C1810",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: "28%",
    paddingHorizontal: 24,
    zIndex: 3,
  },
  iconContainer: {
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  titleContainer: {
    marginBottom: 74,
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontFamily: "RockSalt",
    color: "#FFF5E9",
  },
  titleBatch: {
    transform: [{ rotate: "-8deg" }],
    marginLeft: -100,
    marginBottom: -64,
  },
  titleCooka: {
    transform: [{ rotate: "-8deg" }],
    marginRight: -100,
  },
  slogan: {
    fontFamily: "LovedbytheKing",
    fontSize: 19,
    color: "#FFF5E9",
    marginTop: 4,
    textAlign: "center",
    letterSpacing: 1.2,
  },
  sloganBold: {
    fontFamily: "LovedbytheKing",
    fontSize: 28,
    color: "#FFF5E9",
    marginTop: 0,
    textAlign: "center",
    fontWeight: "500",
    letterSpacing: 1.2,
  },
  buttonContainer: {
    width: "100%",
    gap: 24,
    alignItems: "center",
  },
  button: {
    width: "56%",
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: "center",
  },
  primaryButton: {
    backgroundColor: "#FF6B35",
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF6B35",
  },
  buttonText: {
    fontSize: 15,
    fontWeight: "600",
    fontFamily: "Gruppo",
    paddingHorizontal: 8,
    letterSpacing: 1,
  },
  primaryButtonText: {
    color: "#FFF5E9",
  },
  secondaryButtonText: {
    color: "#FF6B35",
  },
});
