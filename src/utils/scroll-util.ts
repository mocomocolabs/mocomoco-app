export const scrollToBottom = (query = 'ion-content') => {
  const list: NodeListOf<HTMLIonContentElement> = document.querySelectorAll(query)
  if (list.length) {
    const content: HTMLIonContentElement = list[list.length - 1]
    content.scrollToBottom()
  }
}
