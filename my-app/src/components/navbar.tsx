"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

const links = [
  { href: "/", label: "Home" },
  { href: "/Dua", label: "Dua" },
  { href: "/Daily-tasbih", label: "Daily tasbih" },
  { href: "/Contact", label: "Contact" },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <header className="border-b px-6 py-3 flex items-center justify-between">
      <Link href="/" className="font-semibold text-lg">
        MyApp
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuItem key={link.href}>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  pathname === link.href && "bg-muted font-semibold"
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

