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
  count = 34, // More particles but very subtle
  color = '#FFF5E9',
  minSize = 0.2, // Very small minimum size
  maxSize = 2.4, // Increased maximum size for more variation
  minDuration = 15000,
  maxDuration = 25000,
}) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      // Use a non-linear distribution to create more size variation
      // This creates a bias toward smaller particles but allows for some larger ones
      const sizeRandom = Math.pow(Math.random(), 1.5); // Power distribution favors smaller values
      const size = minSize + sizeRandom * (maxSize - minSize);
      
      const initialX = Math.random() * width;
      const initialY = Math.random() * height;
      const duration = Math.random() * (maxDuration - minDuration) + minDuration;
      const delay = Math.random() * 10000; // Longer random delay for more natural appearance
      
      // Adjust opacity based on size - larger particles can be slightly more visible
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
    // Very slow, subtle movement
    const verticalDirection = Math.random() > 0.5 ? -1 : 1;
    const verticalDistance = (Math.random() * 0.24 + 0.06) * height * verticalDirection;
    const targetY = initialY + verticalDistance;

    const horizontalDistance = (Math.random() * 0.2 + 0.1) * width * direction;
    const targetX = initialX + horizontalDistance;

    // Slower movement for dust-like effect
    const durationX = duration * (1.2 + Math.random() * 0.8);
    const durationY = duration * (1.2 + Math.random() * 0.8);

    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(targetY, {
          duration: durationY,
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
          duration: durationX,
          easing: Easing.linear,
        }),
        -1,
        true
      )
    );

    // Subtle scale changes
    const scaleTarget = Math.random() * 0.4 + 0.8;
    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(scaleTarget, {
          duration: duration * (0.8 + Math.random() * 0.4),
          easing: Easing.linear,
        }),
        -1,
        true
      )
    );

    // Create random "flicker" effect where particles briefly shine
    const setupFlicker = () => {
      const flickerDelay = Math.random() * 8000; // Random delay between flickers
      const flickerDuration = Math.random() * 300 + 100; // Very brief shine (100-400ms)
      const peakOpacity = Math.random() * 0.3 + 0.2; // Slightly brighter when shining (0.2-0.5)
      
      setTimeout(() => {
        particleOpacity.value = withSequence(
          // Fade in quickly
          withTiming(peakOpacity, { 
            duration: flickerDuration / 3,
            easing: Easing.inOut(Easing.cubic)
          }),
          // Hold briefly at peak brightness
          withTiming(peakOpacity, { 
            duration: flickerDuration / 3
          }),
          // Fade out
          withTiming(baseOpacity, { 
            duration: flickerDuration / 3,
            easing: Easing.inOut(Easing.cubic)
          })
        );
        
        // Setup the next flicker
        setupFlicker();
      }, flickerDelay);
    };
    
    // Start the flickering cycle after initial delay
    const initialFlickerTimeout = setTimeout(() => {
      setupFlicker();
    }, delay);

    return () => {
      cancelAnimation(translateY);
      cancelAnimation(translateX);
      cancelAnimation(scale);
      cancelAnimation(particleOpacity);
      clearTimeout(initialFlickerTimeout);
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
