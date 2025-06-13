import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../src/App';

describe('TodoList Component', () => {
  beforeEach(() => {
    // Clear local storage before each test
    localStorage.clear();
    // Clean up the DOM
    cleanup();
  });

  test('renders input and add button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/add a new task/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add task/i })).toBeInTheDocument();
  });

  test('adds a new task', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    await userEvent.type(input, 'Test Task');
    fireEvent.click(addButton);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
  });

  test('toggles task completion', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    await userEvent.type(input, 'Test Task');
    fireEvent.click(addButton);

    // Select the checkbox by role (no name, as it’s not labeled)
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  test('deletes a task', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    await userEvent.type(input, 'Test Task');
    fireEvent.click(addButton);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
  });

  test('persists tasks in local storage', async () => {
    // First render: add a task
    render(<App />);
    const input = screen.getByPlaceholderText(/add a new task/i);
    const addButton = screen.getByRole('button', { name: /add task/i });

    await userEvent.type(input, 'Persistent Task');
    fireEvent.click(addButton);

    // Clean up the DOM before re-rendering
    cleanup();

    // Second render: check if task persists
    render(<App />);
    expect(screen.getByText('Persistent Task')).toBeInTheDocument();
  });
});