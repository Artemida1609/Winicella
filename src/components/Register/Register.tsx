import { useState } from 'react';
import { registerUser } from '../../services/productsApi';
import styles from './Register.module.scss';

type Props = {
  setActiveRegModal: (arg: boolean) => void;
};

const Register: React.FC<Props> = ({ setActiveRegModal }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleCloseModal = () => {
    setActiveRegModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({
        first_name: firstName,
        email,
        last_name: lastName,
        password,
      });
    } catch (error) {
      // console.error('Rgistration failed:', error);
    } finally {
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <form className={styles.form_main} onSubmit={handleSubmit}>
      <h1 className={styles.form_header}>Register</h1>
      <span className={styles.close_icon} onClick={handleCloseModal}>
        <img
          src='./img/icons/close-icon-dark-theme.svg'
          alt='close icon'
          className={styles.close_icon_img}
        />
      </span>
      <div className={styles.form_label_input_wrapper}>
        <label htmlFor='username-input' className={styles.form_label}>
          Name:
        </label>
        <input
          type='text'
          id='username-input'
          name='userName'
          required
          className={styles.form_input}
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </div>
      <div className={styles.form_label_input_wrapper}>
        <label htmlFor='userLastName-input' className={styles.form_label}>
          LastName:
        </label>
        <input
          type='text'
          id='userLastName-input'
          name='userLastName'
          required
          className={styles.form_input}
          value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </div>
      <div className={styles.form_label_input_wrapper}>
        <label htmlFor='email-input' className={styles.form_label}>
          Email:
        </label>
        <input
          id='email-input'
          name='userEmail'
          required
          type='email'
          className={styles.form_input}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <div className={styles.form_label_input_wrapper}>
        <label htmlFor='password-input' className={styles.form_label}>
          Password:
        </label>
        <input
          aria-describedby='password-hint'
          id='password-input'
          name='userPassword'
          required
          type='password'
          className={styles.form_input}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </div>
      <div className={styles.form_buttons_container}>
        <button className={styles.form_button} type='submit'>
          Sign up
        </button>
        <button className={styles.form_button} type='submit'>
          Login
        </button>
      </div>
    </form>
  );
};

export default Register;
