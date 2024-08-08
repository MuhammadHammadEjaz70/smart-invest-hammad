import { COMING_SOON_IMAGE } from '@/utils/images'
import Image from 'next/image'
import React from 'react'

function P2P() {
  return (
    <div className='d-flex justify-content-center align-items-center'><Image src={COMING_SOON_IMAGE} alt='...'/></div>
  )
}

export default P2P