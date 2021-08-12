import React, { useEffect } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap-button-loader';
import { useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import ResultsTable from '../../components/ResultsTable';
import { getUserShorts } from '../../store/actions/shortenerActions';

const HomePage = () => {
  const { isAuth, name } = useSelector((state) => state.auth.user);
  const { id } = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) dispatch(getUserShorts(id));
  }, []);
  return (
    <Container fluid='xxl'>
      <Row>
        <Col xs={12} className='pt-5 d-flex flex-column align-items-center'>
          {!isAuth && (
            <p>
              <h2 className=' pb-3 text-primary'>Welcome To ShortenerUrl </h2>
              <LinkContainer style={{ cursor: 'pointer' }} exact to='/login'>
                <span className='text-primary bold'>Login </span>
              </LinkContainer>
              or
              <LinkContainer style={{ cursor: 'pointer' }} exact to='/register'>
                <span className='text-primary bold'> Sign Up </span>
              </LinkContainer>
              <span> to manage all your short links </span>
            </p>
          )}
          {isAuth && (
            <>
              <h2 className='text-primary'>
                Hi {name},Welcome To ShortenerUrl{' '}
              </h2>

              <LinkContainer
                className='mt-4'
                size='lg'
                variant='success'
                to='/admin'
              >
                <Button>Upload new shortener</Button>
              </LinkContainer>
              <Col className='text-right'>
                <h4 className='text-primary pt-5 pb-0 mb-0'>
                  Your Shorteners Table:
                </h4>
              </Col>
            </>
          )}
        </Col>
      </Row>

      <Row>
        <Col>{isAuth && <ResultsTable />}</Col>
      </Row>
    </Container>
  );
};
export default HomePage;
