"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";

const StartupForm = () => {

    const [errors, setErrors] = useState<Record <string, string>>({}); // in order to know that it contains many strings within this obj
    const [pitch, setPitch] = useState("**Hello world!!!**");

    const isPending = false;

  return (
    <form action={() => {}} className="section-container startup-form">
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
            <MDEditor onChange={(value) => setPitch(value as string)} id="pitch" preview="edit" height={300} style={{borderRadius: 20, overflow: "hidden"}} className="startup-form_input"
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