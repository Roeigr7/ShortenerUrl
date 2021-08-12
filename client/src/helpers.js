import * as yup from 'yup';
import { string } from 'yup/lib/locale';

export const imageSchema = yup.object().shape({
  imageFile: yup.mixed().required('File is required'),
});

export const addressSchema = yup.object().shape({
  destination: yup
    .string()
    .url('Must be a valid URL')
    .required('Destination is required'),
});
export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('Please enter email')
    .email('Must be valid email'),
  password: yup.string().required('Password is required').max(10).min(6),
});
export const registerSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup
    .string()
    .required('Please enter email')
    .email('Must be valid email'),
  password: yup.string().required('Password is required').max(10).min(6),
});

/////is auth token to send headers

export const checkTokenAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  } else {
    const name = 't' + '=';
    const cDecoded = decodeURIComponent(document.cookie); //to be careful
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach((val) => {
      if (val.indexOf(name) === 0) res = val.substring(name.length);
    });

    return res;
  }
};
