/* TODO apply later
/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/push-notifications" />
/// <reference types="@capacitor/splash-screen" />
*/

import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.mocomoco.hama',
  appName: 'hama',
  webDir: 'build',
  bundledWebRuntime: false,
  loggingBehavior: 'debug', // TODO change to 'debug' when release
  android: {
    allowMixedContent: true, // TODO change to false when release
  },
  // server: {
  //   androidScheme: 'https',
  // },

  // TODO apply later
  plugins: {
    SplashScreen: {
      launchShowDuration: 900,
      launchAutoHide: true,
      backgroundColor: '#00000000',
      showSpinner: false,
      splashFullScreen: false,
      splashImmersive: false,
    },
    //   LocalNotifications: {
    //     smallIcon: 'ic_stat_icon_config_sample',
    //     iconColor: '#CE0B7C',
    //   },
    //   PushNotifications: {
    //     presentationOptions: ["alert", "sound"]
    //   }
  },
  cordova: {},
}

export = config
