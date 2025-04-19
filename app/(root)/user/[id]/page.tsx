import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import { notFound } from "next/navigation";

const page = async ({params}: {params: Promise<{id: string}>}) => {

    const id = (await params).id;
    console.log("id is :", id);

    const session = await auth();

    const user = await client.fetch(AUTHOR_BY_ID_QUERY, {id});
    console.log(user)

    if (!user) return notFound();


  return (
    <section className="section-container flex justify-center items-center mt-10">
        <div className="bg-black p-8 space-y-4 rounded-lg shadow-xl shadow-neutral-950">

            <div className="bg-neutral-950 px-4 py-2 text-white rounded-lg w-fit mx-auto">
                <h3 className="text-2xl font-bold text-center">{user?.name}</h3>
            </div>

            <div className="flex flex-col items-center space-y-2 text-white">
                <Image src={user?.image} width={150} height={150} className="rounded-full" alt={user.name}/>
                <p>@{user?.username}</p>
                <p className="text-center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum quasi accusamus laudantium.</p>
            </div>
        </div>
    </section>
  )
}

export default page