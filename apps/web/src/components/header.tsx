import { Link } from "@tanstack/react-router";
import { Code, Github } from "lucide-react";

export default function Header() {
  return (
    <header className="py-4">
      <nav className="container flex items-center justify-between sm:justify-around mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/" className="text-xl font-black flex items-center">
          <img src="/Logo-light.png" alt="Logo" className="w-20" />
          <span>Grammar Hero</span>
        </Link>
        <ul className="flex items-center gap-8 px-1">
          <li title="My GitHub profile">
            <a target="_blank" href="https://github.com/Zaccal">
              <Github />
            </a>
          </li>
          <li title="Source Code">
            <a target="_blank" href="https://github.com/Zaccal">
              <Code />
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
