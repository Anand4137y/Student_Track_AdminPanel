import SchoolList from '@/mainComponents/schoolList/SchoolList'
import React from 'react'

function page() {
  return (
    <div className="flex-1 p-3 rounded-lg border shadow-lg mt-2 overflow-y-scroll">
      <SchoolList />
    </div>
  )
}

export default page
