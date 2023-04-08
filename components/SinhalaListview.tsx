import { SinhalaList } from '@/interfaces/models'
import React from 'react'

export default function SinhalaListview({text,textNumber,location}:SinhalaList) {
  return (
    <h2 className={`${textNumber==location?'bg-gray-300':'bg-white'}`}>{text}</h2>
  )
}
