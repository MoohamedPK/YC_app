"use client";
import {X} from "lucide-react"

import Link from "next/link";

const SearchFormReset = () => {

    const handleReset = () => {
        const form = document.querySelector(".form") as HTMLFormElement

        if (form) form.reset();
    }
    
  return (
    <>
        <button type="reset" className="size-10 bg-black text-sla text-white rounded-full text-center cursor-pointer" onClick={handleReset}>
          <Link href='/' className="flex justify-center items-center">
            <X className="size-5"/>
          </Link>
        </button>
    </>
  )
}

export default SearchFormReset