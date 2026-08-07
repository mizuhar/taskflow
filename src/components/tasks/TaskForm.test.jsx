import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TaskForm from './TaskForm';

vi.mock('../../context/AuthContext', () => ({
  useAuth: () => ({ currentUser: { uid: '123' } }),
}));

vi.mock('../../context/ToastContext', () => ({
  useToast: () => ({ addToast: vi.fn() }),
}));

vi.mock('../../services/taskService', () => ({
  addTask: vi.fn(),
}));

describe('TaskForm Component', () => {
  it('shows error message when submitting an empty input', () => {
    render(<TaskForm />);
    const buttonElement = screen.getByRole('button', { name: /add task/i });
    fireEvent.click(buttonElement);

    const errorMessage = screen.getByText('Please enter a task.');
    expect(errorMessage).toBeInTheDocument();
  });
});