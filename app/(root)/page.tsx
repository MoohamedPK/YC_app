import SearchForm from "@/components/SearchForm";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>}) {  

  const query = (await searchParams).query;

  return (
    <>
      <section className="bg-pink-400 px-6 py-4 flex flex-col justify-center items-center space-y-5 min-h-[380px] text-center"> 
        <h1 className="bg-black text-white text-4xl uppercase font-semibold px-6 py-4 leading-13">pitch your startup,<br/>connect with entrepreneurs</h1>
        <p className="capitalize font-semibold text-sm ">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae placeat est quo! Est, autem eligendi?</p>

        <SearchForm query={query}/>
      </section>
    </>
  );
}
