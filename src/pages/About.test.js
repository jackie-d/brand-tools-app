import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import About from './About';
import { BrowserRouter } from 'react-router-dom';


test('renders title text',() => {
  render(<BrowserRouter><About /></BrowserRouter>);
  const titleText = screen.getByText(/Design/i);
  expect(titleText).toBeInTheDocument();
});

test('animated show text works', async () => {
  render(<BrowserRouter><About /></BrowserRouter>);

  const button = screen.getByText('Animated Show Text');

  fireEvent(button, new MouseEvent('click'));

  await waitFor(() => {
    expect(screen.getByText(/Anim pariatur cliche reprehenderit/i)).toBeVisible()
  });
});

