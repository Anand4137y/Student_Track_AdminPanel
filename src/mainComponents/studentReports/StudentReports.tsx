import React from 'react'
import StudentReportsTable from './StudentReportsTable'
import Paginations from '@/commonComponents/Paginations'

function StudentReports() {
  return (
    <div>
      <h1>Student Reports</h1>
      <StudentReportsTable />
      <Paginations/>
    </div>
  )
}

export default StudentReports
