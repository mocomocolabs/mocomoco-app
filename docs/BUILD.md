# build

## 빌드 준비

- setup

https://capacitor.ionicframework.com/docs/getting-started/dependencies

- capacitor init

https://capacitor.ionicframework.com/docs/getting-started/with-ionic/

- create ios

https://capacitor.ionicframework.com/docs/ios

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

> Android에서 live-reload를 하려고하면 cleartext not permitted 오류가 난다. `android/app/src/main/AndroidManifest.xml` 에 다음과 같이 추가한다.

```
    <application
        ...
        android:usesCleartextTraffic="true"
        ...
```
