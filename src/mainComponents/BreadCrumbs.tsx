"use client"

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb" // Assuming you have this from shadcn/ui

function BreadCrumbs() {
    const pathname = usePathname()
    const pathSegments = pathname.split('/').filter(segment => segment)

    // Helper to capitalize the first letter
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <Breadcrumb className='my-1'>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/admin/dashboard">Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                {pathSegments.map((segment, index) => {
                    const href = `/${pathSegments.slice(0, index + 1).join('/')}`
                    const isLast = index === pathSegments.length - 1

                    // Skip the root segment if it's 'admin' or 'dashboard' since we have a home link
                    if (segment.toLowerCase() === 'admin' || segment.toLowerCase() === 'dashboard') {
                        return null;
                    }

                    return (
                        <React.Fragment key={href}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage> : <BreadcrumbLink asChild><Link href={href}>{capitalize(segment)}</Link></BreadcrumbLink>}
                            </BreadcrumbItem>
                        </React.Fragment>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default BreadCrumbs
