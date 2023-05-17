import { Button, FormControl, FormHelperText, FormLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from '../../lib/axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});
const initialValues = {
  email: '',
};

const CopyLink = ({ link, handleCloseModal }: { link: string; handleCloseModal: () => void }) => {
  const router = useRouter();
  const [isCopied, setIsCopied] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async ({ email }, { resetForm, setSubmitting }) => {
      setSubmitting(true);
      console.log(email, link);
      try {
        await axios.post(`board/${router.query.slug as string}/send-mail-invite`, {
          mail: email,
          link,
        });
      } catch (error) {
        Swal.fire('Some thing went wrong', '', 'error');
      }
      Swal.fire('Invited success', '', 'success');
      resetForm();
      // handleCloseModal();
      setSubmitting(false);
    },
  });
  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(link);
    setIsCopied(true);
  };

  return (
    <div className="flex flex-col items-center">
      <h2>Copy Link Invite</h2>
      <h3>Invite member to access board</h3>
      <button className="text-[#0c66e4]" onClick={handleCopyLink}>
        {isCopied ? 'Copied!' : 'Copy to Clipboard'}
      </button>
      <span className="mb-3 mt-10">Or enter the email to send the link</span>

      <form onSubmit={formik.handleSubmit} className="text-center">
        <FormControl
          fullWidth
          margin="normal"
          error={formik.touched.email && Boolean(formik.errors.email)}
        >
          <TextField
            id="email"
            name="email"
            type="email"
            variant="outlined"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <FormHelperText>{formik.touched.email && formik.errors.email}</FormHelperText>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" disabled={formik.isSubmitting}>
          Send
        </Button>
      </form>
    </div>
  );
};
export default CopyLink;
