import React from 'react';
import { render, screen } from '@testing-library/react';

import EditDeveloperInput from '..';

describe('EditDeveloperInput', () => {
  it('should render correctly', () => {
    const mockProps = {
      id: 1,
      developer: [],
      sprintCapacity: 1,
      capacity: 1,
      developerList: [],
      setDeveloperList: jest.fn(),
      closeedit: jest.fn(),
    };
    const { asFragment } = render(<EditDeveloperInput {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
