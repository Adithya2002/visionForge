
import * as React from "react"


import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { createClient } from "@/lib/supabase/server"
import { Sparkles } from "lucide-react"

// This is sample data.


export async function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();
  const {data} = await supabase.auth.getUser();
  const user = {
    name: data.user?.user_metadata.fullName,
    email: data.user?.user_metadata.email ?? "",
    avatar:''
  }
  console.log(data);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex p-2 aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <Sparkles/>
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">
              Pictoria Ai
            </span>
            <span className="truncate text-xs">Pro</span>
          </div>
          
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain/> 
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user}/> 
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
