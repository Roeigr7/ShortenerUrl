import React, { useState } from 'react';
import moment from 'moment';
import { Table, Col, Row, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Options from '../Options';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import ButtonLoader from '../../StylesComponents/ButtonLoader';
import { Check } from 'react-bootstrap-icons';
import { updateShortUrl } from '../../store/actions/shortenerActions';
const ResultsTable = () => {
  const { shorts, error } = useSelector((state) => state.shorts) || [];
  const [clientError, setClientError] = useState(false);
  const dispatch = useDispatch();
  const [editingText, setEditingText] = useState('');
  const [edit, setEdit] = useState(2);
  const handleRedirectDestination = async (shortUrl, idx) => {
    try {
      await axios.get(`http://localhost:4000/${shortUrl}`, {
        withCredentials: true,
      });
      setClientError(false);
    } catch (error) {
      setClientError(error?.message || error?.response?.data?.error);
    }
    // window.location.replace(shorts[idx].destination);///if user not set to open new window.
    window.open(shorts[idx].destination, '_blank');

    dispatch({ type: 'INCREMENT_CLICK', payload: shortUrl });
  };
  const handleUpdate = (index) => {
    if (editingText.length < 2) {
      return setClientError('at least two digits please');
    } else {
      setEdit(false);
      setClientError(false);
      dispatch(updateShortUrl(shorts[index], editingText));
      setEditingText('');
    }
  };
  return (
    <Container className='pb-5 p-0 m-0' fluid='xxl'>
      <Row className='d-flex flex-column align-items-center'>
        <Col xs={12}>
          {(error || clientError) && (
            <p style={{ fontWeight: 'bold', fontSize: '18px', color: 'red' }}>
              "error:" {clientError || error}
            </p>
          )}
        </Col>
        <Col xs={12}>
          <Table size='sm' striped bordered responsive hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Clicks</th>
                <th>Short Url</th>
                <th>Original Url</th>
                {!edit && edit !== 0 && <th>Admin Name</th>}
                {!edit && edit !== 0 && <th>date</th>}
                <th>options</th>
              </tr>
            </thead>
            <tbody>
              {shorts &&
                shorts.map((item, idx) => (
                  <tr key={item._id}>
                    <td>{idx}</td>
                    <td>{item?.clicks}</td>

                    {edit === idx && (
                      <td>
                        <input
                          placeholder='shortUrl'
                          type='text'
                          onChange={(e) => setEditingText(e.target.value)}
                          value={editingText}
                        />
                        <ButtonLoader
                          color='success'
                          onClick={() => handleUpdate(idx)}
                        >
                          <Check color='white' size={16} />
                        </ButtonLoader>
                      </td>
                    )}
                    {edit !== idx && (
                      <td
                        style={{
                          cursor: 'pointer',
                          fontWeight: 'bold',
                          textDecoration: 'underline',
                        }}
                        onClick={() =>
                          handleRedirectDestination(item.shortAddress, idx)
                        }
                      >
                        {item?.shortAddress}
                      </td>
                    )}

                    <td>{item?.destination}</td>
                    {!edit && edit !== 0 && (
                      <>
                        <td>{item?.owner?.name}</td>

                        <td>{moment(item.createdAt).format('DD/MM/YYYY')}</td>
                      </>
                    )}
                    <td>
                      <Options
                        edit={edit}
                        setEdit={setEdit}
                        shortUrl={shorts}
                        index={idx}
                      />
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ResultsTable;
