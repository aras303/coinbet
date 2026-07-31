import React, { useEffect, useState } from 'react';
import {
  Animated,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Logo from '../components/Logo';
import StadiumBackground from '../components/StadiumBackground';
import TextField from '../components/TextField';
import PrimaryButton from '../components/PrimaryButton';
import TextLink from '../components/TextLink';
import { useTheme } from '../theme/ThemeContext';
import type { RootStackParamList } from '../navigation/types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function LoginScreen() {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();
  const [fade] = useState(() => new Animated.Value(0));
  const [slide] = useState(() => new Animated.Value(16));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { toValue: 1, duration: 450, useNativeDriver: true }),
      Animated.timing(slide, { toValue: 0, duration: 450, useNativeDriver: true }),
    ]).start();
  }, [fade, slide]);

  return (
    <View style={styles.root}>
      <StadiumBackground />
      <SafeAreaView style={styles.flex}>
        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.logoWrap}>
              <Logo />
            </View>

            <Animated.View
              style={[styles.form, { opacity: fade, transform: [{ translateY: slide }] }]}
            >
              <TextField
                label="E-posta"
                placeholder="ornek@coinbet.com"
                keyboardType="email-address"
              />
              <View style={styles.fieldSpacer} />
              <TextField label="Şifre" placeholder="••••••••" secureTextEntry secureToggle />

              <View style={styles.forgotRow}>
                <TextLink label="Şifremi Unuttum" muted />
              </View>

              <View style={styles.buttonSpacer} />
              <PrimaryButton label="Giriş Yap" onPress={() => navigation.navigate('Main')} />

              <View style={styles.signupRow}>
                <Text
                  style={[
                    styles.signupText,
                    {
                      color: theme.colors.textSecondary,
                      fontFamily: theme.typography.manrope.medium,
                    },
                  ]}
                >
                  Hesabın yok mu?{' '}
                </Text>
                <TextLink label="Hesap Oluştur" onPress={() => navigation.navigate('Main')} />
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  logoWrap: {
    alignItems: 'center',
    marginBottom: 48,
  },
  form: {
    width: '100%',
  },
  fieldSpacer: {
    height: 16,
  },
  forgotRow: {
    alignItems: 'flex-end',
    marginTop: 10,
  },
  buttonSpacer: {
    height: 24,
  },
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 14,
  },
});
