import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';
import { toHaveStyle } from '@testing-library/jest-dom/matchers';

test('renders title text', () => {
  render(<Home />);
  const titleText = screen.getByText(/Welcome in/i);
  expect(titleText).toBeInTheDocument();
});

test('renders links', () => {
  render(<Home />);
  const link1 = screen.getByText(/Have a look at my profile on GitHub/i);
  const link2 = screen.getByText(/Have a look at my LinkedIn/i);
  expect(link1).toBeInTheDocument();
  expect(link1).toHaveAttribute('href', 'https://github.com/jackie-d');
  expect(link2).toBeInTheDocument();
  expect(link2).toHaveAttribute('href', 'https://www.linkedin.com/in/jackiedeglinnocenti');
});

test('bolder is enabled', () => {
  render(<Home />);
  const input = document.getElementsByClassName('input-bolder')[0];
  const button = screen.getByTestId('bold-button');

  expect(input).toBeEnabled();
  expect(button).toBeEnabled();
});

test('bolder works', async () => {
  render(<Home />);

  const input = document.getElementsByClassName('input-bolder')[0];
  const button = screen.getByTestId('bold-button');

  fireEvent.change(input, { target: { value: 'test' } })
  fireEvent(button, new MouseEvent('click'));

  const p = document.getElementsByClassName('Cool-paragraph')[0];

  expect(p).toHaveTextContent('test');  
  waitFor(() => {
    expect(p).toHaveStyle('font-weight: 900');
  });
});