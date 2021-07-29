import Axios from 'axios'

export const urlToFile = (url: string): Promise<File> => {
  return Axios.get(url, { responseType: 'blob' }).then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (v: any) => new File([v.data], new Date().getTime().toString(), { type: v.data.type })
  )

  // return fetch(
  //   'https://hama-s3.s3.ap-northeast-2.amazonaws.com/mocomoco/mocomoco-api/static/file/uploadfile/table/feeds/e1652665855941399af915c9b43f2bce.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20210726T090820Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3600&X-Amz-Credential=AKIASXHWF6WZPYXI5AOH%2F20210726%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Signature=ed50cd595b8c7589bca2dd8105e1120e5aac5c91f5caf503da8eccd03234a6a5'
  // )
  //   .then((res) => res.blob())
  //   .then((blob) => new File([blob], new Date().getTime().toString()))
}

export const fileToBase64 = (file: File, resolve: (url: string) => void) => {
  const reader = new FileReader()
  reader.onloadend = (event) => {
    const base64result = event.target?.result
    resolve(base64result as string)
  }
  reader.onerror = (error) => console.log(error)
  reader.readAsDataURL(file)
}
