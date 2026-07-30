import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import ScreenHeader from '../components/ScreenHeader';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';
import { useTheme } from '../theme/ThemeContext';
import { useUsername, setUsername } from '../hooks/useUsername';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, 'EditProfile'>;

export default function EditProfileScreen({ navigation }: Props) {
  const theme = useTheme();
  const currentUsername = useUsername();
  const [draftUsername, setDraftUsername] = useState(currentUsername);

  function handleSave() {
    setUsername(draftUsername);
    navigation.goBack();
  }

  return (
    <SafeAreaView
      style={[styles.root, { backgroundColor: theme.colors.background }]}
      edges={['top', 'left', 'right', 'bottom']}
    >
      <ScreenHeader title="Profili Düzenle" onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        <View style={styles.avatarWrap}>
          <View style={[styles.avatar, { backgroundColor: theme.colors.surfaceElevated }]}>
            <Ionicons name="person" size={40} color={theme.colors.textMuted} />
          </View>
          <View style={[styles.avatarBadge, { backgroundColor: theme.colors.primary }]}>
            <Ionicons name="camera" size={14} color={theme.colors.background} />
          </View>
        </View>

        <TextField
          label="Kullanıcı Adı"
          value={draftUsername}
          onChangeText={setDraftUsername}
          placeholder="Kullanıcı adı"
          maxLength={20}
        />

        <View style={styles.saveButtonWrap}>
          <PrimaryButton
            label="Kaydet"
            disabled={draftUsername.trim().length === 0}
            onPress={handleSave}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 24,
  },
  avatarWrap: {
    alignSelf: 'center',
    marginBottom: 28,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarBadge: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonWrap: {
    marginTop: 20,
  },
});
