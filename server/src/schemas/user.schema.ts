import * as yup from 'yup';

export const createUserSchema = yup.object().shape({
  name: yup.string().required('name is required'),
  email: yup.string().email().required('please enter a valid email'),
  password: yup
    .string()
    .required('password is required')
    .min(5, 'Password is too short - should be 8 chars minimum.')
    .max(10, 'Password is too short - should be 8 chars minimum.'),
});

export const loginUserSchema = yup.object().shape({
  email: yup.string().email().required('please enter email'),
  password: yup.string().required('password is required'),
});
