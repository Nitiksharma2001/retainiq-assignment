import { MdDelete, MdOutlineDragIndicator } from 'react-icons/md'
import { ItemType } from './main'
import { ImageCard } from '../../../components/ImageCard'

export default function ProductRow({
  index,
  totalColumns,
  item,
  removeRow,
  createColumn,
}: {
  index: number
  totalColumns: number
  item: ItemType
  removeRow: (rowId: string) => void
  createColumn: () => void
}) {
  function productImages() {
    return Array.from({ length: totalColumns + 1 }, (_, i) => {
      if (!item.images[i] && i === totalColumns) return 'add'
      if (!item.images[i]) return 'upload'
      return item.images[i]
    })
  }
  return (
    <>
      <div className='w-20 pt-8 grow-0 shrink-0 border-r-[1px] border-black px-4'>
        <div className='flex justify-center items-center text-2xl relative'>
          <div>{index + 1}</div>
          <MdOutlineDragIndicator className='glyphicon-move cursor-move' />
          <button className='absolute -top-6 text-red-500 opacity-0 group-hover:opacity-100' onClick={() => removeRow(item.id)}>
            <MdDelete />
          </button>
        </div>
      </div>
      {productImages().map((image) => (
        <div
          className={`border-r-[1px] p-4 border-black grow-0 shrink-0 cursor-pointer w-60`}
          onClick={() => (image == 'add' ? createColumn() : null)}>
          <div className='flex gap-8 flex-col h-full justify-center items-center bg-white rounded-md'>
            <ImageCard image={image} />
          </div>
        </div>
      ))}
    </>
  )
}
