import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Users from './Users';

import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

describe('With redux mock', () => {

    const mockStore = configureStore();
    let store;

    test('renders description text', () => {
        store = mockStore({todos: []});
        render(
            <Provider store={store}>
                <Users />
            </Provider>
        );
        const titleText = screen.getByText(/Create new todo task/i);
        expect(titleText).toBeInTheDocument();
    });

    test('inputs are enabled', () => {
        store = mockStore({todos: []});
        render(
            <Provider store={store}>
                <Users />
            </Provider>
        );
        const inputTitle = screen.getByPlaceholderText('Title');
        const inputDescription = screen.getByPlaceholderText('Description');

        expect(inputTitle).toBeEnabled();
        expect(inputDescription).toBeEnabled();
    });


    test('add task works', async () => {
        store = mockStore({todos: []});
        render(
            <Provider store={store}>
                <Users />
            </Provider>
        );

        const inputTitle = screen.getByPlaceholderText('Title');
        const inputDescription = screen.getByPlaceholderText('Description');

        fireEvent.change(inputTitle, { target: { value: 'test' } })
        fireEvent.change(inputDescription, { target: { value: 'description' } })

        // check testing-library visibility on added element

        waitFor(() => {
            expect(screen.getByText('test')).toBeVisible();
        });

        waitFor(() => {
            expect(screen.getByText('description')).toBeVisible();
        });
    });

});