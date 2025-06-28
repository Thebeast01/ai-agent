'use client';
import { cn } from '@/lib/utils';
import { BotIcon, StarIcon, VideoIcon } from 'lucide-react';
import Link from 'next/link'
import Image from 'next/image';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator';
import { usePathname } from 'next/navigation';
import { DashboardUserButton } from './dashboard-user-button';
const firstSeaction = [
  {
    icons: VideoIcon,
    label: "Meetings",
    href: "/meetings"

  }, {
    icons: BotIcon,
    label: "Agents",
    href: "/agents"
  }
]
const secondSection = [
  {
    icons: StarIcon,
    label: "Upgrade",
    href: "/upgrade"

  }
]


export const DashboardSidebar = () => {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className='text-sidebase-accent-foreground'>
        <Link href='/' className='flex items-center gap-2 px-2 pt-2'>
          <Image src='/logo.svg' alt='logo' height={36} width={36} />
          <p className='text-2xl font-semibold'>AI-Agent</p>
        </Link>
      </SidebarHeader>
      <div className='px-4 py-2'>
        <Separator className='opacity-100 text-[#5d6b68] ' />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                firstSeaction.map((item, index) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton className={cn('h-10 hover:bg-linear-to-l/oklch border border-transparent hover:border=[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50', pathname === item.href && 'bg-linear-to-l/oklch border-[#5D6B68]/10')} asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}
                      >

                        <item.icons className='size-5' />
                        <span className='text-sm font-medium tracking-tight'>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className='px-4 py-2'>
          <Separator className='opacity-100 text-[#5d6b68] ' />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {
                secondSection.map((item, index) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton className={cn('h-10 hover:bg-linear-to-l/oklch border border-transparent hover:border=[#5D6B68]/10 from-sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50', pathname === item.href && 'bg-linear-to-l/oklch border-[#5D6B68]/10')} asChild
                      isActive={pathname === item.href}
                    >
                      <Link href={item.href}
                      >

                        <item.icons className='size-5' />
                        <span className='text-sm font-medium tracking-tight'>{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              }
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className='text-neutral-600'>
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  )
}
