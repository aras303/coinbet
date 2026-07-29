import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import MatchCardSkeleton from './MatchCardSkeleton';

const SKELETON_COUNT = 6;

export default function MatchListSkeleton() {
  const [opacity] = useState(() => new Animated.Value(0.4));

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, { toValue: 1, duration: 700, useNativeDriver: true }),
        Animated.timing(opacity, { toValue: 0.4, duration: 700, useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <View style={styles.wrapper}>
      {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
        <MatchCardSkeleton key={index} opacity={opacity} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 4,
  },
});
