'use client'
import React, { useEffect, useState } from 'react'
import SchoolRequestTable from './SchoolRequestTable'
import Paginations from '@/commonComponents/Paginations'
import { getTokenFromLocalStorage } from '@/utils/getToken';
import axios from "axios";

function SchoolRequest() {
  const [loading, setloading] = useState(true);
  const [requests, setRequests] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const getAllRequests = async() => {
    try {
      setloading(true);
      setError(null);
      const token = getTokenFromLocalStorage();
      if(!token) return;

      // Use environment variables for API URLs
      const URL = process.env.BASE_URL || 'http://localhost:3001/api';

      const res = await axios.get(`${URL}/admin/allRequests`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setRequests(res?.data?.data || []);


    } catch (err: any) {
      console.error("Error fetching school requests:", err);
      setError("Failed to fetch school requests. Please try again later.");
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    getAllRequests();
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <SchoolRequestTable requests={requests} onActionComplete={getAllRequests} />
      <Paginations/>
    </div>
  )
}

export default SchoolRequest
