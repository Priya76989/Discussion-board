import React from "react";

const Navbar = () => {
  const showCopyright = () => {
    alert("Copyright © 2025 Priya. All Rights Reserved.");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#home">Priya</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#hero">Hero Section</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#three-column">Three-Column Section</a>
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={showCopyright}>
                Copyright
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
