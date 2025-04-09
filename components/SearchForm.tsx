import Form from "next/form"
import SearchFormReset from "./SearchFormReset";
import { Search } from "lucide-react";

const SearchForm = ({query}: {query?: string}) => {

  return (
    <Form action='/' scroll={false} className="form bg-white w-2/3 h-[55px] outline-2 px-6 py-2 outline-black rounded-full flex justify-between items-center text-black"> 
        <input name="query" defaultValue={query} className="outline-none w-full h-full" placeholder="Search Startups"/>

        <div className="flex items-center gap-2">
            {query && <SearchFormReset/>}

            <button type="submit" className="size-10 bg-black text-white rounded-full text-center cursor-pointer flex justify-center items-center">
                <Search className="size-5"/>
            </button>
        </div>
    </Form>
  )
}

export default SearchForm