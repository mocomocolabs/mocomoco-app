import { TextSm } from './TextSmComponent'

export interface IChatMessage {
  message: string
  isMe: boolean
}

export const ChatMessage: React.FC<IChatMessage> = ({ message, isMe }): React.ReactElement => (
  <TextSm className={`py-2 px-3 br-xlg pre-line ${isMe ? 'bg-s-secondary' : 'bg-s-primary'}`}>
    {message}
  </TextSm>
)
