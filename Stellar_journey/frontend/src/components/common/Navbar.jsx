import { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { useWallet } from "../../hooks/useWallet";

import Logo from "./Logo";
import Button from "../ui/Button";
import Container from "./Container";

const links = [
  { name: "Home", path: "/" },
  { name: "Explore", path: "/explore" },
  { name: "Create", path: "/create" },
  { name: "Dashboard", path: "/dashboard" },
];

export default function Navbar() {
const {
    publicKey,
    balance,
    connected,
    connect,
} = useWallet();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <Container>
        <div className="flex h-20 items-center justify-between">

          <Logo />

          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `transition ${
                    isActive
                      ? "text-teal-400"
                      : "text-slate-300 hover:text-white"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:block rounded-full">
            <Button onClick={connect} className="connect">
              {publicKey
                ? `${publicKey.slice(0, 4)}...${publicKey.slice(-4)}`
                : "Connect Wallet"}
            </Button>
          </div>

          <button
            className="text-3xl md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>

        </div>

        {open && (
          <div className="space-y-4 border-t border-slate-800 py-6 md:hidden">

            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setOpen(false)}
                className="block text-lg text-slate-300 hover:text-teal-400"
              >
                {link.name}
              </NavLink>
            ))}

          </div>
        )}
      </Container>
    </header>
  );
}