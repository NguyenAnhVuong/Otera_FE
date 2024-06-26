import useTrans from "@/hooks/useTrans";
import { Icon } from "@iconify/react";
import Link from "next/link";

type FooterProps = {};

const Footer: React.FC<FooterProps> = ({}) => {
  const { localeText } = useTrans();

  const links = [
    {
      href: "/",
      label: localeText.footer.home,
    },
    {
      href: "/login",
      label: localeText.footer.login,
    },
    {
      href: "/register",
      label: localeText.footer.register,
    },
  ];

  return (
    <div className="h-80 relative bottom-0 left-0 grid grid-cols-1 sm:grid-cols-2 xl:px-32 xl:gap-16 lg:grid-cols-4 lg:pt-10 2xl:px-72 bg-[#232323] text-sm gap-8 px-8 pt-4 pb-48 mt-56 lg:pb-[448px]">
      <div>
        <h1 className="text-white mb-4 text-xl font-semibold">
          {localeText.footer.introduce}
        </h1>
        <p className="text-[#9f9f9f] text-justify">
          {localeText.footer.introduceContent}
        </p>
      </div>
      <div className="flex flex-col">
        <h1 className="text-white mb-4 text-xl font-semibold">
          {localeText.footer.link}
        </h1>
        {links.map((link, index) => (
          <Link
            className="text-[#9f9f9f] mb-3 flex items-center"
            href={link.href}
            key={index}
          >
            <Icon icon="material-symbols:play-arrow" />
            <span className="pl-4">{link.label}</span>
          </Link>
        ))}
      </div>

      <div>
        <h1 className="text-white mb-4 text-xl font-semibold">
          {localeText.footer.contact}
        </h1>
        <p className="text-[#9f9f9f] text-justify flex items-center mb-4">
          <Icon
            className="text-[28px] sm:text-2xl lg:text-5xl"
            icon="game-icons:position-marker"
          />
          <span className="pl-4 block">{localeText.footer.address}</span>
        </p>
        <p className="text-[#9f9f9f] text-justify flex items-center mb-4">
          <Icon className="text-lg" icon="ic:baseline-phone" />
          <span className="pl-4">0333944588</span>
        </p>
        <p className="text-[#9f9f9f] text-justify flex items-center mb-4">
          <Icon className="text-lg" icon="material-symbols:mail" />
          <span className="pl-4">navuong2001@gmail.com</span>
        </p>
      </div>
      <div>
        <h1 className="text-white mb-4 text-xl font-semibold">
          {localeText.footer.fanpage}
        </h1>
        <a
          target="blank"
          className='relative block h-32 bg-cover bg-no-repeat max-w-[280px] bg-[url("https://res.cloudinary.com/otera/image/upload/v1719327056/bkhn_bia_qvcki5.jpg")]'
          href="https://www.facebook.com/dhbkhanoi"
        >
          <div className="flex bg-gradient-to-b from-[#000000b3] to-transparent p-2">
            <div className="w-14 h-14 border-2 border-white">
              <img
                className="object-cover w-full h-full"
                src="https://res.cloudinary.com/otera/image/upload/v1719327169/bkhn_avatar_zagpe1.jpg"
                alt=""
              />
            </div>
            <div className="flex flex-col ml-2">
              <span className="text-white text-xl font-semibold text-shadow">
                Đại học Bách khoa Hà Nội
              </span>
              <span className="text-white text-sm text-shadow">333K likes</span>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 p-1 flex bg-[#ebedf0] border border-[#0000001f] items-center w-24 h-6">
            <Icon icon="logos:facebook" />
            <span className="text-black font-[550] text-sm ml-1">
              Like Page
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Footer;
