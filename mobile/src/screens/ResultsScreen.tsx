import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../components/ScreenContainer';
import { useTheme } from '../theme/ThemeContext';

export default function ResultsScreen() {
  const theme = useTheme();

  return (
    <ScreenContainer>
      <Ionicons name="stats-chart-outline" size={56} color={theme.colors.textMuted} />
    </ScreenContainer>
  );
}
