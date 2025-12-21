"use client";
import React from 'react';
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import AppSidebar from '@/mainComponents/AppSidebar';
import AppHeader from "@/mainComponents/AppHeader";
import BreadCrumbs from '@/mainComponents/BreadCrumbs';

function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className='flex h-screen w-full'>
                <AppSidebar/>
                <main className='flex flex-col flex-1 m-2.5'>
                    <AppHeader/>
                    <BreadCrumbs/>
                    {children}
                </main>
            </div>
        </SidebarProvider>
    );
}

export default DashboardLayout;
