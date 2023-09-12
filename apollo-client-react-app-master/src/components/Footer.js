import React from "react";

const Footer = () => {
  const copyrightYear = 2023;
  const developerName = "Nadeem";
  
  return (
    <footer className="text-center">
      <hr />
      <p>
        Copyright {copyrightYear} | {developerName}
      </p>
    </footer>
  );
};

export default Footer;
