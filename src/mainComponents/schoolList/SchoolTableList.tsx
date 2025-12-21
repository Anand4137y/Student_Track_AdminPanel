import React from 'react'
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

function SchoolTableList({ schoolList }: any) {
    console.log(schoolList)
    return (
        <Table>
            {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">SL.NO</TableHead>
                    <TableHead>School</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead className="text-center">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    schoolList && schoolList.length > 0 && schoolList.map((school: any, i: number) => (
                        <TableRow key={school?._id}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{school?.schoolName}</TableCell>
                            <TableCell>{school?.city}</TableCell>
                            <TableCell className="flex justify-center"><Eye /></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}

export default SchoolTableList

