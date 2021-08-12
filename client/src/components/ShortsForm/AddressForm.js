import React from 'react';
import { ErrorMessage, Formik } from 'formik';

import { useSelector } from 'react-redux';
import { checkTokenAuthenticated } from '../../helpers';
import { addressSchema } from '../../helpers';
import { Form, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addShortUrl } from '../../store/actions/shortenerActions';
import ButtonLoader from '../../StylesComponents/ButtonLoader';
const AddressForm = () => {
  checkTokenAuthenticated();

  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth.user);
  const { error } = useSelector((state) => state.shorts);
  const handleSubmit = (values) => {
    dispatch(addShortUrl(values, id));
  };
  return (
    <Formik
      onSubmit={(values) => {
        handleSubmit(values);
      }}
      initialValues={{ destination: '' }}
      validationSchema={addressSchema}
    >
      {({
        handleSubmit,
        handleChange,

        values,
        touched,
        errors,
      }) => (
        <Col xs={12} md={8}>
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Control
              type='text'
              name='destination'
              placeholder='http://'
              value={values.destination}
              onChange={handleChange}
            />

            <Form.Control.Feedback className='mb-1 text-danger'>
              {error}
            </Form.Control.Feedback>
            {errors.destination && touched.destination && (
              <ErrorMessage name='destination' />
            )}

            <Col className='d-grid gap-1 mt-4'>
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
export default AddressForm;
