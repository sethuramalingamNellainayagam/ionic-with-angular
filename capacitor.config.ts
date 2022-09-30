import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sethu-places.app',
  appName: 'places',
  webDir: 'www',
  bundledWebRuntime: false,
  server: {
		hostname: "127.0.0.1",
		cleartext: true,
		allowNavigation: ["*"]
	}
};

export default config;
