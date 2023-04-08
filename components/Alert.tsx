import { AlertMessage } from '@/interfaces/models'
import React from 'react'

export default function Alert({message}:AlertMessage) {
  return (
    <>
      <div className="flex items-center">
          <svg aria-hidden="true" className="w-5 h-5 mr-2 text-gray-800 dark:text-gray-300" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"></path></svg>
          <span className="sr-only">Something went Wrong try again</span>
          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">This is a dark alert</h3>
      </div>
      <div className="mt-2 mb-4 text-sm text-gray-800 dark:text-gray-300">
          Some thing went wrong try again!
      </div>
      <div className="flex justify-end">
          <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-xs px-3 py-1.5 text-center " data-dismiss-target="#alert-additional-content-5" aria-label="Close">
          Dismiss
          </button>
      </div>
    </>
  )
}
