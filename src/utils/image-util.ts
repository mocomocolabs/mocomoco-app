import Axios from 'axios'

export const urlToFile = (url: string): Promise<File> =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Axios.get(url, { responseType: 'blob' }).then((v: any) => new File([v.data], url, { type: v.data.type }))
