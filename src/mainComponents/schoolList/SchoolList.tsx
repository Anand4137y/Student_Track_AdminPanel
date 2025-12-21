"use client"
import React, { useEffect, useState } from 'react'
import SchoolTableList from './SchoolTableList'
import Paginations from '@/commonComponents/Paginations'
import axios from 'axios';
import { getTokenFromLocalStorage } from '@/utils/getToken';
import toast from 'react-hot-toast';

function SchoolList() {
  const [loading, setLoading] = useState<boolean>(false);
  const [schoolList, setSchoolList] = useState<any[]>([]);

  const getAllSchools = async () => {
    try {
      setLoading(true)
      const token = getTokenFromLocalStorage();
      if (!token) return toast.error(" Please login to continue")

      const URL = process.env.BASE_URL || 'http://localhost:3001'

      const res = await axios.get(`${URL}/api/admin/all-schools`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setSchoolList(res?.data?.data);
    } catch (error) {

    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getAllSchools()
  }, [])

  return (
    <div>
      <SchoolTableList schoolList={schoolList} />
      <Paginations />
    </div>
  )
}

export default SchoolList
