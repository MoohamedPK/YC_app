import { signIn} from "@/auth"

function Navbar() {
  return (
    <header>
        <nav>
            <form action={async () => {
                "use server"

                await signIn("github")
            }}>

                <button type="submit">Login</button>    
            </form>
        </nav>
    </header>
  )
}

export default Navbar