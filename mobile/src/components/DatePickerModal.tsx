import React, { useMemo, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { addMonths, formatMonthYear, getMonthGrid, isSameDay, startOfMonth } from '../utils/date';

type Props = {
  visible: boolean;
  selectedDate: Date;
  onSelect: (date: Date) => void;
  onClose: () => void;
};

const WEEKDAY_LABELS = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];

export default function DatePickerModal({ visible, selectedDate, onSelect, onClose }: Props) {
  const theme = useTheme();
  const [viewedMonth, setViewedMonth] = useState(() => startOfMonth(selectedDate));
  const [wasVisible, setWasVisible] = useState(visible);

  if (visible !== wasVisible) {
    setWasVisible(visible);
    if (visible) {
      setViewedMonth(startOfMonth(selectedDate));
    }
  }

  const weeks = useMemo(() => getMonthGrid(viewedMonth), [viewedMonth]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable
        style={[styles.backdrop, { backgroundColor: theme.colors.overlay }]}
        onPress={onClose}
      />
      <View style={styles.centerWrap} pointerEvents="box-none">
        <View
          style={[
            styles.card,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.border,
              borderRadius: theme.radius.lg,
            },
          ]}
        >
          <View style={styles.header}>
            <Pressable onPress={() => setViewedMonth((m) => addMonths(m, -1))} hitSlop={8}>
              <Ionicons name="chevron-back" size={20} color={theme.colors.text} />
            </Pressable>
            <Text
              style={[
                styles.headerLabel,
                { color: theme.colors.text, fontFamily: theme.typography.fontFamily },
              ]}
            >
              {formatMonthYear(viewedMonth)}
            </Text>
            <Pressable onPress={() => setViewedMonth((m) => addMonths(m, 1))} hitSlop={8}>
              <Ionicons name="chevron-forward" size={20} color={theme.colors.text} />
            </Pressable>
          </View>

          <View style={styles.weekdayRow}>
            {WEEKDAY_LABELS.map((label) => (
              <Text key={label} style={[styles.weekdayLabel, { color: theme.colors.textMuted }]}>
                {label}
              </Text>
            ))}
          </View>

          {weeks.map((week, weekIndex) => (
            <View key={weekIndex} style={styles.weekRow}>
              {week.map((day, dayIndex) => {
                if (!day) {
                  return <View key={dayIndex} style={styles.dayCell} />;
                }

                const active = isSameDay(day, selectedDate);
                return (
                  <Pressable
                    key={dayIndex}
                    style={[
                      styles.dayCell,
                      active && {
                        backgroundColor: theme.colors.primary,
                        borderRadius: theme.radius.full,
                      },
                    ]}
                    onPress={() => {
                      onSelect(day);
                      onClose();
                    }}
                  >
                    <Text
                      style={[
                        styles.dayLabel,
                        {
                          color: active ? theme.colors.background : theme.colors.text,
                          fontFamily: theme.typography.fontFamily,
                        },
                      ]}
                    >
                      {day.getDate()}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ))}

          <Pressable
            style={styles.todayButton}
            onPress={() => {
              onSelect(new Date());
              onClose();
            }}
          >
            <Text
              style={[
                styles.todayLabel,
                { color: theme.colors.primary, fontFamily: theme.typography.fontFamily },
              ]}
            >
              Bugün
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
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
  centerWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    maxWidth: 360,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerLabel: {
    fontSize: 15,
    fontWeight: '700',
  },
  weekdayRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  weekdayLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayCell: {
    flex: 1,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayLabel: {
    fontSize: 14,
    fontWeight: '600',
  },
  todayButton: {
    alignItems: 'center',
    marginTop: 12,
    paddingVertical: 8,
  },
  todayLabel: {
    fontSize: 14,
    fontWeight: '700',
  },
});
