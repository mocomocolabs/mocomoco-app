import { IonIcon } from '@ionic/react'
import { chatbox, cloud } from 'ionicons/icons'
import { getLabel, statusLabels, typeLabels } from '../../models/stufftalent'
import { IStuffTalent, StuffTalentPathName as Path } from '../../models/stufftalent.d'
import { route } from '../../services/route-service'
import { timeDiff } from '../../utils/datetime-util'
import { OverflowMenuIcon } from '../atoms/OverflowMenuIconComponent'
import { Profile } from '../atoms/ProfileComponent'
import { TextBase } from '../atoms/TextBaseComponent'
import { TextLg } from '../atoms/TextLgComponent'

interface IStuffTalentIItem {
  loginUserId: number
  path: Path
  item: IStuffTalent
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

export const StuffTalentItem: React.FC<IStuffTalentIItem> = ({
  loginUserId,
  path,
  item,
  onEdit,
  onDelete,
}) => {
  const routeDetail =
    path === Path.STUFF ? (id: number) => route.stuffDetail(id) : (id: number) => route.talentDetail(id)

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
            <Profile url={item.user.profileUrl}></Profile>
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
