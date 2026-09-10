import type { FC } from "react";
import { Link } from "react-router-dom";

const Footer: FC = () => {
  return (
    <>
      <footer className="main-footer z-50 border-t hidden sm:block">
        <ul className="flex md:flex-row flex-col items-center justify-center ">
          <li className="py-4 px-2">
            <Link
              className="text-gray-800 dark:text-white hover:text-base no-underline"
              to="/"
            >
              Help
            </Link>
          </li>
          <li className="py-4 px-2">
            <Link
              className="text-gray-800 dark:text-white hover:text-base no-underline"
              to="/"
            >
              Status
            </Link>
          </li>
          <li className="py-4 px-2">
            <Link
              className="text-gray-800 dark:text-white hover:text-base no-underline"
              to="/"
            >
              About
            </Link>
          </li>
          <li className="py-4 px-2">
            <Link
              className="text-gray-800 dark:text-white hover:text-base no-underline"
              to="/"
            >
              Careers
            </Link>
          </li>
          <li className="py-4 px-2">
            <Link
              className="text-gray-800 dark:text-white hover:text-base no-underline"
              to="/"
            >
              Press
            </Link>
          </li>
          <li className="py-4 px-2">
            <Link
              className="text-gray-800 dark:text-white hover:text-base no-underline"
              to="/"
            >
              Blog
            </Link>
          </li>
          <li className="py-4 px-2">
            <Link
              className="text-gray-800 dark:text-white hover:text-base no-underline"
              to="/"
            >
              Privacy
            </Link>
          </li>
          <li className="py-4 px-2">
            <Link
              className="text-gray-800 dark:text-white hover:text-base no-underline"
              to="/"
            >
              Terms
            </Link>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
