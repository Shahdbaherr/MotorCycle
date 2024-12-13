
const footerData = {
  logo: {
    src: "/images/logo.png",
    alt: "logo",
  },
  socialLinks: [
    {
      href: "https://www.facebook.com",
      icon: "/icons/formkit_whatsapp.png",
      alt: "WhatsApp",
    },
    {
      href: "https://www.instagram.com/qwizeen/",
      icon: "/icons/ic_baseline-facebook.png",
      alt: "Facebook",
    },
    {
      href: "https://www.instagram.com/qwizeen/",
      icon: "/icons/mingcute_youtube-fill.png",
      alt: "YouTube",
    },
    {
      href: "https://www.instagram.com/qwizeen/",
      icon: "/icons/ant-design_instagram-filled.png",
      alt: "Instagram",
    },
  ],
  sections: [
    {
      title: "Location",
      items: [
        {
          text: "Maadi as Sarayat Al Gharbeyah, Cairo Governorate 11728",
        },
      ],
    },
    {
      title: "Home",
      items: [
        { text: "Motorcycle" },
        { text: "Videos" },
        { text: "Shooting" },
        { text: "Contact us" },
      ],
    },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#1B1919] text-white py-8 md:py-12">
      <div className="mx-auto px-10 lg:px-32">
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-6 lg:gap-0">
          {/* Logo and Social Links */}
          <div className="flex flex-col max-w-[550px] my-auto mt-4 md:items-start">
            <a href="/" aria-current="page" className="inline-block">
              <img
                src={footerData.logo.src}
                alt={footerData.logo.alt}
                className="w-[150px]"
              />
            </a>
            <div className="flex space-x-6 mt-6">
              {footerData.socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80"
                >
                  <img
                    src={link.icon}
                    alt={link.alt}
                    className="w-8 h-8"
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Dynamic Sections */}
          {footerData.sections.map((section, index) => (
            <div
              key={index}
              className="flex flex-col items-start max-w-[350px] my-auto mt-6"
            >
              <h2 className="font-medium text-2xl mb-6">{section.title}</h2>
              <div className="flex flex-col gap-4">
                {section.items.map((item, idx) => (
                  <span key={idx} className="text-lg md:text-[22px]">
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
