import React, { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { close, menu } from "../assets";
import logo from "../assets/logoNuevoTrans.png";
import logo2 from "../assets/logo.png";
import sagrilaft from "../assets/sagrilaft.png";
import organigrama from "../assets/organigrama.jpg";
import local from "../assets/local.jpg";
import "./Navbar.css";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  // Rutas actualizadas
  const linkRoutes = {
    Home: { path: "/", external: false },
    Sagrilaft: {
      path: "/legal.pdf",
      external: true,
    },
    Organigrama: {
      path: "",
      external: false,
      action: () => {
        Swal.fire({
          title: "Organigrama de ACTIVOS DIGITALES S.A.S.",
          text: "Visualiza la estructura organizativa de nuestra empresa.",
          imageUrl: organigrama,
          imageWidth: window.innerWidth > 768 ? "90%" : "300px",
          imageAlt: "Organigrama",
          showCloseButton: true,
          showCancelButton: true,
          confirmButtonText: "Ver en Pantalla Completa",
          cancelButtonText: "Cerrar",
          reverseButtons: true,
        }).then((result) => {
          if (result.isConfirmed) {
            let img = new Image();
            img.src = organigrama;
            img.style.width = "90%";
            img.style.height = "auto";
            img.style.maxHeight = "100vh";
            img.onload = () => {
              let div = document.createElement("div");
              div.style.position = "fixed";
              div.style.left = "0";
              div.style.top = "0";
              div.style.width = "100%";
              div.style.height = "100vh";
              div.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
              div.style.zIndex = "9999";
              div.style.display = "flex";
              div.style.justifyContent = "center";
              div.style.alignItems = "center";
              div.appendChild(img);

              let closeButton = document.createElement("button");
              closeButton.innerText = "X";
              closeButton.style.position = "absolute";
              closeButton.style.top = "20px";
              closeButton.style.right = "20px";
              closeButton.style.zIndex = "10000";
              closeButton.style.background = "none";
              closeButton.style.border = "none";
              closeButton.style.color = "white";
              closeButton.style.fontSize = "30px";
              closeButton.style.cursor = "pointer";
              closeButton.addEventListener("click", () => {
                document.body.removeChild(div);
              });

              div.appendChild(closeButton);
              document.body.appendChild(div);
            };
          }
        });
      },
    },
    "Política de Datos": {
      path: "/tratamiento-de-datos.pdf",
      external: true,
    },
    "Preguntas Frecuentes": { path: "/preguntas", external: false },
    KYC: { path: "/kyc", external: false },
    Exchange: {
      path: "https://intermoneycambios.com/",
      external: true,
    },
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleLinkClick = (title, linkInfo) => {
    setActive(title);
    if (title === "Home") {
      scrollToTop();
    } else if (linkInfo.external) {
      window.open(linkInfo.path, "_blank");
    } else if (linkInfo.action) {
      linkInfo.action();
    }
  };

  const specialLinkStyle = "border-2 border-gold-500 rounded-lg p-1";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full flex py-6 items-center justify-center bg-black">
      <div className="flex items-center justify-between w-full max-w-7xl px-1">
        <div className="flex items-center">
          <img
            src={logo2}
            alt="Logo 2"
            className="w-[80px] h-[80px] sm:w-[100px] sm:h-[100px]"
          />
          <img
            src={logo}
            alt="Logo"
            className="w-[180px] h-[65px] sm:w-[220px] sm:h-[80px]"
          />
        </div>

        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {Object.entries(linkRoutes).map(([title, { path, external }], index) => (
            <li
              key={index}
              className={`font-poppins font-normal cursor-pointer text-[16px] ${
                active === title ? "text-white" : "text-dimWhite"
              } ${index === Object.keys(linkRoutes).length - 1 ? "mr-0" : "mr-10"} ${
                title === "Exchange" ? specialLinkStyle : ""
              }`}
              onClick={() => handleLinkClick(title, linkRoutes[title])}
            >
              {external ? (
                <a href={path} target="_blank" rel="noopener noreferrer">
                  {title}
                </a>
              ) : (
                <Link to={path}>{title}</Link>
              )}
            </li>
          ))}
        </ul>

        <div className="sm:hidden flex justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain"
            onClick={() => setToggle(!toggle)}
          />
        </div>

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex flex-col justify-end items-start flex-1">
            {Object.entries(linkRoutes).map(([title, { path, external }], index) => (
              <li
                key={index}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === title ? "text-white" : "text-dimWhite"
                } ${index === Object.keys(linkRoutes).length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => handleLinkClick(title, linkRoutes[title])}
              >
                {external ? (
                  <a href={path} target="_blank" rel="noopener noreferrer">
                    {title}
                  </a>
                ) : (
                  <Link to={path}>{title}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
