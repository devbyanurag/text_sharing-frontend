import React, { useState } from 'react';
import styles from './LoginForm.module.css';
import { toast } from 'react-toastify';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { login } = useAuth()
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: 'anurag@gmail.com',
    password: '123',
  });

  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });

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
      toast.error('Email should be valid gmail only')
      setErrors({
        ...errors,
        email: true
      })
      return
    }

    try {
      // Make the API call to log in
      setLoading(true)
      await login(formData.email, formData.password).then(() => { navigate('/') }).catch(() => { toast.error('Invalid Credentials.') })

    }
    catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
    }
    finally {
      setLoading(false)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Please Wait' : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
