import React from 'react'
import { Calendar, Home, Inbox, School, Search, Settings, ClipboardMinus, GitPullRequestDraft } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

function AppSidebar() {
    // Menu items.
    const items = [
        {
            title: "Dashboard",
            url: "/dashboard",
            icon: Home,
        },
        {
            title: "School List",
            url: "/dashboard/school-list",
            icon: School,
        },
        {
            title: "Student reports",
            url: "/dashboard/student-reports",
            icon: ClipboardMinus
        },{
            title: "School Requests",
            url: "/dashboard/school-request",
            icon: GitPullRequestDraft
        }
    ]
    return (
        <Sidebar variant='floating'>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className='text-lg py-8' >STUDENT TRACK</SidebarGroupLabel>
                    <SidebarGroupContent className='mt-10'>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

export default AppSidebar
