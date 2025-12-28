"use client"
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Eye } from 'lucide-react';
import { getTokenFromLocalStorage } from '@/utils/getToken';
import axios from 'axios';
import StudentViewModal from './StudentViewModal';

function StudentReportsTable() {
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(15);
    const [status, setStatus] = useState<"pending" | "resolved">('pending');
    const [selectedReport, setSelectedReport] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const getAllReports = async () => {
        try {
            setLoading(true);
            const token = getTokenFromLocalStorage();
            if (!token) return;

            // Use environment variables for API URLs
            const URL = process.env.NEXT_PUBLIC_BASE_URL;
            const res = await axios.get(`${URL}api/admin/all-student-reports`, {
                params: {
                    page,
                    limit,
                    status
                },
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setReports(res?.data?.data?.reportedStudents || []);
            console.log(res?.data?.data?.reportedStudents)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setPage(1);
        getAllReports();
    }, [page, status]);

    const formattedDate = (dateInput: any) => {
        // 1. Ensure it's a Date object
        const dateObj = new Date(dateInput);

        // 2. Check if the date is valid to avoid "Invalid Date" strings
        if (isNaN(dateObj.getTime())) return "N/A";

        // 3. Format as DD-MM-YYYY
        return dateObj.toLocaleDateString('en-GB').replace(/\//g, '-');
    }

    const handleViewReport = (report: any) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    }

    return (
        <div className="w-full space-y-4">
            <div className="flex">
                <div className="flex p-1 rounded-lg">
                    <button
                        onClick={() => { setStatus('pending'); setPage(1); }}
                        className={`px-4 py-2 text-xs md:text-sm font-medium rounded-md transition-all border ${status === 'pending' ? 'bg-gray-200 text-black shadow-sm' : 'text-gray-500'}`}
                    >
                        Pending Reports
                    </button>
                    <button
                        onClick={() => { setStatus('resolved'); setPage(1); }}
                        className={`px-4 py-2 text-xs md:text-sm font-medium rounded-md transition-all border ${status === 'resolved' ? 'dark:bg-gray-200 text-black shadow-sm' : 'text-gray-500'}`}
                    >
                        Resolved Reports
                    </button>
                </div>
            </div>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">School</TableHead>
                        <TableHead>Student</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        reports && reports.length > 0 ? reports.map((report) => (
                            <TableRow key={report?._id}>
                                <TableCell className="font-medium">1</TableCell>
                                <TableCell>{report?.name}</TableCell>
                                <TableCell>{report?.phone}</TableCell>
                                <TableCell>{formattedDate(report?.createdAt)}</TableCell>
                                <TableCell className="flex justify-center cursor-pointer" onClick={() => handleViewReport(report)}><Eye /></TableCell>
                            </TableRow>
                        )) : null
                    }
                </TableBody>
            </Table>
            <StudentViewModal isOpen={isModalOpen} onClose={setIsModalOpen} data={selectedReport} onSuccess={() => getAllReports()} />
        </div>
    )
}

export default StudentReportsTable
