import { client } from "@/sanity/lib/client"
import { STARTUPS_BY_AUTHOR } from "@/sanity/lib/queries"
import StartupCard, { StartupTypeCard } from "./StartupCard";

const UserStartups = async ({id}: {id:string}) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR, {id});
    console.log(startups.length > 0)
  return (
    <>  
        {startups.length > 0 ? (
            startups.map((startup: StartupTypeCard) => (
                <StartupCard key={startup._id} post={startup}/>
            ))
        ) : (
            <p className="text-lg font-semibold text-center">No posts yet</p>
        )}
    </> 
  )
}


export default UserStartups