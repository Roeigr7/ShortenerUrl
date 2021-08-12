import React from 'react';
import { Trash, Pen } from 'react-bootstrap-icons';

import { Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteShortUrl } from '../../store/actions/shortenerActions';
import ButtonLoader from '../../StylesComponents/ButtonLoader';
const Options = ({ setEdit, shortUrl, index, edit }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteShortUrl(shortUrl[index]._id));
  };
  const handleEditOrNot = () => {
    if (index === edit) return setEdit(false);
    setEdit(index);
  };
  return (
    <Col className='p-0 d-flex justify-content-center'>
      <ButtonLoader color={'primary'} onClick={handleEditOrNot}>
        <Pen color='white' size={16} />
      </ButtonLoader>

      <ButtonLoader color='danger' onClick={handleDelete}>
        <Trash color='white' size={16} />
      </ButtonLoader>
    </Col>
  );
};

export default Options;
