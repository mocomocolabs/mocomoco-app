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