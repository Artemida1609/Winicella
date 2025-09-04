/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useMemo, useState } from 'react';
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
  setIsLoggedIn: (arg: boolean) => void;
};

const Register: React.FC<Props> = ({
  setActiveRegModal,
  isRegistered,
  setIsRegistered,
  setIsLoggedIn,
}) => {
  const check_mark_url = './img/icons/check-mark.svg';
  const close_icon_url = './img/icons/close-icon.svg';
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [passMatch, setPassMatch] = useState<number[]>([]);
  const [incorrectEmail, setIncorrectEmail] = useState(false);
  const [focus, setFocus] = useState<boolean>(false);

  const combinations = useMemo(
    () => [
      { regex: /.{8}/, key: 0 },
      { regex: /[A-Z]/, key: 1 },
      { regex: /[a-z]/, key: 2 },
      { regex: /[0-9]/, key: 3 },
      { regex: /[^A-Za-z0-9]/, key: 4 },
    ],
    [],
  );

  const handleHidePassword = () => {
    if (hidePassword) {
      setHidePassword(false);
    } else {
      setHidePassword(true);
    }
  };

  const toggleIsRegistered = () => {
    if (isRegistered) {
      setIsRegistered(false);
    } else {
      setIsRegistered(true);
    }

    if (error) {
      setError(false);
    }

    if (incorrectEmail) {
      setIncorrectEmail(false);
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

    const validateEmail = (_email: string) => {
      return String(_email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        );
    };

    if (!validateEmail(email)) {
      setIncorrectEmail(true);

      return;
    }

    try {
      await registerUser({
        first_name: firstName,
        email,
        last_name: lastName,
        password,
      });

      localStorage.setItem('isLoggedIn', 'true');
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setIsLoggedIn(true);
      setIsRegistered(true);
      setActiveRegModal(false);
    } catch (err) {}
  };

  useEffect(() => {
    if (isRegistered) {
      setTitle('Login');
    } else {
      setTitle('Sign up');
    }
  }, [isRegistered, setTitle]);

  useEffect(() => {
    setIncorrectEmail(false);
  }, [email]);

  useEffect(() => {
    combinations.forEach((item, index) => {
      const isValid = item.regex.test(password);

      if (isValid) {
        setPassMatch(prev => [...prev, index]);
      } else {
        if (passMatch.includes(index)) {
          const filtered = passMatch.filter(num => num !== index);

          setPassMatch(filtered);
        }
      }
    });
  }, [passMatch, password, combinations]);

  return (
    <form className={styles.form_main}>
      <h1 className={styles.form_header}>{title}</h1>
      {title === 'Sign up' && (
        <>
          <div className={styles.form_label_input_wrapper}>
            {}
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
        </>
      )}

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
      <div className={styles.wrapper}>
        <div
          className={classNames(styles.password_check, {
            [styles.hidden]: !focus,
          })}
        >
          <div
            className={classNames(styles.check_length, {
              [styles.green]: passMatch.includes(0),
              [styles.red]: !passMatch.includes(0),
            })}
          >
            <img
              src={passMatch.includes(0) ? check_mark_url : close_icon_url}
              className={styles.password_icon}
            />
            At least 8 characters Long
          </div>
          <div
            className={classNames(styles.check_uppercase, {
              [styles.green]: passMatch.includes(1),
              [styles.red]: !passMatch.includes(1),
            })}
          >
            <img
              src={passMatch.includes(1) ? check_mark_url : close_icon_url}
              className={styles.password_icon}
            />
            At least 1 uppercase letter (A-Z)
          </div>
          <div
            className={classNames(styles.check_lowercase, {
              [styles.green]: passMatch.includes(2),
              [styles.red]: !passMatch.includes(2),
            })}
          >
            <img
              src={passMatch.includes(2) ? check_mark_url : close_icon_url}
              className={styles.password_icon}
            />
            At least 1 lowercase letter (a-z)
          </div>
          <div
            className={classNames(styles.check_number, {
              [styles.green]: passMatch.includes(3),
              [styles.red]: !passMatch.includes(3),
            })}
          >
            <img
              src={passMatch.includes(3) ? check_mark_url : close_icon_url}
              className={styles.password_icon}
            />
            At least 1 number (0-9)
          </div>
          <div
            className={classNames(styles.check_special, {
              [styles.green]: passMatch.includes(4),
              [styles.red]: !passMatch.includes(4),
            })}
          >
            <img
              src={passMatch.includes(4) ? check_mark_url : close_icon_url}
              className={styles.password_icon}
            />
            At least 1 special character (@-$)
          </div>
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
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            type={hidePassword ? 'password' : 'text'}
            className={styles.form_input}
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <img
            className={styles.eye_password}
            onClick={handleHidePassword}
            src={
              hidePassword
                ? './img/icons/eye-password-hide.svg'
                : './img/icons/eye-close-up.svg'
            }
            alt='password eye'
          />
        </div>
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
      {error && (
        <p className={styles.error_text}>Certain account is not exist</p>
      )}
      {incorrectEmail && <p className={styles.error_text}>Email is invalid</p>}
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
