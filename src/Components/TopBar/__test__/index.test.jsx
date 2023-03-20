import { render } from '@testing-library/react';
import React from 'react';
import TopBar from '..';

describe('TopBar', () => {
  it('should render correctly', () => {
    const { asFragment } = render(<TopBar />);
    expect(asFragment()).toMatchSnapshot();
  });
});
