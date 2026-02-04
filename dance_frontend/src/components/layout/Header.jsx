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
    <Navbar fluid rounded className="bg-primary-500">
      <NavbarBrand as={Link} to="/">
        <img
          src="src/assets/images/texnis_kinisi.jpg"
          className="mr-3 h-6 sm:h-9"
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
        <NavbarLink as={Link} to="/pages">
          Pages
        </NavbarLink>
        <NavbarLink as={Link} to="/classes">
          Classes
        </NavbarLink>
        <NavbarLink as={Link} to="/news">
          News
        </NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
}

export default Header;