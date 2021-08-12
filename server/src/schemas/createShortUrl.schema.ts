import * as yup from 'yup';

const shortUrlSchema = yup.object().shape({
  destination: yup
    .string()
    .url('Must be a valid URL')
    .required('Destination is required!'),
});

export default shortUrlSchema;
