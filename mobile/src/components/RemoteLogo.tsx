import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { type Icon, TShirtIcon } from 'phosphor-react-native';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  uri: string | null;
  size: number;
  fallbackIcon?: Icon;
};

export default function RemoteLogo({ uri, size, fallbackIcon: FallbackIcon = TShirtIcon }: Props) {
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
        <FallbackIcon size={size * 0.55} color={theme.colors.textMuted} weight="fill" />
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
