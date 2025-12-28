import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { getTokenFromLocalStorage } from '@/utils/getToken'
import axios from 'axios'

interface StudentViewModalProps {
  isOpen: boolean
  onClose: (open: boolean) => void
  data: any
  onSuccess: () => void;
}

function StudentViewModal({ isOpen, onClose, data, onSuccess }: StudentViewModalProps) {
  const [status, setStatus] = useState<string>("pending");
  const [loading, setLoading] = useState(false);
console.log(data)
  useEffect(() => {
    if (data) {
      setStatus(data.status || "pending");
    }
  }, [data]);

  if (!data) return null

  const formattedDate = (dateInput: any) => {
    const dateObj = new Date(dateInput)
    if (isNaN(dateObj.getTime())) return "N/A"
    return dateObj.toLocaleDateString("en-GB").replace(/\//g, "-")
  }

      const updateStatus = async () => {
          try {
              setLoading(true);
              const token = getTokenFromLocalStorage();
              if (!token) return;

              // Use environment variables for API URLs
              const URL = process.env.NEXT_PUBLIC_BASE_URL;
              const res = await axios.patch(`${URL}api/admin/update-student-status`,
                  { status },
                  {
                    params: {
                        id: data?._id,
                        ...(data?.student ? { studentId: data.student._id } : {})
                    },
                    headers: {
                      Authorization: `Bearer ${token}`
                    }
              })
              onSuccess();
              onClose(false)
          } catch (error) {
              console.log(error);
          } finally {
              setLoading(false);
          }
      }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Reported Student Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Name</Label>
            <div className="col-span-3">{data.name || "N/A"}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">School</Label>
            <div className="col-span-3">{data.school || "N/A"}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Class</Label>
            <div className="col-span-3">{data.className + ' ' + data?.section || "N/A"}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Phone</Label>
            <div className="col-span-3">{data.phone || "N/A"}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Date</Label>
            <div className="col-span-3">{formattedDate(data.createdAt)}</div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-bold">Status</Label>
            <div className="col-span-3">
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={updateStatus} disabled={loading}>Update</Button>
          <Button variant="outline" onClick={() => onClose(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default StudentViewModal
