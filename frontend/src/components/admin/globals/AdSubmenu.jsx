import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { nanoid } from "nanoid";

const AdSubmenu = ({ data }) => {
  const { pathname } = useLocation();
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  return (
    <>
      <li
        className={`w-full flex flex-row justify-start items-center p-2 gap-2 rounded-lg cursor-pointer hover:bg-card ${
          pathname.includes(data.name) ? "bg-card" : null
        }`}
        onClick={() => setSubMenuOpen(!subMenuOpen)}
      >
        <data.icon size={18} className="min-w-max" />
        <p className="flex-1 capitalize">{data.name}</p>
        <ChevronDown
          className={` ${subMenuOpen && "rotate-180"} duration-200 `}
        />
      </li>
      <motion.ul
        animate={
          pathname.includes(data.name) || subMenuOpen
            ? { height: "fit-content" }
            : { height: 0 }
        }
        className="flex h-0 flex-col pl-0 overflow-hidden"
      >
        {data.menus?.map((menu) => (
          <li key={nanoid()}>
            <NavLink
              to={menu.href}
              className={`w-full flex flex-row justify-start items-center p-2 gap-2 rounded-lg cursor-pointer hover:bg-card ${
                pathname === menu.href ? "bg-card" : null
              }`}
            >
              <p className="pl-6 text-muted-foreground text-xs font-medium tracking-widest capitalize">
                {menu.label}
              </p>
            </NavLink>
          </li>
        ))}
      </motion.ul>
    </>
  );
};
export default AdSubmenu;
