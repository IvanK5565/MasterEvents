import React from "react";
import "@/styles/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-description">
          Ласкаво просимо до нашого сайту! У нас Ви знайдете актуальні події та обрати те, що Вам до душі!
        </p>
        <div className="footer-links">
          <Link to="/" className="footer-link">
            Наш сайт
          </Link>
          <a href="mailto:example@example.com" className="footer-link">
            Напишіть нам
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
