import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';

type Props = {
  visible: boolean;
  onClose: () => void;
  onSelect?: (key: string) => void;
};

const DRAWER_WIDTH = Math.min(300, Dimensions.get('window').width * 0.8);

const MENU_ITEMS: { key: string; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'leaderboard', label: 'Sıralama', icon: 'trophy-outline' },
  { key: 'weekly-login', label: 'Haftalık Giriş', icon: 'calendar-outline' },
  { key: 'tasks', label: 'Görevler', icon: 'checkbox-outline' },
  { key: 'settings', label: 'Ayarlar', icon: 'settings-outline' },
];

export default function SideMenuDrawer({ visible, onClose, onSelect }: Props) {
  const theme = useTheme();
  const [translateX] = useState(() => new Animated.Value(-DRAWER_WIDTH));
  const [backdropOpacity] = useState(() => new Animated.Value(0));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: visible ? 0 : -DRAWER_WIDTH,
        duration: 240,
        useNativeDriver: true,
      }),
      Animated.timing(backdropOpacity, {
        toValue: visible ? 1 : 0,
        duration: 240,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible, translateX, backdropOpacity]);

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents={visible ? 'auto' : 'none'}>
      <Animated.View
        style={[
          styles.backdrop,
          { opacity: backdropOpacity, backgroundColor: theme.colors.overlay },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.panel,
          theme.shadow.raised,
          {
            width: DRAWER_WIDTH,
            backgroundColor: theme.colors.surface,
            borderRightColor: theme.colors.border,
            transform: [{ translateX }],
          },
        ]}
      >
        <SafeAreaView style={styles.panelContent} edges={['top', 'left', 'bottom']}>
          <Text
            style={[
              styles.brand,
              { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
            ]}
          >
            CoinBet
          </Text>

          {MENU_ITEMS.map((item) => (
            <Pressable
              key={item.key}
              style={styles.item}
              onPress={() => {
                onClose();
                onSelect?.(item.key);
              }}
            >
              <Ionicons name={item.icon} size={20} color={theme.colors.textSecondary} />
              <Text
                style={[
                  styles.itemLabel,
                  { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
                ]}
              >
                {item.label}
              </Text>
            </Pressable>
          ))}
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  panelContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
  brand: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
  },
  itemLabel: {
    fontSize: 15,
    fontWeight: '600',
  },
});
