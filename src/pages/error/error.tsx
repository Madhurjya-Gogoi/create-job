import React from 'react';
import { Button, Label } from '../../components';
import { ErrorSvg } from '../../assets';
import { useHistory } from 'react-router-dom';

const Error = () => {
  const history = useHistory();
  return (
    <div className="h-screen flex items-center justify-center bg-gray">
      <div className="flex flex-col items-center gap-5">
        <ErrorSvg className="w-28 h-28 text-center" />
        <Label className="text-center text-xl text-dark font-sans">
          Oops, something went wrong. Please try again later.
        </Label>
        <Button onClick={() => history.push('/')}>Go Home</Button>
      </div>
    </div>
  );
};

export default Error;
