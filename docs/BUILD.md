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

- CORS 에러 해결을 위한 proxy 설정

1. `package.json`에 아래 설정 추가

```
"proxy": "http://13.209.84.58:8080"
```

2. `config.ts`의 API_URL 수정

```
API_URL: '/api'
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

# 배포

- build 한 파일 구동

> yarn build && yarn serve:build

- 다음 포스팅을 참고합니다.

https://www.joshmorony.com/deploying-capacitor-applications-to-android-development-distribution/

- android keysotre password : mocomocolabs11!!

- android alias : mocomoco

- ios distribution key :

- keystore 파일은 배포담당자에게 문의

- 빌드 결과 파일은 `mocomoco-app/android/app/release` 에 위치

# 스플래시 스크린 생성

https://apetools.webprofusion.com/#/tools/imagegorilla

# 아이콘/Splash screen 등록

https://www.joshmorony.com/adding-icons-splash-screens-launch-images-to-capacitor-projects/

# 디버깅

- Android - 크롬 브라우저에서 `chrome://inspect` 입력
- iOS - 사파리 브라우저의 develop을 통해 가능
