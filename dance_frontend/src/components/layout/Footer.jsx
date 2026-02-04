import React from 'react';
import { Link } from 'react-router-dom';
import { textVariants } from '../../styles/designSystem';

function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className={`${textVariants.label.base} ${textVariants.body.xs}`}>
            © 2024 Πανεπιστημιακός Πολιτιστικός Όμιλος "Τέχνης Κίνηση". All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="#" className={`${textVariants.label.base} hover:text-primary-600 transition-colors`}>
              Privacy Policy
            </Link>
            <Link to="#" className={`${textVariants.label.base} hover:text-primary-600 transition-colors`}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;