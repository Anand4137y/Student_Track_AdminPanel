import React from 'react'
import StudentReportsTable from './StudentReportsTable'
import Paginations from '@/commonComponents/Paginations'

function StudentReports() {
  return (
    <div>
      <StudentReportsTable />
      <Paginations/>
    </div>
  )
}

export default StudentReports
