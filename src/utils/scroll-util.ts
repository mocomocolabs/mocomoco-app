export const scrollToBottom = (query = 'ion-content') => {
  const list: NodeListOf<HTMLIonContentElement> = document.querySelectorAll(query)
  if (list.length) {
    const content: HTMLIonContentElement = list[list.length - 1]
    content.scrollToBottom(500)
  }
}

/**
 * InfinityScroll 컴포넌트에서는 아래 함수를 이용합니다.
 */
export const infinityScrollToBottom = () =>
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight)
  }, 350)
