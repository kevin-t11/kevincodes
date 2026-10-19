import React from 'react'
import { MdOutlineLocationOn } from "react-icons/md";

const MyLocation = () => {
  return (
    <div className='w-full flex items-center gap-2'>
      <span>✈️</span>
      <a
        href="https://en.wikipedia.org/wiki/Junagadh"
        className="italic underline flex items-center gap-1"
        target="_blank"
      >
        <span>Junagadh, India</span>
        <MdOutlineLocationOn className="text-blue-700 dark:text-blue-400" />
      </a>
    </div>
  )
}

export default MyLocation
