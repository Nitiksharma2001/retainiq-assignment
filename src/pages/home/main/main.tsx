import { useEffect, useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { items2 } from '../static'
import Header from './header'
import ProductRow from './row'
import Sortable from 'sortablejs'

export interface ItemType {
  id: string
  images: string[]
}

export default function Main() {
  const [items, setItems] = useState<ItemType[]>(items2)
  const [totalColumns, setTotalColumns] = useState(4)

  useEffect(() => {
    const localItems = localStorage.getItem('items')
    const localTotalItems = localStorage.getItem('totalColumns')

    if (localItems) {
      setItems(JSON.parse(localItems) as ItemType[])
    }
    if (localTotalItems) {
      setTotalColumns(Number(localTotalItems))
    }3
    Sortable.create(document.getElementById('rows')!, {
      handle: '.glyphicon-move',
      animation: 150,
    })
  }, [])
  useEffect(() => {
    console.log(items)
}, [items]);

  function createColumn() {
    setTotalColumns(totalColumns + 1)
    // localStorage.setItem('totalColumns', JSON.stringify(newColumns))
  }

  function removeRow(rowId: string) {
    const updateList = items.filter((item) => item.id !== rowId)
    setItems(updateList)
    // localStorage.setItem('items', JSON.stringify(updateList))
  }

  function addNewRow() {
    setItems([...items, { id: uuidv4(), images: [] }])
    // localStorage.setItem('items', JSON.stringify([...items, { id: uuidv4(), images: [] }]))
  }

  function removeColumn(columnNo: number) {
    const newItems = items.map((item) => {
      return { ...item, images: item.images.filter((_, index) => index !== columnNo) }
    })
    setItems(newItems)
    setTotalColumns(totalColumns - 1)
    // localStorage.setItem('totalColumns', JSON.stringify(totalColumns - 1))
    // localStorage.setItem('items', JSON.stringify(newItems))
  }

  return (
      <div className='flex flex-col gap-4 px-4 bg-gray-200 overflow-auto rounded-lg py-2'>
        <div className='w-full flex gap-8 py-8'>
          <Header totalColumns={totalColumns} removeColumn={removeColumn} />
        </div>
        <div id='rows' className='flex flex-col gap-4'>
          {items.map((item, index) => {
            return (
              <div className='flex gap-8 h-60 group' key={item.id}>
                <ProductRow
                  createColumn={createColumn}
                  index={index}
                  item={item}
                  removeRow={removeRow}
                  totalColumns={totalColumns}
                />
              </div>
            )
          })}
        </div>
        <button className='ml-8 bg-white size-10 rounded-md text-2xl' onClick={addNewRow}>
          +
        </button>
      </div>
  )
}
