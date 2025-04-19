import { formateDate } from "@/lib/utils"
import { Author, Startup } from "@/sanity/types"
import { EyeIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export type StartupTypeCard = Omit<Startup, "author"> & {author?: Author};

const StartupCard = ({post}: {post:StartupTypeCard}) => {

    const {_createdAt, views, author, _id, title, description, category, image} = post;

  return (
    <li className="px-6 py-3 border-4 border-r-8 border-b-8 border-black rounded-lg group hover:border-pink-600 transition-all duration-300">
        <div className="flex justify-between items-center">
            <p className="font-semibold text-sm">
                {formateDate(_createdAt)}
            </p>

            <div className="flex items-center space-x-2">
                <EyeIcon className="size-5 text-pink-600"/>
                <span className="text-xs font-bold">{views}</span>
            </div>
        </div>

        <div className="mt-7 flex justify-between items-center">
            <div className="">
                <Link href={`/user/${author?._id}`}>
                    <p className="text-xs font-semibold mb-2">{author?.name}</p>
                </Link>

                <Link href={`/startup/${_id}`}>
                    <p className="font-bold">{title}</p>
                </Link>
            </div>

            <div>
                <Link href={`/user/${author?._id}`}>
                    <Image src="https://placehold.co/600x400" alt="profile pic" width={38} height={38} className="rounded-full"/>
                </Link>
            </div>
        </div>

        <Link className="space-y-3" href={`/startup/${_id}`}>
            <p className="line-clamp-2 text-sm">{description}</p>

            <img src={image} alt="subject image" className="h-[150px] w-full object-cover rounded-lg"/>
        </Link>

        <div className="flex justify-between items-center mt-10"> 
            <Link href={`/?query=${category?.toLowerCase()}`}>
                <p className="text-sm font-semibold">{category}</p>
            </Link>

            <button className="bg-black text-white text-sm font-semibold px-4 py-1 rounded-full cursro-pointer">
                <Link href={`/startup/${_id}`}>Details</Link>
            </button>
        </div>
    </li>
  )
}

export default StartupCard