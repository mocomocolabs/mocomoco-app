import { Icon } from '../atoms/IconComponent'
import { SquareWithCorner } from '../atoms/SquareWithCornerComponent'
import { TextSm } from '../atoms/TextSmComponent'
import { TextXs } from '../atoms/TextXsComponent'

interface IFilterBar {
  show?: boolean
  filters: { name: string; length: number }[]
  onReset: () => void
  onClick: (name: string) => void
}

export const FilterBar: React.FC<IFilterBar> = ({ show = true, filters, onReset, onClick }) => (
  <div className='flex gap-1' hidden={!show}>
    <div hidden={filters.every((filter) => filter.length === 0)} onClick={onReset}>
      <SquareWithCorner width={79} height={24} color='secondary'>
        <Icon name='reset' size={16} color='secondary' />
        <TextXs>초기화</TextXs>
      </SquareWithCorner>
    </div>

    {filters.map((filter) => {
      const isFilterSet = filter.length > 0

      return (
        <div key={filter.name} onClick={() => onClick(filter.name)}>
          <SquareWithCorner
            width={92}
            height={24}
            color={isFilterSet ? 'secondary' : 'gray'}
            fill={isFilterSet}
          >
            <Icon
              name='arrow'
              className={`icon-${isFilterSet ? 'white' : 'gray'} icon-rotate-270`}
              size={16}
            />
            <TextSm>{filter.name}</TextSm>
          </SquareWithCorner>
        </div>
      )
    })}
  </div>
)
