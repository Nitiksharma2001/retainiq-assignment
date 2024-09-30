import { FaArrowLeft } from 'react-icons/fa'
import Main from './main/main'
import { capitalizeText } from '../../helpers/textFormatter'
import { LeftSidebar } from '../../components/LeftSidebar'

export default function Home() {
  return (
    <>
      <div className='flex flex-col justify-between items-center text-3xl w-[5%] border-2 border-black fixed h-full bg-black text-white py-4'>
        <LeftSidebar />
      </div>
      <div className='w-[95%] px-4 ml-[5%] py-2'>
        <div className='flex justify-between text-2xl items-center py-4'>
          <NavigationFitlers />
        </div>
        <div className='flex flex-col gap-4 px-4 bg-gray-200 overflow-auto rounded-lg py-2'>
          <Main />
        </div>
      </div>
    </>
  )
}

function NavigationFitlers() {
  return (
    <>
      <div className='flex gap-4'>
        <FaArrowLeft className='cursor-pointer' />
        <input type='text' className='border-b-2 border-black outline-none' />
        <div className='text-blue-600  bg-blue-200 font-bold rounded-2xl text-xs p-2'>
          {capitalizeText('primary feed')}
        </div>
      </div>
      <button className='bg-green-600 text-white rounded-lg p-2 text-xl font-bold'>
        {capitalizeText('publish feed')}
      </button>
    </>
  )
}
