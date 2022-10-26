import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import LoginCreate from './LoginCreate';
import LoginPasswordLost from './LoginPasswordLost';
import LoginPasswordReset from './LoginPasswordReset';
import { UserContext } from '../../UserContext';
import styles from './Login.module.css';
import NotFound from '../NotFound';
import Head from '../Helper/Head';

const Login = () => {
  const { login } = React.useContext(UserContext);

  if (login === true) return <Navigate to='/conta'></Navigate>;
  return (
    <section className={styles.login}>
      <Head title='Login' description='Login do site dogs.' />
      <div className={styles.forms}>
        <Routes>
          <Route path='/' element={<LoginForm />}></Route>
          <Route path='criar' element={<LoginCreate />}></Route>
          <Route path='perdeu' element={<LoginPasswordLost />}></Route>
          <Route path='resetar' element={<LoginPasswordReset />}></Route>
          <Route path='*' element={<NotFound></NotFound>}></Route>
        </Routes>
      </div>
    </section>
  );
};

export default Login;
