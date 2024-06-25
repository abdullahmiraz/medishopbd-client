import React from "react";
import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { FiAirplay } from "react-icons/fi";

const Footer = () => {
  return (
    <div className="mt-12">
      <footer className="footer footer-center p-10 bg-cyan-800 text-primary-content">
        <aside>
          <FiAirplay size={52} />
          <p className="font-bold">
            MediShopBD <br />
            Dhaka, Bangladesh
          </p>
          <p>Copyright © 2024 - All right reserved</p>
        </aside>
        <nav>
          <div className="grid grid-flow-col gap-4">
            <a>
              <FaTwitter size={24} />
            </a>
            <a>
              <FaYoutube size={24} />
            </a>
            <a>
              <FaFacebook size={24} />
            </a>
          </div>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
