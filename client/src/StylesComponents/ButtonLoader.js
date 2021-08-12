import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import Button from 'react-bootstrap-button-loader';
const ButtonLoader = ({ children, onClick, color, type }) => {
  const [buttonLoading, setButtonLoading] = useState(false);
  const { loading } = useSelector((state) => state.shorts) || [];
  useEffect(() => {
    if (!loading) setButtonLoading(false);
  }, [loading]);

  const onButtonPress = () => {
    setButtonLoading(true);
    if (onClick) onClick();
  };

  return (
    <Button
      loading={loading && buttonLoading}
      className='mx-1'
      variant={color}
      type={type}
      onClick={onButtonPress}
    >
      {children}
    </Button>
  );
};
export default ButtonLoader;
