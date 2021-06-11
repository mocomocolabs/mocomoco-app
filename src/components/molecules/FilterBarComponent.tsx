interface IFilterBar {
  filters: { name: string; length: number }[]
  onReset: () => void
  onClick: (name: string) => void
}

export const FilterBar: React.FC<IFilterBar> = ({ filters, onReset, onClick }) => (
  <div className='flex justify-around'>
    <div hidden={filters.every((filter) => filter.length === 0)} onClick={onReset}>
      초기화
    </div>

    {filters.map((filter) => (
      <div
        key={filter.name}
        className={filter.length > 0 ? 'bg-yellow' : ''}
        onClick={() => onClick(filter.name)}
      >
        {filter.name}
      </div>
    ))}
  </div>
)
