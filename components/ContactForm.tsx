"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
const INPUT = "INPUT";
const TEXTAREA = "TEXTAREA";

const initalFields = [
  {
    label: "Your Name*",
    component: INPUT,
    type: "text",
    name: "your-name",
    id: "full_name",
    validation_error: false,
    validation_message: "",
  },
  {
    label: "Your Phone*",
    component: INPUT,
    type: "number",
    name: "your-phone",
    id: "phone",
    validation_error: false,
    validation_message: "",
  },
  {
    label: "Your Message*",
    component: TEXTAREA,
    type: "text",
    name: "your-message",
    id: "message",
    validation_error: false,
    validation_message: "",
  },
];

const ContactForm = () => {
  const { theme } = useTheme();
  const backgroundColor = theme === "light" ? "#FFFFFF" : "#0E0B0B";
  const textColor = theme === "light" ? "#000000" : "#FFFFFF";

  const [fields, setFields] = useState<any>(initalFields);
  const [message, setMessage] = useState<any>(null);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    setFields(
      fields.map((field: { name: any }) => ({
        ...field,
        validation_error: false,
        validation_message: "",
      }))
    );

    const formData = new FormData(event.target);
    formData.append("_wpcf7_unit_tag", "aadf1fe");

    const reqOptions = {
      method: "POST",
      body: formData,
    };

    const req = await fetch(
      `https://dashboard.maator.com/wp-json/contact-form-7/v1/contact-forms/155/feedback`,
      reqOptions
    );
    const res: any = await req.json();

    if (!res) return alert("an expected error occured");

    if (res.invalid_fields && res.invalid_fields.length > 0) {
      return setFields(
        fields.map((field: { name: any }) => {
          const error = res.invalid_fields.find(
            (x: { field: any }) => x.field === field.name
          );

          return {
            ...field,
            validation_error: error ? true : false,
            validation_message: error ? error.message : "",
          };
        })
      );
    }

    setMessage(res.message);
  };

  // Clear the message after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage(""); // Clear message
      }, 5000);

      return () => clearTimeout(timer); // Cleanup timeout if the component is unmounted or updated
    }
  }, [message]);

  return (
    <div>
      <div
        className="text-white flex items-center justify-center w-full mt-[12vh] mb-[12vh]"
        style={{
          backgroundColor,
          color: textColor,
        }}
      >
        <div className="flex flex-col lg:flex-row w-full h-auto  overflow-hidden">
          {/* Form Section */}
          <div className="w-full lg:w-2/5 px-6 md:px-12 lg:px-16 py-8 bg-[#252C33] flex flex-col justify-center">
            <h1 className="text-5xl !font-bold md:text-4xl text-white">
              Get in
              <span className="text-[#DD5471]">Touch</span>
            </h1>
            <p className="text-gray-300 mt-2 mb-6">
              Our team is always available to assist you. Contact us whenever
              you want!
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {fields.map((field: any) => (
                <div key={field.id} className="main-btn-wrap mt-6">
                  <label
                    htmlFor="Name"
                    className="block font-bold text-[#DD5471]"
                  >
                    {field.label}
                  </label>
                  {field.component === INPUT && (
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.name
                        .split("-")
                        .map(
                          (word: string) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                      id={field.id}
                      className="w-full p-3 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:border-[#DD5471] placeholder-gray-400"
                    />
                  )}
                  {field.component === TEXTAREA && (
                    <textarea
                      name={field.name}
                      id={field.id}
                      rows={4}
                      className="form-control mt-1 block w-full px-4 py-2 rounded-3xl border border-gray-300 bg-transparent outline-none focus:border-[#DD5471]"
                    ></textarea>
                  )}
                  {field.validation_error && (
                    <div className="text-base text-red-600">
                      {field.validation_message}
                    </div>
                  )}
                </div>
              ))}

              <button
                type="submit"
                className="w-full bg-[#DD5471] py-3 text-white font-bold rounded-md hover:opacity-90 transition duration-300"
              >
                SEND
              </button>
              {message && (
                <div className="mt-4 p-3 rounded-md text-green-600">
                  {message}
                </div>
              )}
            </form>

            <div className="flex items-center space-x-6 mt-8 text-gray-300">
              <div>
                <p className="text-sm font-semibold">PHONE</p>
                <p className="text-[#DD5471] text-lg">03 5432 1234</p>
              </div>
              <div>
                <p className="text-sm font-semibold">EMAIL</p>
                <p className="text-[#DD5471] text-lg">info@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-3/5 flex">
            <div
              className="w-full"
              style={{
                background: `linear-gradient(89.83deg, #252C33 10.53%, rgba(37, 44, 51, 0) 49.48%), 
                url('/contact.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
