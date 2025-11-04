import React from 'react'
import { MdOutlineLocationOn } from "react-icons/md";
import LocationDistance from './LocationDistance'

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
        <MdOutlineLocationOn className="text-blue-700" />
      </a>
      |<LocationDistance />
    </div>
  )
}

export default MyLocation