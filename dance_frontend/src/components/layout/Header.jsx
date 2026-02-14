import React from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle
} from "flowbite-react";
import { Link } from 'react-router-dom';

function Header() {
  return (
    <Navbar fluid rounded className="sticky top-0 z-50 bg-primary-500 px-6 sm:px-8 lg:px-12">
      <NavbarBrand as={Link} to="/">
        <img
          src="src/assets/images/texnis_kinisi.jpg"
          className="mr-3 h-16 sm:h-24 -my-2"
          alt="Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold text-white">
          Πανεπιστημιακός Πολιτιστικός Όμιλος "Τέχνης Κίνηση"
        </span>
      </NavbarBrand>

      <NavbarToggle />

      <NavbarCollapse>
        <NavbarLink as={Link} to="/">
          Home
        </NavbarLink>
        <NavbarLink as={Link} to="/classes">
          Classes
        </NavbarLink>
        <NavbarLink as={Link} to="/news">
          News
        </NavbarLink>
        <NavbarLink as={Link} to="/">
          Gallery
        </NavbarLink>
        <NavbarLink as={Link} to="/">
          About Us
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;