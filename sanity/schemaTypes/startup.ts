import { defineField, defineType } from "sanity";


export const startup = defineType({
    name: "startup",
    title: "Startup",
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
            name: "author",
            type: "reference",
            to: {type: "author"}
        }),
        defineField({
            name: "views",
            type: "number"
        }),
        defineField({
            name: "description",
            type: "text"
        }),
        defineField({
            name: "category",
            type: "text",
            validation: (Rule) => Rule.min(2).max(20).required().error("please enter a category")
        }),
        defineField({
            name: "image",
            type: "url",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "pitch",
            type: "markdown"
        }),
    ],

})