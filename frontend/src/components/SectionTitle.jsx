import React from 'react'

const SectionTitle = ({text}) => {
  return (
    <div className='mx-10 sm:mx-[10%]'>
      <p className='text-2xl md:text-3xl font-semibold lg:text-5xl text-[#326951] sm:mt-5'>{text}</p>
    </div>
  )
}

export default SectionTitle
