import RadioButton from './RadioButton';
import ImageForm from './ImageForm';
import React, { useState } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import AddressForm from './AddressForm';
const ShortsForm = () => {
  const [radioValue, setRadioValue] = useState('1');
  let radioTitle = radioValue === '1' ? 'Generate Image' : 'Generate Address';

  return (
    <Container fluid className='p-0 m-0'>
      <Row className='mt-2 d-flex justify-content-center '>
        <Col
          style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px' }}
          xs={12}
          md={8}
          className='mb-4 pb-3 pt-4 d-flex flex-column align-items-center'
        >
          <RadioButton radioValue={radioValue} setRadioValue={setRadioValue} />
          <h3 className='pt-0 pb-3'>{radioTitle} Shortener</h3>
          {radioValue === '1' ? (
            <ImageForm />
          ) : (
            radioValue === '2' && <AddressForm />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ShortsForm;
