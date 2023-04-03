import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import StoryOutput from '..';
import DataProvider from '../../../Contexts/DataContext';
import { useNavigate } from 'react-router-dom';
jest.mock('react-router-dom');

describe('StoryOutput', () => {
  const mockProps = {
    id: 0,
    storyPoints: 4,
    title: 'Authentication',
    dependencies: [1],
    assignedDeveloperId: 0,
    startDay: 2,
    endDay: 4,
    developers: [
      {
        id: 0,
        name: 'nm',
        capacity: 122,
        projectId: 'cc8b748b-8dbb-4f1d-9271-7153d5e0d6cb',
        created_at: '2023-03-16T15:34:57.480Z',
        updated_at: '2023-03-16T15:34:57.480Z',
      },
      {
        id: 1,
        name: 'we',
        capacity: 122,
        projectId: 'cc8b748b-8dbb-4f1d-9271-7153d5e0d6cb',
        created_at: '2023-03-16T15:34:57.480Z',
        updated_at: '2023-03-16T15:34:57.480Z',
      },
    ],
  };
  it('should render the component', () => {
    const navigateFn = jest.fn();
    useNavigate.mockReturnValue(navigateFn);
    const { asFragment } = render(
      <DataProvider
        values={{
          apiResponse: {
            projectStartDate: '2021-03-16T15:34:57.470Z',
          },
        }}
      >
        <StoryOutput {...mockProps} />
      </DataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should open Modal to display story details when clicked on specific story', async () => {
    const navigateFn = jest.fn();
    useNavigate.mockReturnValue(navigateFn);
    render(
      <DataProvider
        values={{
          apiResponse: {
            projectStartDate: '2021-03-16T15:34:57.470Z',
          },
        }}
      >
        <StoryOutput {...mockProps} />
      </DataProvider>,
    );
    expect(screen.queryByTestId('story-modal')).not.toBeInTheDocument();
    fireEvent.click(screen.getByTestId('modal-button'));
    expect(screen.getByTestId('story-modal')).toBeInTheDocument();
    // fireEvent.click(document.body);
    // await waitFor(() => {
    //   expect(screen.queryByTestId('story-modal')).not.toBeInTheDocument();
    // });
  });
});
