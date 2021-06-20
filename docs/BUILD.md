# build

## 빌드 준비

- 환경구성

https://capacitorjs.com/docs/getting-started/environment-setup

- setup

https://capacitorjs.com/docs/android
https://capacitorjs.com/docs/ios

- Android http 허용

`AndroidManifest.xml`

```
    <application
        ...
        android:usesCleartextTraffic="true"
```

- build & sync

```
$ yarn build

// ios platform 추가
$ npx cap add ios

// update dependencies and copies any web assets to your project
$ npx cap sync

// launch xcode
$ npx cap open
```

- live reload

```
  yarn sync

  yarn dev:ios or yarn dev:and
```

# 배포

- build 한 파일 구동

> yarn build && yarn serve:build

- 다음 포스팅을 참고합니다.

https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/

- android keysotre password : mocomocolabs11!!

- android alias : mocomoco

- ios distribution key : 

- keystore 파일이 필요하면 저한테 문의해주세요.

- 빌드 결과 파일은 `mocomoco-app/android/app/release` 에 위치

# npx cap sync, npx cap copy, npx cap update 차이

- copy : 소스 변경시

- update : capacitor 및 cordova 플러그인 변경시

- sync : copy + update

# 스플래시 스크린 생성

https://apetools.webprofusion.com/#/tools/imagegorilla

# 아이콘/Splash screen 등록

https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/
