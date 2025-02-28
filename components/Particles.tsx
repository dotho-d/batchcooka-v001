import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  withSequence,
  Easing,
  cancelAnimation,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface ParticleProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  minDuration?: number;
  maxDuration?: number;
}

const Particles: React.FC<ParticleProps> = ({
  count = 20, // Reduced count from 34 to 20
  color = '#FFF5E9',
  minSize = 0.2,
  maxSize = 2.4,
  minDuration = 15000,
  maxDuration = 25000,
}) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const sizeRandom = Math.pow(Math.random(), 1.5);
      const size = minSize + sizeRandom * (maxSize - minSize);
      
      const initialX = Math.random() * width;
      const initialY = Math.random() * height;
      const duration = Math.random() * (maxDuration - minDuration) + minDuration;
      const delay = Math.random() * 5000; // Reduced from 10000 to 5000
      
      const baseOpacity = Math.min(0.1 + (size / maxSize) * 0.3, 0.4);
      const direction = Math.random() > 0.5 ? 1 : -1;

      return {
        id: i,
        size,
        initialX,
        initialY,
        duration,
        delay,
        baseOpacity,
        direction,
      };
    });
  }, [count, minSize, maxSize, minDuration, maxDuration]);

  return (
    <View style={styles.container} pointerEvents="none">
      {particles.map((particle) => (
        <Particle
          key={particle.id}
          size={particle.size}
          initialX={particle.initialX}
          initialY={particle.initialY}
          duration={particle.duration}
          delay={particle.delay}
          color={color}
          baseOpacity={particle.baseOpacity}
          direction={particle.direction}
        />
      ))}
    </View>
  );
};

interface SingleParticleProps {
  size: number;
  initialX: number;
  initialY: number;
  duration: number;
  delay: number;
  color: string;
  baseOpacity: number;
  direction: number;
}

const Particle: React.FC<SingleParticleProps> = ({
  size,
  initialX,
  initialY,
  duration,
  delay,
  color,
  baseOpacity,
  direction,
}) => {
  const translateY = useSharedValue(initialY);
  const translateX = useSharedValue(initialX);
  const scale = useSharedValue(1);
  const particleOpacity = useSharedValue(baseOpacity);

  useEffect(() => {
    // Simplified movement logic
    const verticalDirection = Math.random() > 0.5 ? -1 : 1;
    const verticalDistance = (Math.random() * 0.2 + 0.05) * height * verticalDirection;
    const targetY = initialY + verticalDistance;

    const horizontalDistance = (Math.random() * 0.15 + 0.05) * width * direction;
    const targetX = initialX + horizontalDistance;

    // Simplified timing
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(targetY, {
          duration: duration,
          easing: Easing.linear,
        }),
        -1,
        true
      )
    );

    translateX.value = withDelay(
      delay,
      withRepeat(
        withTiming(targetX, {
          duration: duration,
          easing: Easing.linear,
        }),
        -1,
        true
      )
    );

    // Simplified scale animation
    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(Math.random() * 0.3 + 0.85, {
          duration: duration,
          easing: Easing.linear,
        }),
        -1,
        true
      )
    );

    // Simplified flicker effect
    const flickerInterval = setInterval(() => {
      if (Math.random() > 0.7) { // Only flicker occasionally
        const peakOpacity = Math.random() * 0.3 + 0.2;
        particleOpacity.value = withSequence(
          withTiming(peakOpacity, { duration: 200 }),
          withTiming(baseOpacity, { duration: 200 })
        );
      }
    }, 3000);

    return () => {
      cancelAnimation(translateY);
      cancelAnimation(translateX);
      cancelAnimation(scale);
      cancelAnimation(particleOpacity);
      clearInterval(flickerInterval);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { scale: scale.value },
      ],
      opacity: particleOpacity.value,
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        animatedStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: 1,
  },
});

export default Particles;
