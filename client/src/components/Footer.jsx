import React from "react";
import "@/styles/Footer.css"; // Импорт стилей из "../styles/"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-description">
          Добро пожаловать на наш сайт! Здесь вы найдете актуальные события и сможете сделать свой выбор.
        </p>
        <div className="footer-links">
          <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="footer-link">
            Наш сайт
          </a>
          <a href="mailto:contact@yourwebsite.com" className="footer-link">
            Напишите нам
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
