import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import SprintOutput from '..';
import DataProvider from '../../../Contexts/DataContext';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom');
describe('SprintOutput', () => {
  const mockContent = [
    {
      id: 0,
      title: 'Authentication',
      description: 'Description',
      storyPoints: 4,
      dependencies: [],
      projectId: 'cc8b748b-8dbb-4f1d-9271-7153d5e0d6cb',
      created_at: '2023-03-16T15:34:57.470Z',
      updated_at: '2023-03-16T15:34:57.470Z',
      assignedDeveloperId: 0,
      startDay: 0,
      endDay: 2,
      remainingDuration: 0,
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
    },
    {
      id: 2,
      title: 'BackEnd',
      description: 'Description',
      storyPoints: 4,
      dependencies: [],
      projectId: 'cc8b748b-8dbb-4f1d-9271-7153d5e0d6cb',
      created_at: '2023-03-16T15:34:57.470Z',
      updated_at: '2023-03-16T15:34:57.470Z',
      assignedDeveloperId: 2,
      startDay: 0,
      endDay: 4,
      remainingDuration: 0,
      developers: [
        {
          id: 2,
          name: 'er',
          capacity: 122,
          projectId: 'cc8b748b-8dbb-4f1d-9271-7153d5e0d6cb',
          created_at: '2023-03-16T15:34:57.480Z',
          updated_at: '2023-03-16T15:34:57.480Z',
        },
      ],
    },
  ];
  it('should render correctly', () => {
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
        <SprintOutput content={mockContent} index={0} />
      </DataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
  it('should open sprint modal when click on specific sprint button ', async () => {
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
        <SprintOutput content={mockContent} index={0} />
      </DataProvider>,
    );
    fireEvent.click(screen.getByTestId('modal-button'));
    await waitFor(() => {
      expect(screen.getAllByTestId('stories').length).toEqual(2);
    });
  });

  //   it('should close the modal when click outside modal', async () => {
  //     const navigateFn = jest.fn();
  //     useNavigate.mockReturnValue(navigateFn);
  //     const { getByText } = render(
  //       <DataProvider
  //         values={{
  //           apiResponse: {
  //             projectStartDate: '2021-03-16T15:34:57.470Z',
  //           },
  //         }}
  //       >
  //         <SprintOutput content={mockContent} index={0} />
  //       </DataProvider>,
  //     );
  //     fireEvent.click(screen.getByTestId('modal-button'));
  //     await waitFor(() => {
  //       expect(screen.getAllByTestId('stories').length).toEqual(2);
  //     });
  //     //click outide model and test no stories are present
  //     fireEvent.click(getByText('Outside'));
  //     await waitFor(() => {
  //       expect(screen.queryAllByTestId('stories').length).toEqual(0);
  //     });
  //   });
});
