import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Login } from './features/auth/Login';

import { Dashboard } from './components/Dashboard';
import { Home } from './components/Home';
import { Layout } from './components/Layout';
import { PrivateRoute } from './features/auth/PrivateRoute';
import { UnsignedRoute } from './features/auth/UnsignedRoute';

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Any Person route */}
        <Route index element={<Home />} />

        {/* un-signed in routes */}
        <Route element={<UnsignedRoute />}>
          <Route path="login" element={<Login />} />
        </Route>

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};
