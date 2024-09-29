import { FaArrowLeft, FaTshirt } from 'react-icons/fa'
import Main from './main/main'
import { capitalizeText } from '../../helpers/textFormatter'
import { FaMeta } from 'react-icons/fa6'
import { RiGalleryLine } from 'react-icons/ri'
import { AiFillThunderbolt } from 'react-icons/ai'
import { CiSettings } from 'react-icons/ci'
import { PiFlowerLotusThin } from 'react-icons/pi'

function LeftSidebar() {
  return (
    <>
      <div className='flex flex-col gap-4'>
        <div className='text-green-600 cursor-pointer'>
          <PiFlowerLotusThin  />
        </div>
        <div className='cursor-pointer hover:text-blue-500'>
          <FaTshirt />
        </div>
        <div className='cursor-pointer hover:text-blue-500'>
          <FaMeta  />
        </div>
        <div className='cursor-pointer hover:text-blue-500'>
          <RiGalleryLine />
        </div>
        <div className='cursor-pointer hover:text-blue-500'>
          <AiFillThunderbolt  />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <div className='cursor-pointer hover:text-blue-500'>
          <FaTshirt />
        </div>
        <div className='cursor-pointer hover:text-blue-500'>
          <CiSettings  />
        </div>
      </div>
    </>
  )
}

export default function Home() {
  return (
    <>
      <div className='flex flex-col justify-between items-center text-3xl w-[5%] border-2 border-black fixed h-full bg-black text-white py-4'>
        <LeftSidebar />
      </div>
      <div className='w-[95%] px-4 ml-[5%] py-2'>
        <div className='flex justify-between text-2xl items-center py-4'>
          <div className='flex gap-4'>
            <FaArrowLeft className='cursor-pointer' />
            <input type='text' className='border-b-2 border-black outline-none' />
            <div className='text-blue-600  bg-blue-200 font-bold rounded-2xl text-xs p-2'>{capitalizeText('primary feed')}</div>
          </div>
          <button className='bg-green-600 text-white rounded-lg p-2 text-xl font-bold'>{capitalizeText('publish feed')}</button>
        </div>
        <Main />
      </div>
    </>
  )
}
