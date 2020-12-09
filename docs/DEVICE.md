# 디바이스

물리 디바이스와 PC의 상호작용 방법에 대한 내용을 기술합니다.

## 안드로이드

- adb

android debug bridge, 안드로이드기기와 PC가 통신이 가능하도록 해주는 장치

https://m.blog.naver.com/searphiel9/221366347325

> // 연결된 emulator 및 물리 디바이스 확인
> $ adb devices
> 
> // 로그 확인
> $ adb logcat

- adb를 이용하여 무선으로 디버깅하기

1. 동일 IP에 연결
2. PC와 Android USB 연결(최초 1회)
3. Android tcp/ip 연결 ON : `adb tcpip 5555`
4. USB연결 해제
5. adb connect DEVICE_IP:5555
6. Chrome에서 `chrome://inspect` 를 입력하면 디버깅이 가능하다

- scrcpy

안드로이드 기기를 무선으로 미러링할 수 있다.

> $ scrcpy -b2M -m800

https://github.com/Genymobile/scrcpy#connection

