/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { submitForm } from "@/app/actions";
import { LoaderCircle, Mail } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'
import { Button } from "../ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useActionState, useEffect } from "react";
import { toast } from "../ui/toast";

const initialState = {
  status: "idle",
  submissionId: "",
  error: {
    name: [],
    email: [],
    message: [],
  },
}

export default function ContactMe() {

  function showToast() {
    toast.add({
      type: "success",
      title: "Message Sent!",
      description: "You will be contacted shortly. Thank you for reaching out.",
    })
  }

  function showErrorToast() {
    toast.add({
      type: "error",
      title: "An Error Occurred",
      description: "Unable to save your message. Please try again later.",
    })
  }

  const [state, formAction, isSubmitting] = useActionState(submitForm, initialState);

  useEffect(() => {
    if (state.status === "success") {
      showToast();
    } else if (state.status === "db-error") {
      showErrorToast();
    }
  }, [state.submissionId]);

  return (
    <div id="contact-me" className="relative flex flex-col md:flex-row xl:items-start items-start justify-start xl:justify-between bg-gray-50 dark:bg-background border border-border rounded-lg p-8 xl:mx-48 mx-8 my-16">
      <div className="flex flex-col">
        <div className="text-md text-muted-foreground uppercase">Get In Touch</div>
        <div className="text-3xl font-bold text-foreground">Let&apos;s Work Together</div>
        <div className="text-lg text-muted-foreground max-w-xl mt-2">
          I&apos;m always open to new opportunities, interesting projects, and collaborations. Feel free to reach out <br />-I&apos;d love to hear from you! 
        </div>
        <div className="flex flex-col gap-4 mt-4 ml-4">
          <div className="flex flex-row gap-4 items-center"><Mail size={20} /> <a href="mailto:sepehrazizi13@gmail.com" className="text-muted-foreground hover:text-primary transition-colors">
            sepehrazizi13@gmail.com
          </a></div>
          <div className="flex flex-row gap-4 items-center"><FontAwesomeIcon className="max-w-5" size="lg" icon={faSquareLinkedin} /> <a href="https://www.linkedin.com/in/sepehr-azizi-586382126/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            linkedin.com/in/sepehr-azizi-586382126/
          </a></div>
          <div className="flex flex-row gap-4 items-center"><FontAwesomeIcon className="max-w-5" size="lg" icon={faGithub} /> <a href="https://github.com/Sepehr13/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
            github.com/Sepehr13/
          </a></div>
        </div>
      </div>
      <form action={formAction} className="flex flex-col gap-4 mt-8 md:mt-0 w-full max-w-lg">
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="name">Full name</FieldLabel>
            <Input id="name" type="text" name="name" autoComplete="off" placeholder="Your Name" required />
            {state?.status === "error" && state?.error?.name?.length && (
              <FieldError>{state?.error?.name.join(", ")}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input id="email" type="email" name="email" autoComplete="off" placeholder="Your Email" required />
            {state?.status === "error" && state?.error?.email?.length && (
              <FieldError>{state?.error?.email.join(", ")}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel htmlFor="message">
              Message
            </FieldLabel>
            <Textarea
              id="message"
              name="message"
              required
              placeholder="Your Message"
              className="resize-none"
            />
            {state?.status === "error" && state?.error?.message?.length && (
              <FieldError>{state?.error?.message.join(", ")}</FieldError>
            )} 
          </Field>
        </FieldGroup>
        <Button size="lg" type="submit" className="py-5 text-md" disabled={isSubmitting}>
          {isSubmitting && <LoaderCircle size={28} className="animate-spin" />}
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>
    </div>
  );
}