import { useFormik } from 'formik';
import React from 'react';
import Layout from '../../components/auth/Layout';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import { signIn } from 'next-auth/react';
interface LoginData {
  email: string;
  password: string;
}
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
export function PropsTextField(name: string) {
  return {
    id: `${name}`,
    name: name,
    label: `${capitalizeFirstLetter(name)}`,
  };
}
type Props = {};
const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});
const Signup = (props: Props) => {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values: LoginData) => {
      console.log(values);
      //   await signIn('credentials', { callbackUrl: '/' }, { ...values });
    },
  });
  return (
    <Layout>
      <h1 className="text-green-700 text-xl font-medium mb-4 text-center">
        Sign up for your account
      </h1>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ marginY: '0.5rem' }}
          fullWidth
          {...PropsTextField('email')}
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={{ marginY: '0.5rem' }}
          fullWidth
          {...PropsTextField('password')}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
          className="bg-green-500"
          sx={{ paddingY: '0.75rem', backgroundColor: 'rgb(34, 197, 94)' }}
        >
          Login
        </Button>
      </form>

      <div className="text-center mb-4">OR</div>
      <button
        className="flex justify-center bg-slate-50 mb-4  w-full hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow-md"
        onClick={() => {
          signIn('google');
        }}
      >
        <FcGoogle size={25} />
        <span className="justify-between ml-1">Continue to Google</span>
      </button>
      <button
        className="flex justify-center bg-slate-50  mb-4 w-full hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded shadow-md"
        onClick={() => {
          signIn('facebook');
        }}
      >
        <FaFacebook size={25} color={'#17357B'} />
        <span className="justify-between ml-1">Continue to Facebook</span>
      </button>
      <div className="w-full p-line bg-gray-300 my-8"></div>
      <div className="grid grid-cols-2 divide-x mb-2 ">
        <div className="cursor-pointer text-cyan-600 hover:underline">Forgot password</div>
        <div className="cursor-pointer text-cyan-600 hover:underline">Sign up for an account</div>
      </div>
    </Layout>
  );
};

export default Signup;
