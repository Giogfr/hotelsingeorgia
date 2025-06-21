import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.georgia.hotels',
  appName: 'GeorgiaStay',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
