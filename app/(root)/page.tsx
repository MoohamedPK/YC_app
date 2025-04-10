import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {  

  const query = (await searchParams).query;

  const dumyPost = [{
    _id: 1,
    createdAt: new Date(),
    views: 20,
    author: {
      id:1,
      name: "mohamed"
    },
    category: "robots",
    title: "Wr robots",
    description: "this is description",
    image: "https://images.unsplash.com/photo-1563207153-f403bf289096?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  }]

  return (
    <>
      <section className="bg-pink-600 px-6 py-4 flex flex-col justify-center items-center space-y-8 min-h-[380px] text-center"> 
        <h1 className="bg-black text-white text-4xl uppercase font-semibold px-6 py-4 leading-13">pitch your startup,<br/>connect with entrepreneurs</h1>
        <p className="capitalize font-semibold text-sm text-white">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae placeat est quo! Est, autem eligendi?</p>

        <SearchForm query={query}/>
      </section>


      <section className="mx-32 pt-12">
        <p className="text-2xl font-semibold">
          {query ? `Search result for "${query}" ` : "All Startups"}
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-12">
          {dumyPost.length > 0 ? dumyPost.map((post) => ( <StartupCard key={post._id} post={post}/> )) : (
            <p>No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
