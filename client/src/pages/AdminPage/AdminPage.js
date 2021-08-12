import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import ResultsTable from '../../components/ResultsTable';
import ShortForm from '../../components/ShortsForm';

const AdminPage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col>
            <h1 className='m-3 py-2 text-primary bold'>SHORTENER URL</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <ShortForm />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row>
          <Col>
            <h1 className='m-3 py-2 text-light bold bg-success'>Your Shorts</h1>

            <ResultsTable />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default AdminPage;
