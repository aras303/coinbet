function readEnv(name: string, fallback?: string): string {
  const value = process.env[name] ?? fallback;
  if (value === undefined) {
    throw new Error(
      `Missing environment variable "${name}". Did you create a .env file from .env.example?`,
    );
  }
  return value;
}

export const env = {
  apiBaseUrl: readEnv('EXPO_PUBLIC_API_BASE_URL'),
};
