'use client'
import React from 'react'
import { motion } from 'framer-motion'

export const Hero = () => {
  return (
    <div className='p-8 md:px-32 md:pt-32 md:pb-16 flex justify-center items-center'>
      <div className="flex flex-col gap-0.5">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-5xl md:text-6xl text-center font-bold bg-gradient-to-r from-[#2658A0] to-blue-500 text-transparent bg-clip-text'
        >
          Chase 5/24
        </motion.h1>
        <motion.h1 
          initial={{ opacity: 0, y: 20}}
          animate={{ opacity: 1, y: 0}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className='text-5xl md:text-6xl text-center font-bold bg-gradient-to-r from-[#2658A0] to-blue-800 text-transparent bg-clip-text'
        >
          made simple
        </motion.h1>
      </div>
    </div>
  )
}
