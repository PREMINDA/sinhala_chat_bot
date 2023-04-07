import React, { SetStateAction } from 'react'
import { useState, createContext } from 'react'

type SpeechContextType = {
    setInput(value: SetStateAction<string>): void
    input: string | null
}


export const SpeechContext = createContext<SpeechContextType| null>(null)