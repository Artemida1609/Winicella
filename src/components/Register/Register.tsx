import { useState } from 'react';
import {
  getAllRegisteredUsers,
  registerUser,
} from '../../services/productsApi';
import styles from './Register.module.scss';
import classNames from 'classnames';

type Props = {
  setActiveRegModal: (arg: boolean) => void;
  isRegistered: boolean;
  setIsRegistered: (arg: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (arg: boolean) => void;
};

const Register: React.FC<Props> = ({
  setActiveRegModal,
  isRegistered,
  setIsRegistered,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const handleCloseModal = () => {
    setActiveRegModal(false);
  };

  const toggleIsRegistered = () => {
    if (isRegistered) {
      setIsRegistered(false);
    } else {
      setIsRegistered(true);
    }
  };

  const handleLogIn = (
    e: React.FormEvent,
    userFirstName: string,
    userLastName: string,
    userEmail: string,
    userPassword: string,
  ) => {
    e.preventDefault();

    getAllRegisteredUsers().then(users => {
      const userExist = users.find(
        user =>
          user.email === userEmail &&
          user.password === userPassword &&
          user.first_name === userFirstName &&
          user.last_name === userLastName,
      );

      if (userExist && userExist !== undefined) {
        localStorage.setItem('isLoggedIn', 'true');
        setIsRegistered(true);
        setIsLoggedIn(true);
        setActiveRegModal(false);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setError(false);
      } else {
        setError(true);
      }
    });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await registerUser({
        first_name: firstName,
        email,
        last_name: lastName,
        password,
      });
    } finally {
      localStorage.setItem('isLoggedIn', 'true');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setIsLoggedIn(true);
      setIsRegistered(true);
      setActiveRegModal(false);
    }
  };

  return (
    <form className={styles.form_main}>
      <h1 className={styles.form_header}>
        {isRegistered ? 'Login' : 'Sign up'}
      </h1>
      {isRegistered && isLoggedIn && (
        <span className={styles.close_icon} onClick={handleCloseModal}>
          <img
            src='./img/icons/close-icon-dark-theme.svg'
            alt='close icon'
            className={styles.close_icon_img}
          />
        </span>
      )}
      <div className={styles.form_label_input_wrapper}>
        <label htmlFor='username-input' className={styles.form_label}>
          First Name:
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
          Last Name:
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
      <div className={styles.has_account_cont}>
        {isRegistered ? (
          <p className={styles.has_account}>Don`t have an account?</p>
        ) : (
          <p className={styles.has_account}>Already has account?</p>
        )}

        <p className={styles.has_account_click} onClick={toggleIsRegistered}>
          Click
        </p>
      </div>
      {error && <p>Error</p>}
      <div className={styles.form_buttons_container}>
        <button
          className={classNames(styles.form_button, {
            [styles.isRegistered]: !isRegistered,
            [styles.isNotRegistered]: isRegistered,
          })}
          onClick={handleRegister}
          disabled={isRegistered}
        >
          Sign up
        </button>
        <button
          className={classNames(styles.form_button, {
            [styles.isRegistered]: isRegistered,
            [styles.isNotRegistered]: !isRegistered,
          })}
          disabled={!isRegistered}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
            handleLogIn(e, firstName, lastName, email, password)
          }
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default Register;
