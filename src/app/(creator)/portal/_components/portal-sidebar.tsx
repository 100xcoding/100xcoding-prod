import { Logo } from '@/components/logo'
import React from 'react'
import { PortalSidebarRoutes } from './portal-sidebar-routes'

export const PortalSidebar = () => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto dark:bg-background  shadow-sm">
            <div className="p-4">
                <Logo />
            </div>
            <div className="flex flex-col w-full mt-2.5">
                <PortalSidebarRoutes />
            </div>
        </div>
    )
}
