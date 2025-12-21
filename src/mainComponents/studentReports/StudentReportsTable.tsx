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

function StudentReportsTable() {
    const [loading, setLoading] = useState(true);
    const [reports, setReports] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(15);

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
                    limit
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
        getAllReports();
    }, [page]);
    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">id</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>Place</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    reports && reports.length > 0 ? reports.map((report, index) => (
                        <TableRow>
                            <TableCell className="font-medium">1</TableCell>
                            <TableCell>SNCS</TableCell>
                            <TableCell>Puthuppally</TableCell>
                            <TableCell className="flex justify-center"><Eye /></TableCell>
                        </TableRow>
                    )) : null
                }
            </TableBody>
        </Table>
    )
}

export default StudentReportsTable
