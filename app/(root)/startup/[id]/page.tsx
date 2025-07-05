import { formateDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QEURIES } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it"
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import StartupCard, { StartupTypeCard } from "@/components/StartupCard";

const md = markdownit();
// export const experimental_ppr = true;

const page =  async({params}: {params: Promise<{id: string}>}) => {

    const id = (await params).id;

    // the parallel fetching to execute multiple asynchronous operations 
    const [post, {select: recommended}] = await Promise.all([
      client.fetch(STARTUP_BY_ID_QEURIES, {id}),
      client.fetch(PLAYLIST_BY_SLUG_QUERY, {slug: "recommended"})
    ])

    if(!post) return notFound()

    const parsedContent = md.render(post?.pitch || "");

  return (
    <>
        <section className="pink-container ">
          <p className="tag">{formateDate(post._createdAt)}</p>
          <h1 className="pink-container-header">{post.title}</h1>
          <p className="pink-container-para !w-1/2">{post.description}</p>
        </section>

        <section className="section-container">
          <Image width={1500} height={500} className="rounded-lg object-cover bg-black" src={post.image} alt="thumbnail" />


        <div className="flex justify-between items-center mt-10">
          <div className="flex justify-between items-center  space-y-5 gap-5">

            <div>
              <Link href={`/user/${post.author?._id}`}>
                <Image src={post.author.image} alt="avatar" width={64} height={64} className="rounded-full drop-shadow-lg"/>
              </Link>
            </div>

            <div>
              <p className="font-bold text-20-medium">{post.author.name}</p>
              <p className="font-semibold text-sm">@{post.author.username}</p>
            </div>
          </div>

          <p className="bg-pink-300 px-4 py-2 font-semibold rounded-full capitalize">{post.category}</p>
        </div>

        <h3 className="text-2xl font-bold my-8">Pitch Details</h3>
        {parsedContent ? (
          <article className="prose" dangerouslySetInnerHTML={{__html: parsedContent}} />
        ) : (
          <p className="font-semibold text-red-500 uppercase">No details provided</p>
        )}

        <hr className="mt-12"/>

        {recommended.length > 0 && (
          <div className="recommended">
            <p className="font-bold text-xl my-3">Recommended Startups</p>

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
              {recommended.map((startup: StartupTypeCard, index:number) => (
                <StartupCard key={index} post={startup}/>
              ))}
            </ul>
          </div>
        )}

        {/* WHENEVER WE WANT TO USE A DYNAMIC COMPONENT WE SHOULD WRAP IT IN A SUSPENSE COMPO */}
        <Suspense fallback={<Skeleton/>}>
          <View id={id}/>
        </Suspense>
        </section>
    </>
  )
}

export default page