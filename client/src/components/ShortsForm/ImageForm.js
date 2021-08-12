import React from 'react';
import { Formik } from 'formik';
import { Form, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addShortImage } from '../../store/actions/shortenerActions';
import ButtonLoader from '../../StylesComponents/ButtonLoader';

const ImageForm = () => {
  const { user } = useSelector((state) => state.auth);
  const { error } = useSelector((state) => state.shorts);
  const dispatch = useDispatch();
  const handleSubmit = (values) => {
    dispatch(addShortImage(user.id, values));
  };
  return (
    <Formik
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      initialValues={{ imageFile: '' }}
    >
      {({ setFieldValue, handleSubmit }) => (
        <Col xs={12} md={8}>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Control
              type='file'
              name='imageFile'
              onChange={(event) =>
                setFieldValue('imageFile', event.target.files[0])
              }
            />
            <p style={{ fontSize: '16px', color: 'red' }}>{error}</p>
            <Col xs={12} md={12} className='d-grid gap-1 mt-4'>
              <ButtonLoader color='primary' size='md' type='submit'>
                Generate Shortener !
              </ButtonLoader>
            </Col>
          </Form>
        </Col>
      )}
    </Formik>
  );
};
export default ImageForm;
