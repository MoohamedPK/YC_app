import { signIn, auth, signOut } from "@/auth"
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
                  <Link href='/'>Create</Link>

                  <form  action={ async () => {
                    "use server"

                    await signOut({redirectTo: "/"})
                  }}>
                    <button type="submit" className="cursor-pointer">Logout</button>
                  </form>

                  <Link href={`/user/${session.user.id}}`}>
                    <span>{session?.user?.name}</span>
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