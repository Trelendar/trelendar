import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import {
  useSession,
  signIn,
  signOut,
  getProviders,
  getSession,
  getCsrfToken,
} from 'next-auth/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Layout from '../../components/auth/Layout';
import Router from 'next/router';
import { toast, ToastContainer } from 'react-toastify';
import { authOptions } from '../api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';
import 'react-toastify/dist/ReactToastify.css';
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
const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});
interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  // console.log(Router.query.error);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values: LoginData) => {
      // console.log(values);
      const res = await signIn('credentials', { redirect: false }, { ...values });
      console.log(res);

      if (res.error) {
        toast.error(res.error);
        return;
      }
      Router.push('../');
    },
  });
  useEffect(() => {
    if (Router.query.error) {
      toast.error(Router.query.error);
      Router.push('login');
    }
  }, []);
  return (
    <Layout>
      <ToastContainer />
      <h1 className="text-green-700 text-xl font-medium mb-4 text-center">Login to trelendar</h1>
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

      <p className="text-center mb-4">OR</p>
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

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  return {
    props: {
      providers: await getProviders(),
      session: await getSession(context),
      csrfToken: await getCsrfToken(context),
    },
  };
};
export default Login;
