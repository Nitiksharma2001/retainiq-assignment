import { useEffect, useState } from 'react'
import { items2 } from '../static'
import Header from './header'
import ProductRow from './row'
import { List, arrayMove } from 'react-movable'

export interface ItemType {
  id: number
  images: { src: string; name: string }[]
}

export default function Main() {
  const [items, setItems] = useState<ItemType[]>(items2)
  const [totalColumns, setTotalColumns] = useState(3)

  useEffect(() => {
    const localItems = localStorage.getItem('items')
    const localTotalItems = localStorage.getItem('totalColumns')

    if (localItems) {
      setItems(JSON.parse(localItems) as ItemType[])
    }
    if (localTotalItems) {
      setTotalColumns(Number(localTotalItems))
    }
  }, [])

  function createColumn() {
    setTotalColumns(totalColumns + 1)
    localStorage.setItem('totalColumns', JSON.stringify(totalColumns + 1))
  }

  function removeRow(rowId: number) {
    const updateList = items.filter((item) => item.id !== rowId)
    setItems(updateList)
    localStorage.setItem('items', JSON.stringify(updateList))
  }

  function addNewRow() {
    setItems([...items, { id: items.length + 1, images: [] }])
    localStorage.setItem('items', JSON.stringify([...items, { id: items.length + 1, images: [] }]))
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
  }

  return (
    <div className='flex flex-col gap-4 px-4 bg-gray-200 overflow-auto rounded-lg py-2'>
      <div className='w-full flex gap-8 py-8'>
        <Header totalColumns={totalColumns} removeColumn={removeColumn} />
      </div>
      
      <div id='rows' className='flex flex-col gap-4'>
        <List
          values={items}
          onChange={({ oldIndex, newIndex }) => {
            setItems(arrayMove(items, oldIndex, newIndex))
            localStorage.setItem('items', JSON.stringify(arrayMove(items, oldIndex, newIndex)))
          }}
          renderList={({ children, props }) => (
            <div id='rows' className='flex flex-col gap-4' {...props}>
              {children}
            </div>
          )}
          renderItem={({ value, props }) => (
            <div className='flex gap-8 h-60 group' key={value.id} style={{ pointerEvents: !props.onKeyDown ? 'none' : 'auto' }}  {...props}>
              <ProductRow
                createColumn={createColumn}
                item={value}
                removeRow={removeRow}
                totalColumns={totalColumns}
                uploadImage={uploadImage}
              />
            </div>
          )}
        />
      </div>
      <button className='ml-8 bg-white size-10 rounded-md text-2xl' onClick={addNewRow}>
        +
      </button>
    </div>
  )
}
