import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

interface NoiseTextureProps {
  opacity?: number;
}

const NoiseTexture: React.FC<NoiseTextureProps> = ({ opacity = 1 }) => {
  return (
    <View style={styles.container} pointerEvents="none">
      <Image
        source={require("../../assets/images/home_screen_bg.png")}
        style={[styles.noiseImage, { opacity }]}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  noiseImage: {
    width: '100%',
    height: '100%',
  },
});

export default NoiseTexture;
