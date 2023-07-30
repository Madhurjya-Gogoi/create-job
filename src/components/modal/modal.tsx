import React, { useRef } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';

type Props = {
  isOpen?: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  data?: any;
};

const Modal: React.FC<Props> = (props) => {
  const { isOpen = false, onClose = () => {}, children } = props;

  const node = useRef<HTMLDivElement | null>(null);

  useOutsideClick({
    isOpen: isOpen,
    node,
    onOutsideClick: onClose,
  });

  return (
    <div
      className={`fixed z-50 inset-0 overflow-y-auto ${
        isOpen ? 'block' : 'hidden'
      } w-full h-full bg-black bg-opacity-50`}
    >
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className={`relative mx-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className="modal-body" ref={node}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
