import React, { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { useLoginMutation } from './AuthApi';
import { logOut, setCredentials } from './AuthSlice';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import style from './auth.module.sass';

export const Login = () => {
  const appDispatch = useAppDispatch();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useLoginMutation();

  const handleLoginButton = () => {
    void login({ username, password })
      .unwrap()
      .then((response) => {
        console.log('response', response);
        appDispatch(
          setCredentials({
            jwtToken: response.loginData?.accessToken,
            refreshToken: response.loginData?.refreshToken,
            expireAt: response.loginData?.expireAt,
            isLoggedIn:
              !!response.loginData?.accessToken &&
              !!response.loginData?.refreshToken,
          })
        );
      })
      .catch(() => {
        console.log('error!!!');
        appDispatch(logOut);
      });
  };
  return (
    <main className={`${style.form_auth} w-100 m-auto text-center`}>
      <form>
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <div className={`form-floating ${style.form_signin}`}>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="name@example.com"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <label htmlFor="username">Email address</label>
        </div>
        <div className={`form-floating ${style.form_signin}`}>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>

        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <button
          className="w-100 btn btn-lg btn-primary"
          type="button"
          onClick={handleLoginButton}
        >
          Sign in
        </button>
        <p className="mt-5 mb-3 text-muted">© 2017–2022</p>
      </form>
    </main>
  );
};
