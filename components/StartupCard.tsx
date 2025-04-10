import { formateDate } from "@/lib/utils"
import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const StartupCard = ({post}) => {
  return (
    <li className="px-6 py-3 border-4 border-r-8 border-b-8 border-black rounded-lg group hover:border-pink-600 transition-all duration-300">
        <div className="flex justify-between items-center">
            <p className="font-semibold text-sm">
                {formateDate(post.createdAt)}
            </p>

            <div className="flex items-center space-x-2">
                <EyeIcon className="size-5 text-pink-600"/>
                <span className="text-xs font-bold">{post.views}</span>
            </div>
        </div>

        <div className="mt-7 flex justify-between items-center">
            <div className="">
                <Link href={`/user/${post.author.id}`}>
                    <p className="text-xs font-semibold mb-2">{post.author.name}</p>
                </Link>

                <Link href={`/startup/${post._id}`}>
                    <p className="font-bold">{post.title}</p>
                </Link>
            </div>

            <div>
                <Link href={`/user/${post.author.id}`}>
                    <Image src="https://placehold.co/600x400" alt="profile pic" width={38} height={38} className="rounded-full"/>
                </Link>
            </div>
        </div>

        <Link className="space-y-3" href={`/startup/${post._id}`}>
            <p className=" text-sm">{post.description}</p>

            <img src={post.image} alt="subject image" className="h-[150px] w-full object-cover rounded-lg"/>
        </Link>

        <div className="flex justify-between items-center mt-10"> 
            <Link href={`/startup/`}>
                <p className="text-sm font-semibold">{post.category}</p>
            </Link>

            <button className="bg-black text-white text-sm font-semibold px-4 py-1 rounded-full cursro-pointer">
                Details
            </button>
        </div>
    </li>
  )
}

export default StartupCard