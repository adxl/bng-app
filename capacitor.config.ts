import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.esgi.bng",
  appName: "bng",
  webDir: "dist",
  server: {
    androidScheme: "http",
    url: 'http://192.168.1.20:8100',
    cleartext: true,
  },
};

export default config;
