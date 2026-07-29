import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../theme/ThemeContext';

export default function MyCouponsScreen() {
  const theme = useTheme();

  return (
    <ScreenContainer>
      <Ionicons name="receipt-outline" size={56} color={theme.colors.textMuted} />
    </ScreenContainer>
  );
}
