import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import DeveloperInput from '..';

describe('DeveloperInput', () => {
  it('should render correctly', () => {
    const mockProps = {
      developerList: [],
      setDeveloperList: jest.fn(),
      deleteCheck: jest.fn(),
    };
    const { asFragment } = render(<DeveloperInput {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
