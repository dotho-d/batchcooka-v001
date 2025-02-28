import { View, Text, StyleSheet, TextInput, Pressable, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeOff } from "lucide-react-native";
import NoiseTexture from "../../components/NoiseTexture";

export default function RegisterScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2C1810", "#3D2419"]}
        style={styles.background}
      />
      <NoiseTexture opacity={0.2} />
      
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#FFF5E9" />
        </Pressable>
        <Image
          source={require("../../assets/images/chef-hat.svg")}
          style={{ width: 32, height: 32, tintColor: "#FFF5E9" }}
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>Rejoignez BatchCooka pour organiser vos repas</Text>
        
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre nom"
              placeholderTextColor="#8A8A8A"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="votre@email.com"
              placeholderTextColor="#8A8A8A"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Mot de passe</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Minimum 8 caractères"
                placeholderTextColor="#8A8A8A"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <Pressable 
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#8A8A8A" />
                ) : (
                  <Eye size={20} color="#8A8A8A" />
                )}
              </Pressable>
            </View>
          </View>
          
          <Pressable 
            style={styles.registerButton}
            onPress={() => router.push("/(tabs)")}
          >
            <Text style={styles.registerButtonText}>S'inscrire</Text>
          </Pressable>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Déjà un compte?</Text>
            <Pressable onPress={() => router.push("/(tabs)")}>
              <Text style={styles.loginLink}>Se connecter</Text>
            </Pressable>
          </View>
        </View>
      </View>
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
    paddingTop: 60,
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 107, 53, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFF5E9',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#FFF5E9',
    opacity: 0.8,
    marginBottom: 40,
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    color: '#FFF5E9',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'rgba(255, 245, 233, 0.1)',
    borderRadius: 12,
    padding: 16,
    color: '#FFF5E9',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 245, 233, 0.1)',
    borderRadius: 12,
    paddingRight: 16,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    color: '#FFF5E9',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 4,
  },
  registerButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
  },
  registerButtonText: {
    color: '#FFF5E9',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    color: '#FFF5E9',
    opacity: 0.8,
    marginRight: 4,
  },
  loginLink: {
    color: '#FF6B35',
    fontWeight: '600',
  },
});
