import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import DeveloperOutput from '..';

describe('DeveloperOutput', () => {
  it('should render correctly', () => {
    const mockProps = {
      developerName: '',
      content: [],
    };
    const { asFragment } = render(<DeveloperOutput {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
