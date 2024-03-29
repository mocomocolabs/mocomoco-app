export interface ISignUpForm {
  name: string
  nickname: string
  email: string
  password: string
  rePassword: string
  communityIds: number[]
  introduce: string
  locale: 'ko_KR'

  mobile?: string
  roles: 'ROLE_USER'

  // TODO : 서버 팀과 논의 후 제거 여부 결정
  fcmToken?: string
  profileUrl?: string
}

export enum SIGN_UP_STATUS {
  대기 = 'PENDING',
  승인 = 'APPROVAL',
  승인거절 = 'DISAPPROVAL',
}
