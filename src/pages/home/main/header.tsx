import { MdDelete } from 'react-icons/md'
import { capitalizeText } from '../../../helpers/textFormatter'

export default function Header({
  totalColumns,
  removeColumn,
}: {
  totalColumns: number
  removeColumn: (column: number) => void
}) {
  function columnNames(totalColumns: number) {
    const headerNames = {
      0: 'product filter',
      1: 'primary variant',
    }

    return Array.from({ length: totalColumns }, (_, i) => {
      if (i == 0 || i == 1) return headerNames[i]
      return `variant ${i}`
    })
  }
  return (
    <>
      <div className='w-20 grow-0 shrink-0'></div>
      {columnNames(totalColumns).map((header, index) => (
        <div className='group w-60 text-xl flex justify-between grow-0 shrink-0 border-r-[1px] border-black px-4' key={index}>
          <div className='text-gray-600 font-bold text-nowrap'>{capitalizeText(header)}</div>
          <button
            className='opacity-0 group-hover:opacity-100 text-xl text-red-500'
            onClick={() => removeColumn(index)}>
            <MdDelete />
          </button>
        </div>
      ))}
      <div className='w-40'></div>
    </>
  )
}
