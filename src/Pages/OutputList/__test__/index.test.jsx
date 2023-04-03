import React from 'react';
import DataProvider from '../../../Contexts/DataContext';
import OutputList from '../index';
import { render } from '@testing-library/react';
import {
  sprints as mockSprints,
  apiResponse as mockApiResponse,
} from '../../../mocks';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

describe('OutputList', () => {
  it('should render correctly', () => {
    const { asFragment } = render(
      <DataProvider
        values={{
          sprints: mockSprints,
          apiResponse: mockApiResponse,
        }}
      >
        <OutputList />
      </DataProvider>,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
