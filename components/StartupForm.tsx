"use client"

import { useState, useActionState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { createPitch } from "@/lib/actions";
import {useRouter} from "next/navigation";

const StartupForm = () => {

    const [errors, setErrors] = useState<Record <string, string>>({}); // in order to know that it contains many strings within this obj
    const [pitch, setPitch] = useState("**Hello world!!!**");
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleFormSubmit = async (prevState: any, formData: FormData) => {
        try {
            const formValues = {
                title: formData.get('title') as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get('link') as string,   
                pitch
            }

            // using formSchema to validate the form values
            await formSchema.parseAsync(formValues)
            
            const result = await createPitch(prevState, formData, pitch);

            if(result.state === "SUCCESS") {
                router.push(`/startup/${result._id}`)
            }

        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorFields = error.flatten().fieldErrors;

                setErrors(errorFields as unknown as Record<string, string>);

                return {...prevState, error: "Validation faild", status: "ERROR"}
            }

            // if it isn't an error of instanceof zod, 
            return {...prevState, error: "unxepected error has occured", status: "ERROR"};
        }
    }

    const [isPending, formAction] = useActionState(handleFormSubmit, {error: "", state: "INITIAL"});
    
  return (
    <form action={formAction} className="section-container startup-form">
        <div>
            <label htmlFor="title" className="startup-form_label">Title</label>
            <Input id="title" name="title" placeholder="Startup title" className="startup-form_input"/>
            {errors.title && (
                <p className="startup-form_error">{errors.title}</p>
            )}
        </div>

        <div>
            <label htmlFor="description" className="startup-form_label">Description</label>
            <Textarea id="description" name="description" placeholder="Startup description" className="startup-form_textarea"/>
            {errors.description && (
                <p className="startup-form_error">{errors.description}</p>
            )}
        </div>

        <div>
            <label htmlFor="category" className="startup-form_label">Category</label>
            <Input id="category" name="category" placeholder="Startup category (Tech,Health,Education...)" className="startup-form_input"/>
            {errors.category && (
                <p className="startup-form_error">{errors.category}</p>
            )}
        </div>

        <div>
            <label htmlFor="link" className="startup-form_label">Image URL</label>
            <Input id="link" name="link" placeholder="Startup image URL" className="startup-form_input"/>
            {errors.link && (
                <p className="startup-form_error">{errors.link}</p>
            )}
        </div>

        <div data-color-mode='light'>
            <label htmlFor="pitch" className="startup-form_label">Pitch</label>
            <MDEditor value={pitch} onChange={(value) => setPitch(value as string)} id="pitch" preview="edit" height={300} style={{borderRadius: 20, overflow: "hidden"}} className="startup-form_input"
                textareaProps={{
                    placeholder: "Briefly describe your idea and what problem it solves"
                }}
                previewOptions={{
                    disallowedElements: ["style"]
                }}
                />
            {errors.pitch && (
                <p className="startup-form_error">{errors.pitch}</p>
            )}
        </div>

        <Button type="submit" disabled={isPending} className="startup-form_btn text-white cursor-pointer">
            {isPending ? "Submitting..." : "Submit your startup"}
            <Send className="size-6 ml-2"/>
        </Button>
    </form>
  )
}

export default StartupForm