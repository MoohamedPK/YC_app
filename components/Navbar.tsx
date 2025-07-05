import { signIn, auth, signOut } from "@/auth"
import { BadgePlus, LogOut } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const Navbar = async () => {

  const session = await auth()
  
  return (
    <header>
        <nav className="flex justify-between items-center bg-white px-8 py-4 text-black font-semibold ">
            <Link href='/'>
              <Image src='/logo.png' alt="logo" width={150} height={50} priority/>
            </Link>

            <div className="flex items-center gap-5">
              {session && session?.user ? (    
                <>
                  <Link href='/create'>
                    <span className="hidden md:block">Create</span>
                    <BadgePlus className="size-6 md:hidden"/>
                  </Link>

                  <form  action={ async () => {
                    "use server"

                    await signOut({redirectTo: "/"})
                  }}>
                    <button type="submit" className="cursor-pointer">
                      <span className="hidden md:block">Logout</span>
                      <LogOut className="size-6 text-red-500 md:hidden"/>
                    </button>
                  </form>

                  <Link href={`/user/${session.id}`}>
                    <Image width={40} height={40} src={session.user?.image} alt="profile image" className="rounded-full"/>
                  </Link>
                </>
              )  : (
                <>
                  <form action={ async () => {
                    "use server"
                    await signIn("github")}}>  

                    <button type="submit" className="cursor-pointer">Login</button>
                  </form>
                </>
              )}
            </div>
        </nav>
    </header>
  )
}

export default Navbar