import { render } from '@testing-library/react';
import React from 'react';
import Title from '..';

describe('Title', () => {
  it('should render correctly', () => {
    const mockProps = {
      value: 'Sprint Planner',
      setValue: jest.fn(),
    };
    const { asFragment } = render(<Title {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
