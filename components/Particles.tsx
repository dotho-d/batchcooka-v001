import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
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
  count = 10,
  color = '#FFF5E9',
  minSize = 1,
  maxSize = 3,
  minDuration = 15000,
  maxDuration = 25000,
}) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * (maxSize - minSize) + minSize;
      const initialX = Math.random() * width;
      const initialY = Math.random() * height;
      const duration = Math.random() * (maxDuration - minDuration) + minDuration;
      const delay = Math.random() * 8000;
      const opacity = Math.random() * 0.5 + 0.1;
      const direction = Math.random() > 0.5 ? 1 : -1;

      return {
        id: i,
        size,
        initialX,
        initialY,
        duration,
        delay,
        opacity,
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
          opacity={particle.opacity}
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
  opacity: number;
  direction: number;
}

const Particle: React.FC<SingleParticleProps> = ({
  size,
  initialX,
  initialY,
  duration,
  delay,
  color,
  opacity,
  direction,
}) => {
  const translateY = useSharedValue(initialY);
  const translateX = useSharedValue(initialX);
  const scale = useSharedValue(1);
  const particleOpacity = useSharedValue(opacity);

  useEffect(() => {
    const verticalDirection = Math.random() > 0.3 ? -1 : 1;
    const verticalDistance = (Math.random() * 0.3 + 0.1) * height * verticalDirection;
    const targetY = initialY + verticalDistance;

    const horizontalDistance = (Math.random() * 0.3 + 0.1) * width * direction;
    const targetX = initialX + horizontalDistance;

    const durationX = duration * (0.8 + Math.random() * 0.4);
    const durationY = duration * (0.8 + Math.random() * 0.4);

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

    const scaleTarget = Math.random() * 0.7 + 0.5;
    scale.value = withDelay(
      delay,
      withRepeat(
        withTiming(scaleTarget, {
          duration: duration * (0.5 + Math.random() * 0.5),
          easing: Easing.linear,
        }),
        -1,
        true
      )
    );

    const opacityTarget = Math.random() * 0.3 + 0.05;
    particleOpacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(opacityTarget, {
          duration: duration * (0.6 + Math.random() * 0.4),
          easing: Easing.linear,
        }),
        -1,
        true
      )
    );

    return () => {
      cancelAnimation(translateY);
      cancelAnimation(translateX);
      cancelAnimation(scale);
      cancelAnimation(particleOpacity);
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
  },
});

export default Particles;
