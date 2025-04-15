import { defineQuery } from "next-sanity";

export const STARTUP_QEURIES = defineQuery(`*[_type == "startup" && defined(slug.current)] | order(_createdAt desc) {
    
    _id,title,slug,_createdAt, author -> {_id, name, image, bio}, views, description, category, image
<<<<<<< Updated upstream
=======
    }`)

export const STARTUP_BY_ID_QEURIES = defineQuery(`*[_type == "startup" && _id == $id ][0] {
    
    _id,title,slug,_createdAt, author -> {_id, name, username, image, bio}, views, description, category, image, pitch
    }`)

export const STARTUP_VIEWS = defineQuery(`*[_type == "startup" && _id == $id ][0] {
        _id, views
    }`)

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`*[_type == "author" && _id == $id ][0] {
    _id,id,name,username,image,bio,email
>>>>>>> Stashed changes
    }`)