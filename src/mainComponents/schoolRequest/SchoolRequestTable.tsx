import React, { useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Check, X } from 'lucide-react';
import axios from 'axios';
import { getTokenFromLocalStorage } from '@/utils/getToken';
import SchoolConfirmModal from './SchoolConfirmModal';
import toast from 'react-hot-toast';

interface SchoolRequestTableProps {
    requests: any[];
    onActionComplete: () => void; // To refetch data in parent
}

function SchoolRequestTable({ requests, onActionComplete }: SchoolRequestTableProps) {
    const [isAction, setIsAction] = useState<boolean>(false);
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        requestId: string | null;
        schoolName: string;
        action: 'approve' | 'reject' | null;
    }>({ isOpen: false, requestId: null, schoolName: '', action: null });

    const openModal = (request: any, action: 'approve' | 'reject') => {
        setModalState({
            isOpen: true,
            requestId: request._id,
            schoolName: request.schoolName,
            action: action,
        });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, requestId: null, schoolName: '', action: null });
    };

    const handleConfirmAction = async (requestId: string, actionType: 'approve' | 'reject') => {
        console.log("Action details:", { requestId, actionType });
        if (!requestId || !actionType) return;

        try {
            setIsAction(true);
            const token = getTokenFromLocalStorage();
            if (!token) {
                toast.error("Authentication error. Please log in again.");
                return;
            }

            const action = actionType === "approve" ? "approved" : "rejected";

            const URL = process.env.BASE_URL || 'http://localhost:3001/api';

            await axios.patch(`${URL}/admin/approveOrRejectSchool/${requestId}`,
                { permission: action },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast.success(`School request ${action} successfully`);
            onActionComplete(); // Trigger refetch in parent component
        } catch (error) {
            console.error("Error updating school request status:", error);
            toast.error("Failed to update school request. Please try again.");
        } finally {
            setIsAction(false);
            closeModal();
        }
    }
    return (
        <>
            <Table>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">SL.NO</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead>City</TableHead>
                        <TableHead>School Code</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        requests && requests.length > 0 ? requests.map((req: any, i: number) => (
                            <TableRow key={req._id}>
                                <TableCell className="font-medium">{i + 1}</TableCell>
                                <TableCell>{req?.schoolName}</TableCell>
                                <TableCell>{req?.city}</TableCell>
                                <TableCell>{req?.schoolCode}</TableCell>
                                <TableCell>{req?.phone}</TableCell>
                                <TableCell className="flex justify-center gap-4">
                                    <button disabled={isAction} onClick={() => openModal(req, 'reject')}>
                                        <X className='text-red-600 hover:cursor-pointer hover:text-red-400' />
                                    </button>
                                    <button disabled={isAction} onClick={() => openModal(req, 'approve')}>
                                        <Check className='text-green-600 hover:cursor-pointer hover:text-green-400' />
                                    </button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center">No pending school requests found.</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
            <SchoolConfirmModal
                isOpen={modalState.isOpen}
                onClose={closeModal}
                onConfirm={() => {
                    debugger
                    if (modalState.requestId && modalState.action) {
                        handleConfirmAction(modalState.requestId, modalState.action);
                    }
                }}
                action={modalState.action}
                schoolName={modalState.schoolName} />
        </>
    )
}

export default SchoolRequestTable
