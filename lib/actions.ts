"use server";

import { auth } from "@/auth";
import { parsingServerActionResponse } from "./utils";
import slugify from "slugify"
import { write_client } from "@/sanity/lib/write-client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createPitch = async (state: any, formData: FormData, pitch:string) => {

    const session = await auth();

    if (!session) return parsingServerActionResponse({errro: "Please sign in", state: "ERROR"})

    const {title, description, category, link } = Object.fromEntries(
        Array.from(formData).filter(([key]) => key !== "pitch")
    )

    const slug = slugify(title as string, {lower: true, strict: true});

    try {
        
        const startup = {
            title,
            description,
            category,
            link,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: "reference",
                _ref: session?.id
            },
            pitch
        }

        const result = await write_client.create({_type: "startup", ...startup});
        
        return parsingServerActionResponse({...result, error: "", state: "SUCCESS"});

    } catch (error) {
        console.log("create pitch errro: ", error);
        return parsingServerActionResponse({error: JSON.stringify(error), state: "ERROR"})
    }
}