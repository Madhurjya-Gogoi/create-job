import React, { useState } from 'react';
import Logo from '../../assets/logo.png';
import Button from '../button';
import MultiStepForm from '../../pages/form';
import { useHistory, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const history = useHistory();
  const location = useLocation();

  const handleOpen = () => {
    setIsModalOpen(true);
  };

  const handleClosed = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="bg-white p-2 fixed top-0 left-0 w-full px-5 md:px-16 z-50">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src={Logo}
            alt="Logo"
            className="h-11 w-11 mr-10 cursor-pointer"
            onClick={() => history.push('/')}
          />
          {location.pathname !== '/error' && (
            <Button variant="outline" onClick={handleOpen}>
              Create job
            </Button>
          )}
        </div>
        <div className="flex items-center"></div>
      </div>{' '}
      {isModalOpen && <MultiStepForm isOpen={isModalOpen} onClose={handleClosed} />}
    </nav>
  );
};

export default Navbar;
