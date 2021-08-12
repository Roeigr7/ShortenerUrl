import React, { useState } from 'react';
import notFoundImage from '../assets/404.jpg';
const NotFoundPage = ({}) => {
  return (
    <div>
      <img
        src={notFoundImage}
        style={{ width: '100%', height: 'auto' }}
        alt='not found'
      />
    </div>
  );
};
export default NotFoundPage;
