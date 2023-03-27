import React from 'react';
import { useOktaAuth, LoginCallback } from '@okta/okta-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function LoginCallbackUser() {
  const navigate = useNavigate();
  const { authState } = useOktaAuth();

  if (authState?.isAuthenticated) navigate('/create');

  return <LoginCallback />;
}
