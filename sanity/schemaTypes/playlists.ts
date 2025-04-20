import { defineField, defineType } from "sanity";

export const playlist = defineType({
    name: "playlist",
    title: "Playlists",
    type:"document",
    fields: [
        defineField({
            name: "title",
            type: "string"
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title" // define a slug from the title
            }
        }),
        defineField({
            name: "select",
            type: "array",
            of : [{type: "reference", to: [{type: "startup"}] }],
        }),
    ],

})