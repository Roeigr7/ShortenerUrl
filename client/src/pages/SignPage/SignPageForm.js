import { ErrorMessage, Formik } from 'formik';
import React from 'react';
import { Col, Row, Container, Form, Button } from 'react-bootstrap';
import { loginSchema, registerSchema } from '../../helpers';
import { useDispatch, useSelector } from 'react-redux';
import { sign } from '../../store/actions/authActions';
import { Link, useLocation } from 'react-router-dom';
const LoginPage = () => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const loginPage = pathname === '/login' ? true : false;
  const handleSubmit = (values) => {
    const url = loginPage ? 'login' : 'register';
    dispatch(sign(url, values));
  };
  return (
    <Container
      md={8}
      style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
      className='mt-4'
    >
      <Row className='d-flex justify-content-center'>
        <Col md={8} xs={12}>
          <h1 className='m-3 py-2 text-light bg-primary'>
            {loginPage ? 'Login' : 'Sign Up'}
          </h1>
        </Col>
      </Row>
      <Row className='d-flex align-items-center justify-content-center'>
        <Col md={8} xs={12} className='p-3'>
          <Formik
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            initialValues={{ email: '', name: '', password: '' }}
            validationSchema={loginPage ? loginSchema : registerSchema}
          >
            {({ handleSubmit, values, handleChange }) => (
              <Form noValidate onSubmit={handleSubmit}>
                {!loginPage && (
                  <Form.Group className='mb-3'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='name'
                      placeholder='Enter name'
                      name='name'
                      value={values.name}
                      onChange={handleChange}
                    />
                    <p style={{ fontSize: '16px', color: 'red' }}>
                      <ErrorMessage name='name' />
                    </p>
                  </Form.Group>
                )}

                <Form.Group className='mb-3'>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type='email'
                    placeholder='Enter email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                  />
                  <p style={{ fontSize: '16px', color: 'red' }}>
                    <ErrorMessage name='email' />
                  </p>
                </Form.Group>

                <Form.Group className='mb-3'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='password'
                    placeholder='Enter password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                  />
                  <p style={{ fontSize: '16px', color: 'red' }}>
                    <ErrorMessage name='password' />
                  </p>
                </Form.Group>
                <h1 style={{ color: 'red', fontSize: '16px' }}>{error}</h1>
                <Button className='px-5' variant='primary' type='submit'>
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
          <Link to={loginPage ? '/register' : '/login'}>
            <h6 className='pt-3 text-primary'>
              Dont have an accout ? Sign Up now
            </h6>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
