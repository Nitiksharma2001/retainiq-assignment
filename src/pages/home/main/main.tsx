import { useEffect, useState } from 'react'
import data from '../../../data/static.json'
import Header from './header'
import ProductRow from './row'
import { arrayMove } from 'react-movable'
import Sortable from 'sortablejs'

export interface ItemType {
  id: number
  images: { src: string; name: string }[]
}

export default function Main() {
  const [items, setItems] = useState<ItemType[]>(data)
  const [totalColumns, setTotalColumns] = useState(2)

  useEffect(() => {
    const localItems = localStorage.getItem('items')
    const localTotalItems = localStorage.getItem('totalColumns')

    if (localItems) {
      setItems(JSON.parse(localItems) as ItemType[])
    }
    if (localTotalItems) {
      setTotalColumns(Number(localTotalItems))
    }

    Sortable.create(document.getElementById('rows')!, {
      handle: '.glyphicon-move',
      animation: 150,
      onEnd: (event) => {
        const oldIndex = event.oldIndex as number
        const newIndex = event.newIndex as number
        // setItems(arrayMove(items, oldIndex, newIndex))
        console.log(arrayMove(items, oldIndex, newIndex))
        localStorage.setItem('items', JSON.stringify(arrayMove(items, oldIndex, newIndex)))
      },
    })
  }, [])

  function createColumn() {
    const newItems = items.map((item) => {
      return { ...item, images: [...item.images, { src: '', name: '' }] }
    })
    setTotalColumns(totalColumns + 1)
    setItems(newItems)
    localStorage.setItem('items', JSON.stringify(newItems))
    localStorage.setItem('totalColumns', JSON.stringify(totalColumns + 1))
  }

  function removeRow(rowId: number) {
    const updateList = items.filter((item) => item.id !== rowId)
    setItems(updateList)
    localStorage.setItem('items', JSON.stringify(updateList))
  }

  function addNewRow() {
    const newItems = [
      ...items,
      {
        id: items.length + 1,
        images: Array.from({ length: totalColumns }, () => {
          return { src: '', name: '' }
        }),
      },
    ]
    setItems(newItems)
    localStorage.setItem('items', JSON.stringify(newItems))
  }

  function removeColumn(columnNo: number) {
    const newItems = items.map((item) => {
      return { ...item, images: item.images.filter((_, index) => index !== columnNo) }
    })
    setItems(newItems)
    setTotalColumns(totalColumns - 1)
    localStorage.setItem('totalColumns', JSON.stringify(totalColumns - 1))
    localStorage.setItem('items', JSON.stringify(newItems))
  }

  function uploadImage(e: React.ChangeEvent<HTMLInputElement>, rowId: number, columnIndex: number) {
    // @ts-ignore
    const file = e.target.files[0]
    const fileName = file.name

    const newItems = items.map((item) => {
      if (item.id !== rowId) return item

      return {
        ...item,
        images: item.images.map((image, index) => {
          if (index !== columnIndex) return image
          return { src: URL.createObjectURL(file), name: fileName }
        }),
      }
    })
    setItems(newItems)
    localStorage.setItem('items', JSON.stringify(newItems))
  }

  return (
    <>
      <div className='w-full flex gap-8 py-8'>
        <Header totalColumns={totalColumns} removeColumn={removeColumn} />
      </div>
      <div id='rows' className='flex flex-col gap-4'>
        {items.map((item) => (
          <div className='flex gap-8 h-60 group' key={item.id}>
            <ProductRow
              createColumn={createColumn}
              item={item}
              removeRow={removeRow}
              totalColumns={totalColumns}
              uploadImage={uploadImage}
            />
          </div>
        ))}
      </div>
      <button className='ml-8 bg-white size-10 rounded-md text-2xl' onClick={addNewRow}>
        +
      </button>
    </>
  )
}
