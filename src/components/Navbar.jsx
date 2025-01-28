import React from 'react'

const navbar = () => {
  return (
    <nav className='flex justify-between bg-[#155E95] text-center mx-5 my-8 items-center text-[white]   rounded-full h-24 '>
      <div className="logo m-10 justify-center items-center py-8 px-8">
        <span className=' items-center justify-center text-slate-300 cursor-pointer hover:font-extrabold hover:text-white font-bold text-xl'>⚡ACTION PLAN</span>
      </div>
      
      <ul className="flex gap-10 mx-10 py-5 align-middle justify-center text-center"> 
        <li className='cursor-pointer hover:font-bold text-center font-semibold transition-all'>Home</li>
        <li className='cursor-pointer hover:font-bold font-semibold transition-all'> Your  Tasks</li>

      </ul>
    </nav>
  )
}

export default navbar
