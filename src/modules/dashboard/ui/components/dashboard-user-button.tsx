import { authClient } from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerDescription
} from "@/components/ui/drawer";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ChevronDown, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
export const DashboardUserButton = () => {
  const router = useRouter()
  const isMobile = useIsMobile();
  const { data, isPending } = authClient.useSession()
  if (isPending || !data?.user) {
    return null;
  }
  const onLogout = () => {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/sign-in')
        }
      }
    })

  }
  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger className=" gap-4 rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-[#ff9b45c6]/50 hover:bg-[#ff9b45c6] overflow-hidden">
          {data.user.image ? (
            <Avatar>
              <AvatarImage src={data?.user?.image} />
            </Avatar>
          ) : (<GeneratedAvatar seed={data.user.name} variant="initials" className="size-9 mr-3" />)
          }
          <div className="flex flex-1 flex-col gap-0.5 text-left overflow-hidden min-w-0">
            <p className="text-sm truncate w-full">{data.user.name}</p>
            <p className="text-xs truncate w-full">{data.user.email}</p>
          </div>
          <ChevronDown className="size-4 shrink-0" />

        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{data.user.name}</DrawerTitle>
            <DrawerDescription>{data.user.email}</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant={'outline'} onClick={() => { }}><CreditCardIcon className="size-4 text-black" /> Billing</Button>
            <Button variant={'outline'} onClick={onLogout}><LogOutIcon className="size-4 text-black" />Logout</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" gap-4 rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-[#ff9b45c6]/50 hover:bg-[#ff9b45c6] overflow-hidden">
        {
          data.user.image ? (
            <Avatar>
              <AvatarImage src={data.user.image} />
            </Avatar>
          ) : (<GeneratedAvatar seed={data.user.name} variant="initials" className="size-9 mr-3" />)
        }
        <div className="flex flex-1 flex-col gap-0.5 text-left overflow-hidden min-w-0">
          <p className="text-sm truncate w-full">{data.user.name}</p>
          <p className="text-xs truncate w-full">{data.user.email}</p>
        </div>
        <ChevronDown className="size-4 shrink-0" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" side="right" className="w-72"
      >
        <DropdownMenuLabel>
          <div className="flex flex-col gap-1">
            <span className="font-medium truncate"> {data.user.name}</span>
            <span className="font-normal text-muted-foreground text-sm truncate"> {data.user.email}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between">Billing <CreditCardIcon className="size-4" /></DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer flex items-center justify-between" onClick={onLogout}>Logout <LogOutIcon className="size-4" /></DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
