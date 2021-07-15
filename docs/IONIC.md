## IonSlides

```typescript
<IonSlides key={urls.join('_')} pager={true} options={slideOpts}>
```

key값이 변해야 slides가 정상적으로 destroyed 된다.
https://github.com/ionic-team/ionic-framework/issues/18782#issuecomment-558075082

## Ionic Custom Property & Css Variables

<img src="./img/ionic-custom-property.png">

아이오닉 컴포넌트(ex IonInput)에서는 커스텀 프로퍼티를 사용해야만 CSS가 적용되는 경우가 있다. 이때 주의해야할 것이 `_variable.scss`의 scss 변수값 적용이 안된다.
대신 `_ionic.scss`의 변수값을 `var(변수)`형태로 사용할 수 있다.

https://ionicframework.com/docs/theming/css-variables

```
  ion-tab-buttons {
    --background: var(--ion-color-primary);
  }
```

## IonReactRouter 사용을 조심하자.

ionic에서 제공하는 IonReactRouter + IonRouterOutlet 조합으로 IonPage 컴포넌트들을 라우팅할 수 있고, page 전환을 맡아서 처리해준다.
하지만, 현재 ionic 버젼 5인데, 아직 버그성 동작들이 있어 보인다.

- ISSUE.md의 IonReactRouter 사용 시 라우팅이 중복 발생하는 이슈 참고하자

IonRouterOutlet을 사용하지 않으면 useIonViewWillEnter 등 ionic lifecycle hook들이 trigger되지 않는데,
이 부분들을 useEffect로 대체해보고 동작상 문제될 것이 없다면 react-router-dom.Router + Switch 조합으로 라우팅 구성하는게 나아보인다.
