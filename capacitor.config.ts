/// <reference types="@capacitor/splash-screen" />

/* TODO apply later
/// <reference types="@capacitor/local-notifications" />
/// <reference types="@capacitor/push-notifications" />
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
  plugins: {
    SplashScreen: {
      launchShowDuration: 900,
      launchAutoHide: true,
      backgroundColor: '#954fb8', // statusbar color on launch
      showSpinner: false,
      splashFullScreen: false,
      splashImmersive: false,
    },

    // TODO apply later
    //   LocalNotifications: {
    //     smallIcon: 'ic_stat_icon_config_sample',
    //     iconColor: '#CE0B7C',
    //   },
    //   PushNotifications: {
    //     presentationOptions: ["alert", "sound"]
    //   }
  },
  cordova: {
    preferences: {
      // iOS에서 채팅 입력 후 키보드 유지하기 위해 이 설정값이 필요하다고 한다.
      // 테스트해보고, 이거 없이도 잘 동작하면 지우자
      KeyboardDisplayRequiresUserAction: 'false',
    },
  },
}

export = config
