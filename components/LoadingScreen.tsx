import React from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import NoiseTexture from "./NoiseTexture";

const LoadingScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#2C1810", "#3D2419"]}
        style={styles.background}
      />
      <NoiseTexture opacity={0.2} />
      <View style={styles.content}>
        <ActivityIndicator size="large" color="#FF6B35" />
        <Text style={styles.loadingText}>Chargement en cours...</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
    color: '#FFF5E9',
    fontWeight: '500',
  },
});

export default LoadingScreen;
