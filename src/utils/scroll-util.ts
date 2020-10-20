export const scrollToBottom = () => {
  const list: HTMLIonContentElement | null = document.querySelector('ion-content')
  return list?.scrollToBottom()
}
