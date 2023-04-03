import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import SidePanel from '..';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom');

describe('SidePanel', () => {
  it('should render SidePanel correctly', async () => {
    const { asFragment } = render(<SidePanel />);
    const menuButton = screen.getByTestId('menu-icon');
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getByText('Dependency Graph')).toBeTruthy();
    });
    expect(asFragment()).toMatchSnapshot();
  });
  it('should navigate to /create on clicking Create Project ', async () => {
    const navigateFn = jest.fn();
    useNavigate.mockReturnValue(navigateFn);
    render(<SidePanel />);
    const menuButton = screen.getByTestId('menu-icon');
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getAllByText('Create Project')).toBeTruthy();
    });
    const createProjectButton = screen.getByTestId('create-project-text');
    fireEvent.click(createProjectButton);
    expect(navigateFn).toBeCalledWith('/create');
  });
  it('should navigate to / on clicking Create Project ', async () => {
    const navigateFn = jest.fn();
    useNavigate.mockReturnValue(navigateFn);
    render(<SidePanel />);
    const menuButton = screen.getByTestId('menu-icon');
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getAllByText('Create Project')).toBeTruthy();
    });
    const listViewButton = screen.getByTestId('list-view-button');
    fireEvent.click(listViewButton);
    expect(navigateFn).toBeCalledWith('/');
  });
  it('should navigate to /graph on clicking Create Project ', async () => {
    const navigateFn = jest.fn();
    useNavigate.mockReturnValue(navigateFn);
    render(<SidePanel />);
    const menuButton = screen.getByTestId('menu-icon');
    fireEvent.click(menuButton);
    await waitFor(() => {
      expect(screen.getAllByText('Create Project')).toBeTruthy();
    });
    const dependencyGraphButton = screen.getByTestId('dependency-graph-button');
    fireEvent.click(dependencyGraphButton);
    expect(navigateFn).toBeCalledWith('/graph');
  });
});
