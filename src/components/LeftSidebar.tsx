import { AiFillThunderbolt } from "react-icons/ai";
import { CiSettings } from "react-icons/ci";
import { FaTshirt } from "react-icons/fa";
import { FaMeta } from "react-icons/fa6";
import { PiFlowerLotusThin } from "react-icons/pi";
import { RiGalleryLine } from "react-icons/ri";

export function LeftSidebar() {
    return (
      <>
        <div className='flex flex-col gap-4'>
          <div className='text-green-600 cursor-pointer'>
            <PiFlowerLotusThin />
          </div>
          <div className='cursor-pointer hover:text-blue-500'>
            <FaTshirt />
          </div>
          <div className='cursor-pointer hover:text-blue-500'>
            <FaMeta />
          </div>
          <div className='cursor-pointer hover:text-blue-500'>
            <RiGalleryLine />
          </div>
          <div className='cursor-pointer hover:text-blue-500'>
            <AiFillThunderbolt />
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='cursor-pointer hover:text-blue-500'>
            <FaTshirt />
          </div>
          <div className='cursor-pointer hover:text-blue-500'>
            <CiSettings />
          </div>
        </div>
      </>
    )
  }