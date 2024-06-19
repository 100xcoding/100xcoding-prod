import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const PortalNavbarRoutes = () => {
    return (
        <div className="flex gap-x-2 ml-auto">
            <Link href="/">
                <Button variant="ghost">
                    <LogOut className="h-4 w-4 mr-2" />
                    Exit
                </Button>
            </Link>
        </div>
    )
}
