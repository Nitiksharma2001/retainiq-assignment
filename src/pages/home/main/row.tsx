import { MdDelete, MdOutlineDragIndicator } from 'react-icons/md'
import { ItemType } from './main'
import { ImageCard } from '../../../components/ImageCard'

export default function ProductRow({
  totalColumns,
  item,
  removeRow,
  createColumn,
  uploadImage,
}: {
  totalColumns: number
  item: ItemType
  removeRow: (rowId: number) => void
  createColumn: () => void
  uploadImage: (e: React.ChangeEvent<HTMLInputElement>, rowId: number, columnIndex: number) => void
}) {
  return (
    <>
      <div className='w-20 pt-8 grow-0 shrink-0 border-r-[1px] border-black px-4'>
        <div className='flex justify-center items-center text-2xl relative'>
          <div>{item.id}</div>
          <MdOutlineDragIndicator className='glyphicon-move cursor-move' />
          <button
            className='absolute -top-6 text-red-500 opacity-0 group-hover:opacity-100'
            onClick={() => removeRow(item.id)}>
            <MdDelete />
          </button>
        </div>
      </div>
      {item.images.map((image, i) => (
        <div
          className={`border-r-[1px] p-4 border-black grow-0 shrink-0 cursor-pointer w-60`}
          key={i}>
          <div className='flex gap-4 flex-col h-full justify-center items-center bg-white rounded-md'>
            {image.src == '' ? (
              <input
                className='flex h-9 w-full rounded-md border border-input bg-background px-4 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                id='picture'
                name='picture'
                type='file'
                onChange={(e) => uploadImage(e, item.id, i)}
              />
            ) : (
              <ImageCard image={image} />
            )}
          </div>
        </div>
      ))}
      <div
        className={`border-r-[1px] p-4 border-black grow-0 shrink-0 cursor-pointer w-60`}
        onClick={() => {
          createColumn(), console.log('hi')
        }}
        key={totalColumns}>
        <div className='flex gap-8 flex-col h-full justify-center items-center bg-white rounded-md'>
          <span>+</span>
        </div>
      </div>
    </>
  )
}
