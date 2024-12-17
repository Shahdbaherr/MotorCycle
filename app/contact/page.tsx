import ContactForm from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ContactUs",
  description: "Tell us what you want!",
};
export default function contact() {
  return (
    <>
      <ContactForm />
    </>
  );
}
