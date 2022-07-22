import * as React from 'react';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export const PrivateRoute = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const location = useLocation();
  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
