import { client } from "@/sanity/lib/client"
import Ping from "./Ping"
import { STARTUP_VIEWS } from "@/sanity/lib/queries"

const View = async ({id}: {id: string}) => {

    const {views} = await client.withConfig({useCdn: false}).fetch(STARTUP_VIEWS, {id}) 
    console.log(views)
  return (
    <div className=" px-6 py-2 rounded-lg flex justify-end items-center fixed bottom-8 right-8 mt-5 bg-pink-300 drop-shadow-3xl">
        <div className="absolute -top-2 -right-2">
            <Ping/>
        </div>
        
        <p className="font-semibold space-x-1">
            <span className="font-bold">
                {views}
            </span>
            
            <span>Views</span>
        </p>
    </div>
  )
}

export default View