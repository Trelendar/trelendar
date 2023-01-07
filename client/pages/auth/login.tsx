import React, { useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaGithub } from 'react-icons/fa';
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
import BtnLogin from '../../components/auth/BtnLogin';

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
});

interface LoginData {
  email: string;
}

const Login = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async ({ email }: LoginData) => {
      const res = await signIn('email', { email, redirect: true });
      console.log(res);

      if (res.error) {
        toast.error(res.error);
        return;
      }
      await Router.push('../');
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
      <BtnLogin provider={'google'} icon={<FcGoogle size={25} />} />
      {/* <BtnLogin provider={'facebook'} icon={<FaFacebook size={25} color={'#17357B'} />} />
      <BtnLogin provider={'github'} icon={<FaGithub size={25} />} /> */}
      {/* <button onClick={() => signIn('email', { email: 'hoangkui2001@gmail.com' })}>ABC</button> */}

      <div className="w-full p-line bg-gray-300 my-8"></div>
      <div className="grid grid-cols-2 divide-x mb-2 ">
        {/* <div className="cursor-pointer text-cyan-600 hover:underline">Forgot password</div>
        <div className="cursor-pointer text-cyan-600 hover:underline">Sign up for an account</div> */}
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
