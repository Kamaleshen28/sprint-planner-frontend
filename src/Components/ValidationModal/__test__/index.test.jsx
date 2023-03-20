import React from 'react';
import { render } from '@testing-library/react';

import ValidationModal from '..';

describe('ValidationModal', () => {
  it('should render correctly', () => {
    const mockProps = {
      isOpen: true,
      setIsOpen: jest.fn(),
    };
    const { asFragment } = render(<ValidationModal {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
