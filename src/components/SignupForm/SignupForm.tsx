import React, { useState } from 'react';
import styles from './SignupForm.module.css';
import { toast } from 'react-toastify';
import api from '../../utils/api';

interface SignupFormType{
  setLogin: React.Dispatch<React.SetStateAction<boolean>>
}
const SignupForm = ({setLogin}:SignupFormType) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
  });

  const [dialogConfirmation, setDialogConfirmation] = useState<string>('');
  const [verifying, setVerifying] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.email.endsWith('@gmail.com')) {
      toast.error('Email should be valid gmail only');
      setErrors({
        ...errors,
        email: true,
      });
      return;
    }
    try {
      setLoading(true);
      const response = await api.post('/user/create', formData);
      setDialogConfirmation(response.data.token);  // Assuming token or confirmation URL is returned
    } catch (error) {
      console.error('Signup failed:', error);
      toast.error('Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }

    setErrors({
      email: false,
      name: false,
      password: false,
    });
  };

  const handleVerification = async () => {
    if (!dialogConfirmation) return;

    try {
      setVerifying(true);
      await api.get(`/user/verifyLogin/${dialogConfirmation}`); // Replace with your actual endpoint
      toast.success('Email verified successfully!');
      setLogin(true)
      setVerifying(false);
    } catch (error) {
      toast.error('Verification failed. Please try again.');
      setVerifying(false);
      console.log(error)
    }
  };

  const dialogDisplay = () => {
    return (
      <div className={styles.dialogContainer}>
        <p>Click below to verify your email, as email service is not included.</p>
        <button onClick={handleVerification} disabled={verifying}>
          {verifying ? 'Verifying...' : 'Verify Email'}
        </button>
      </div>
    );
  };

  return (
    <div>
      {dialogConfirmation !== '' ? (
        dialogDisplay()
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`${styles.inputField} ${errors.name && styles.errorActive}`}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className={`${styles.inputField} ${errors.email && styles.errorActive}`}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={`${styles.inputField} ${errors.password && styles.errorActive}`}
          />
          <button type="submit" disabled={loading} className={styles.submitButton}>
            {loading ? 'Please Wait' : 'Signup'}
          </button>
        </form>
      )}
    </div>
  );
};

export default SignupForm;
