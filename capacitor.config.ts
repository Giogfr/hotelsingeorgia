import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.georgia.stay',
  appName: 'GeorgiaStay',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
