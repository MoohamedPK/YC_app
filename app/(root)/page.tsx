import SearchForm from "@/components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { STARTUP_QEURIES } from "@/sanity/lib/queries";

import { StartupTypeCard } from "@/components/StartupCard";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
// import { auth } from "@/auth";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {  

  const query = (await searchParams).query;
  const params = {search: query || null};

  // this allow to revalidate this page whenever new changes are made
  const {data: dumyPost } = await sanityFetch({query: STARTUP_QEURIES, params});

  // const session = await auth();

  return (
    <>
      <section className="pink-container"> 
        <h1 className="pink-container-header">pitch your startup,<br/>connect with entrepreneurs</h1>
        <p className="pink-container-para">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae placeat est quo! Est, autem eligendi?</p>

        <SearchForm query={query}/>
      </section>


      <section className="section-container">
        <p className="text-2xl font-semibold">
          {query ? `Search result for "${query}" ` : "All Startups"}
        </p>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
          {dumyPost.length > 0 ? dumyPost.map((post:StartupTypeCard) => ( <StartupCard key={post._id} post={post}/> )) : (
            <p className="uppercase text-lg font-semibold">No startups found ):</p>
          )}
        </ul>
      </section>

      <SanityLive/>
    </>
  );
}
