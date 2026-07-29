function required(name: string, value: string | undefined): string {
  if (value === undefined) {
    throw new Error(
      `Missing environment variable "${name}". Did you create a .env file from .env.example?`,
    );
  }
  return value;
}

// Must stay literal `process.env.EXPO_PUBLIC_*` member access (not a dynamic
// lookup) so Expo's build-time inlining can replace it on every platform.
export const env = {
  apiBaseUrl: required('EXPO_PUBLIC_API_BASE_URL', process.env.EXPO_PUBLIC_API_BASE_URL),
};
