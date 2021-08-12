import React from 'react';
import { ToggleButton, Col, ButtonGroup } from 'react-bootstrap';

const radioList = [
  { name: 'Upload Image', value: '1' },
  { name: 'Generate Address', value: '2' },
];

const RadioButton = ({ radioValue, setRadioValue }) => {
  const setRadio = (e) => {
    setRadioValue(e.currentTarget.value);
  };
  return (
    <Col className='mb-4'>
      <ButtonGroup>
        {radioList.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type='radio'
            variant={'outline-dark'}
            name='radio'
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={setRadio}
          >
            {radio.name}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Col>
  );
};
export default RadioButton;
