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

- CORS 에러 해결 방법

```
요청 주소(보통 http://localhost)와 서버 주소가 다른 경우에는 브라우저(webview 포함)의 CORS 정책에 의해 요청을 거절당하게 되어 CORS 에러가 발생한다.
이 때는, 서버의 CORS 정책을 적절히 설정해 주면 된다.
대체로, allowed origin에 http://localhost:3000 과 같이 scheme과 포트번호를 포함하여 추가해주면 된다.
```

- development 모드일 때 CORS 에러 회피를 위한 proxy 설정

> production 빌드일 때는 동작하지 않으므로, 서버의 CORS 설정을 적절하게 변경해주는게 답이다.

1. `package.json`에 아래 설정 추가

```
"proxy": "http://13.209.84.58:8080"
```

2. `config.ts`의 API_URL 수정

```
// browser(yarn front), livereload(yarn dev:and) 시에 적용됨
development: {
  API_URL: '/api',

// android debug/release 빌드 시 적용됨
production: {
  API_URL: 'http://서버주소:포트/api',
```

- build & sync

```
// 소스파일 빌드
$ yarn build

// ios or android platform 추가
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

<br>

# android 에뮬레이터에서 앱 실행하기

1. ANDROID_SDK_ROOT, ANDROID_HOME 환경변수 추가
   - 리눅스인 경우 `~/.profile` 파일에 추가 (빌드 안되면 재부팅 후 다시 시도)

```
# Android
export ANDROID_SDK_ROOT=$HOME/Android/Sdk
export ANDROID_SDK_HOME=$ANDROID_SDK_ROOT
export ANDROID_HOME=$ANDROID_SDK_ROOT

# avdmanager, sdkmanager
export PATH=$PATH:$ANDROID_SDK_ROOT/tools/bin

# adb, logcat
export PATH=$PATH:$ANDROID_SDK_ROOT/platform-tools

# emulator
export PATH=$PATH:$ANDROID_SDK_ROOT/emulator
```

2. Android studio > Run > Run 'app' 메뉴 실행

- 한번 실행한 후엔 'Apply Changes and Restart Activity'

<br>

# 배포

## proguard 설정 확인

1. release 빌드 시 코드 난독화와 불필요한 리소스 제거 등을 위해 아래 설정을 추가함.

```
# /android/app/build.gradle

buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

2. 빌드 후 logcat에 capacitor 플러그인을 참조하지 못 한다는 에러로그가 출력되면 아래와 같이 proguard rule을 추가해 준다.

```
# /android/app/proguard-rules.pro
-keep class com.capacitorjs.plugins.** {*;}
```

## version 올리기

```gradle
# /android/app/build.gradle
android {
  ...
  {
    defaultConfig: {
      ...
      versionCode 5       => 앱 설치 시 update 판단 기준
      versionName "1.0.4" => 그냥 보여지는 용도
```

## build 한 파일 구동

> yarn build && yarn serve:build

- android

> yarn prod:and

- 다음 포스팅을 참고합니다.

  - https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/
  - https://www.joshmorony.com/deploying-capacitor-applications-to-ios-development-distribution/

> Android Studio > Build > Generate Signed Bundle / APK

- android keysotre password : mocomocolabs11!!

- android alias : mocomoco

- ios distribution key :

- keystore 파일은 배포담당자에게 문의

## 빌드 결과 파일은 `mocomoco-app/android/app/release` 에 위치

<br>

# 스플래시 스크린 생성

https://apetools.webprofusion.com/#/tools/imagegorilla

<br>

# 아이콘/Splash screen 등록

https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/

<br>

# 디버깅

- Android - 크롬 브라우저에서 `chrome://inspect` 입력
- iOS - 사파리 브라우저의 develop을 통해 가능
