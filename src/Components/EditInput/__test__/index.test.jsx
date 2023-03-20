import React from 'react';
import { render, screen } from '@testing-library/react';

import EditInput from '..';

describe('EditInput', () => {
  it('should render correctly', () => {
    const mockProps = {
      id: 1,
      strories: 'test',
      setStories: jest.fn(),
      dependencies: [],
      setDependencies: jest.fn(),
      developer: [],
      setDeveloper: jest.fn(),
      storyPoints: '1',
      setStoryPoints: jest.fn(),
      storyList: [],
      setStoryList: jest.fn(),
      developerList: [],
      closeedit: jest.fn(),
    };
    const { asFragment } = render(<EditInput {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });
});
