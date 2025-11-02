"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { LogOut, Menu, X, User, ShoppingCart, Bell, UserCircle, Settings, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAnimation } from "@/animations"
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function useHeaderState() {
  const pathname = usePathname()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [atTop, setAtTop] = useState(true)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true")

    const onScroll = () => {
      setAtTop(window.scrollY < window.innerHeight)
    }

    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [pathname])

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("userRole")
    localStorage.removeItem("userEmail")
    setIsLoggedIn(false)
    router.push("/")
  }

  const shouldInvert = pathname === "/" && atTop

  return { isLoggedIn, isActive, handleLogout, shouldInvert }
}

export function HeaderDesktop() {
  const { isLoggedIn, isActive, handleLogout, shouldInvert } = useHeaderState()

  return (
    <header
      className={`header invisible hidden md:block fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100 ${
        shouldInvert ? "invert" : ""
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-light tracking-[0.2em] serif-font">
            <img src="/logo-transparent.png" alt="Haj'Aina" className="w-auto h-[40px]" />
          </Link>

          <nav className="flex space-x-8">
            {[
              ["/", "Couverture"],
              ["/collections", "Collections"],
              ["/stylistes", "Stylistes"],
              ["/ethique", "Éthique"],
              ["/recyclage", "Recyclage"],
              ["/magazine", "Magazine"],
            ].map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`navlink text-xs font-light tracking-[0.15em] transition-colors uppercase ${
                  isActive(href) ? "text-black active" : "hover:text-gray-600"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <>
                <Link href="/shopping-cart">
                  <Button variant="ghost" size="sm" className="text-xs tracking-[0.1em] font-light uppercase">
                    <ShoppingCart className="h-5 w-5"/>
                  </Button>
                </Link>
                <Link href="/notifications">
                  <Button variant="ghost" className="w-full text-xs uppercase font-light tracking-widest">
                    <Bell className="h-5 w-5" />
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="text-xs tracking-[0.1em] font-light uppercase flex items-center gap-2">
                      <UserCircle className="h-5 w-5"/>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white px-4 py-2">
                    <Link href="/dashboard">
                      <DropdownMenuItem className="">
                        <User className="mr-2 h-4 w-4" />
                        Mon Compte
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <Link href="/settings">
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        Paramètres
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Link href="/login">
                <Button variant="ghost" size="sm" className="text-xs tracking-[0.1em] font-light uppercase">
                  Connexion
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export function HeaderMobile() {
  const { isLoggedIn, isActive, handleLogout, shouldInvert } = useHeaderState()
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState("fr")

  return (
    <header
      className={`header invisible block md:hidden fixed top-0 w-full z-50 border-b border-gray-100 ${
        shouldInvert ? "invert bg-white backdrop-blur-sm" : "bg-white backdrop-blur-sm"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-light tracking-[0.2em] serif-font">
          <img src="/logo-transparent.png" alt="Haj'Aina" className="h-[36px]" />
        </Link>
        {isLoggedIn && (
          <div className="flex">
            <Link href="/cart" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full text-xs uppercase font-light tracking-widest">
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/notifications" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="w-full text-xs uppercase font-light tracking-widest">
                <Bell className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button onClick={() => setOpen(!open)} aria-label="Toggle Menu">
              {open ? <X className="h-4 w-4" /> : <Menu className="ml-2 h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      {open && (
        <>
          <div className="fixed inset-0 z-40 h-screen w-screen bg-gray-50/50 backdrop-blur-xl" onClick={() => setOpen(false)} />
          <div className="fixed top-0 right-0 w-3/4 h-screen z-50 bg-white p-6 flex flex-col gap-6 transition-transform duration-300">
            <nav className="flex flex-col space-y-5 text-xs uppercase font-light tracking-[0.15em]">
              {[
                ["/", "Couverture"],
                ["/collections", "Collections"],
                ["/stylistes", "Stylistes"],
                ["/ethique", "Éthique"],
                ["/recyclage", "Recyclage"],
                ["/magazine", "Magazine"],
              ].map(([href, label]) => (
                <Link
                  key={href}
                  href={href}
                  className={`${isActive(href) ? "text-black font-semibold" : "text-gray-600"} transition-colors`}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto pt-6 border-t border-gray-200">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" onClick={() => setOpen(false)}>
                    <Button variant="ghost" className="w-full text-xs uppercase font-light tracking-widest">
                      Mon Compte
                      <User className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleLogout()
                      setOpen(false)
                    }}
                    className="w-full text-xs uppercase font-light tracking-widest"
                  >
                    Déconnexion
                    <LogOut className="ml-2 h-4 w-4" />
                  </Button>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)}>
                  <Button variant="ghost" className="w-full text-xs uppercase font-light tracking-widest">
                    Connexion
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </header>
  )
}

export default function Header() {
  useAnimation(["header"]);

  return (
    <>
      <HeaderDesktop />
      <HeaderMobile />
    </>
  )
}
