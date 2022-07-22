import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { useLoginMutation } from './AuthApi';
import { setCredentials } from './AuthSlice';
// import { setCredentials } from './AuthSlice';

export const Login = () => {
  const appDispatch = useAppDispatch();
  // const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useLoginMutation();

  const handleLoginButton = () => {
    void login({ username, password })
      .unwrap()
      .then((tokenData) => {
        appDispatch(
          setCredentials({
            jwtToken: tokenData.AccessToken,
            refreshToken: tokenData.RefreshToken,
            expireAt: Number(tokenData.ExpireAt),
            isLoggedIn: !!tokenData.AccessToken && !!tokenData.RefreshToken,
          })
        );
      })
      .catch((reason) => {
        console.log(reason);
      });
  };
  return (
    <>
      <div className="form-outline mb-4">
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoFocus
        />
        <label className="form-label" htmlFor="username">
          Username
        </label>
      </div>

      <div className="form-outline mb-4">
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="form-label" htmlFor="password">
          Password
        </label>
      </div>

      <button
        type="button"
        className="btn btn-primary btn-block mb-4"
        onClick={handleLoginButton}
      >
        Sign in
      </button>

      <div className="text-center">
        <p>
          Not a member? <a href="#!">Register</a>
        </p>
      </div>
    </>
  );
};
