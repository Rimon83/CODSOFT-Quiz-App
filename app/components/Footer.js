import React from 'react'
import { date } from '../lib/getConstData';

const Footer = () => {
  return <footer className="w-full  p-8 bg-slate-200 flex-center text-sm text-gray-600">
   <p>Copyright ©️ Rimon Alqoshi {date}</p>
  </footer>;
}

export default Footer