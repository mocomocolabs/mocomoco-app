import { IonIcon } from '@ionic/react'
import { chatbox, cloud } from 'ionicons/icons'
import { getLabel, routeFunc, statusLabels, typeLabels } from '../../models/stufftalent'
import { IStuffTalent, StuffTalentPageKey } from '../../models/stufftalent.d'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { OverflowMenuIcon } from '../atoms/OverflowMenuIconComponent'
import { ProfileImage } from '../atoms/ProfileImageComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'

interface IStuffTalentIItem {
  loginUserId: number
  pageKey: StuffTalentPageKey
  item: IStuffTalent
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const StuffTalentItem: React.FC<IStuffTalentIItem> = ({
  loginUserId,
  pageKey,
  item,
  onEdit,
  onDelete,
}) => {
  const { routeDetail } = routeFunc[pageKey]

  return (
    <li>
      <div className='flex'>
        <div className='flex-between-center w-full' onClick={() => routeDetail(item.id)}>
          <img className='w-20 h-20 mr-2' src={item.atchFiles[0].url} alt={item.title} />

          <div className='flex-col flex-1'>
            <TextBase>
              [{getLabel(statusLabels, item.status)}] {item.title}
            </TextBase>
            <TextBase>{item.user.communities.map((community) => community.name).join('/')}</TextBase>
            <TextBase>
              [{getLabel(typeLabels, item.type)}] {item.price}원
            </TextBase>
          </div>
        </div>

        <div className='flex-col items-end w-25'>
          <div className='flex items-center' onClick={() => route.profileDetail(item.user.id)}>
            <ProfileImage url={item.user.profileUrl}></ProfileImage>
            <TextBase className='ml-1'>{item.user.nickname}</TextBase>
          </div>

          <div className='flex'>
            <IonIcon icon={cloud} className='mr-1'></IonIcon>
            <TextBase className='dim mr-1'>{item.likeCount}</TextBase>
            <IonIcon icon={chatbox} className='mr-1'></IonIcon>
            {/* <TextBase className='dim'>{item.chatCount}</TextBase> */}
          </div>

          <TextBase className='dim'>{timeDiff(undefined, item.createdAt)}</TextBase>
        </div>

        <div className='flex justify-end w-4'>
          <OverflowMenuIcon
            className='self-top'
            show={loginUserId === item.user.id}
            onEdit={() => onEdit(item.id)}
            onDelete={() => onDelete(item.id)}
          />
        </div>
      </div>

      <div className='flex-col'>
        <div className='flex flex-wrap items-center'>
          <TextLg className='gray w-12'>씨앗들</TextLg>
        </div>
      </div>
    </li>
  )
}
