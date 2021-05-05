## IonSlides
```typescript
<IonSlides key={urls.join('_')} pager={true} options={slideOpts}>
```
key값이 변해야 slides가 정상적으로 destroyed 된다.
https://github.com/ionic-team/ionic-framework/issues/18782#issuecomment-558075082