import React from 'react';
import { render } from '@testing-library/react';
import Login from '..';

jest.mock('react-router-dom', () => {
  return {
    useNavigate: () => jest.fn(),
  };
});

describe('Login', () => {
  it('should render correctly', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
});
