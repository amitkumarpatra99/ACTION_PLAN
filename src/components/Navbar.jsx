import React from 'react'


const navbar = () => {
  return (
    <nav className='flex justify-around bg-slate-800 text-center items-center text-slate-300  py-2 h-16'>
      <div className="logo   flex items-center py-8 px-2 ">
        <img src="/public/favicon.png" alt="" className='w-8 h-8 rounded-full animate-pulse' />
        <span className=' text-slate-300 mx-1 cursor-pointer hover:font-extrabold hover:text-white font-bold text-xl'>ACTION PLAN</span>
      </div>

      <ul className="flex gap-5 mx-10 py-5 align-middle justify-center text-center">

        <li>
          <lord-icon
            src="https://cdn.lordicon.com/jeuxydnh.json"
            trigger="morph"
            stroke="bold"
            state="morph-mantion"
            colors="primary:#ffffff,secondary:#ffffff" >
          </lord-icon>
        </li>

        <li>
          <lord-icon
            src="https://cdn.lordicon.com/hmzvkifi.json"
            trigger="hover"
            stroke="bold"
            state="hover-loading"
            colors="primary:#ffffff">
          </lord-icon>
        </li>

      </ul>
    </nav>
  )
}

export default navbar
