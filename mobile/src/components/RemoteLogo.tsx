import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  uri: string | null;
  size: number;
  fallbackIcon?: keyof typeof Ionicons.glyphMap;
};

export default function RemoteLogo({ uri, size, fallbackIcon = 'shirt-outline' }: Props) {
  const theme = useTheme();
  const [failed, setFailed] = useState(false);

  if (!uri || failed) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: theme.colors.surfaceElevated,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons name={fallbackIcon} size={size * 0.55} color={theme.colors.textMuted} />
      </View>
    );
  }

  return (
    <Image
      source={{ uri }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
      resizeMode="contain"
      onError={() => setFailed(true)}
    />
  );
}
