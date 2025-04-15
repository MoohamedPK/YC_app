import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "./sanity/lib/client";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "./sanity/lib/queries";
import { write_client } from "./sanity/lib/write-client";


export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [GitHub],
    callbacks: {
        async signIn({user, profile })  {
            const existingUser = await  client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id});

            // check if the user is not exist then we create new one
            if (!existingUser) {
                await write_client.create({
                    _type: "author",
                    id: profile?.id,
                    name: user?.name,
                    username: profile?.login,
                    email: user?.email,
                    image: user?.image,
                    bio: profile?.bio || "",
                })
            }

            return true; // we return true to continue the sign in process
        },

        async jwt({token, account, profile}) {
            
            if (account && profile) {
                const user = await client.withConfig({useCdn: false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {id: profile?.id});

                token.id = user?._id
            }
            return token;
        },

        async session({session, token}) {
            Object.assign(session, {id: token.id});
            return session;
        }
    }
    
})