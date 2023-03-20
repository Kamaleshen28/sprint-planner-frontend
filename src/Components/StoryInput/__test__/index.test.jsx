import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import StoryInput from '..';

describe('StoryInput', () => {
  it('should render correctly', () => {
    const mockProps = {
      storyList: [],
      setStoryList: jest.fn(),
      developerList: [],
    };
    const { asFragment } = render(<StoryInput {...mockProps} />);
    expect(asFragment()).toMatchSnapshot();
  });

  // it("should call setValue when input changes", () => {
  //     const mockProps = {
  //     value: "Story 1",
  //     setValue: jest.fn(),
  //     };
  //     const { getByTestId } = render(<StoryInput {...mockProps} />);
  //     fireEvent.change(getByTestId("story-input"), {
  //     target: { value: "Story 2" },
  //     });
  //     expect(mockProps.setValue).toHaveBeenCalledWith("Story 2");
  // });
});
