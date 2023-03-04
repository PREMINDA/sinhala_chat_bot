import {  likeOption, UserComment } from '@/interfaces/models';
import React, { useState } from 'react'


export function LikeSvgOutlinr({rotaion='rotate-0',onLikeClick}:likeOption) {

  return (
    <svg onClick={()=>onLikeClick()} className={`${rotaion} h-6 w-6 fill-white transition ease-in-out delay-150 hover:scale-125`} version="1.0" xmlns="http://www.w3.org/2000/svg"
      width="96.000000pt" height="96.000000pt" viewBox="0 0 96.000000 96.000000"
      preserveAspectRatio="xMidYMid meet">
      <g  transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
      fill="#000000" stroke="none">
        <path className='fill-white bg-white' d="M448 914 c-3 -5 -11 -40 -19 -78 l-13 -69 -82 -69 c-45 -37 -85 -76
        -88 -84 -3 -9 -6 -112 -6 -230 0 -286 -20 -264 247 -264 165 0 202 3 221 16
        13 8 56 83 97 165 72 143 75 152 75 219 0 62 -3 74 -25 95 -23 23 -31 25 -130
        25 l-107 0 9 33 c4 17 8 58 8 89 0 60 -17 94 -66 130 -27 20 -113 35 -121 22z
        m94 -101 c26 -23 23 -74 -11 -170 l-29 -83 149 0 149 0 0 -45 c0 -35 -14 -73
        -67 -180 l-68 -135 -172 0 -173 0 0 193 1 192 84 70 c47 38 85 76 85 85 0 23
        20 90 27 90 4 0 15 -7 25 -17z"/>
        <path className='fill-white' d="M80 380 l0 -260 40 0 40 0 0 260 0 260 -40 0 -40 0 0 -260z"/>
      </g>
    </svg>
  )
}


export function LikeSvgFill({rotaion='rotate-0',onLikeClick}:likeOption) {
  const[inputDisLike,setInputDisLike] = useState<UserComment>(UserComment.NO_COMMENT);
  return (
    <svg onClick={()=>onLikeClick()} className={`${rotaion} h-6 w-6 fill-white transition ease-in-out delay-150 hover:scale-125`} version="1.0" xmlns="http://www.w3.org/2000/svg"
    width="96.000000pt" height="96.000000pt" viewBox="0 0 96.000000 96.000000"
    preserveAspectRatio="xMidYMid meet">

        <g transform="translate(0.000000,96.000000) scale(0.100000,-0.100000)"
          stroke="none">
        <path className='fill-white' d="M437 863 c-3 -10 -10 -41 -17 -69 -9 -41 -24 -65 -76 -122 l-64 -70
        0 -241 0 -241 226 2 226 3 74 165 c69 155 73 169 74 238 l0 72 -181 0 c-167 0
        -180 1 -175 18 3 9 12 46 21 82 15 61 15 68 -3 120 -18 54 -20 55 -60 58 -32
        2 -41 -1 -45 -15z"/>
        <path className='fill-white' d="M80 360 l0 -240 60 0 60 0 0 240 0 240 -60 0 -60 0 0 -240z"/>
      </g>
    </svg>
  )
}

