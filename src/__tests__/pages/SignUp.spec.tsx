import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SignUp from '../../pages/SignUp';
import api from '../../services/api';

const mockedHistoryPush = jest.fn();
const mockedAddToast = jest.fn();

jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush
    }),
    Link: ({ children }: { children: React.ReactNode }) => children,
  }
});

jest.mock('../../hooks/ToastContext', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast
    }),
  }
});

describe('Page: SignUp', () => {
  beforeEach(() => {
    mockedHistoryPush.mockClear();
  });

  it('should be able to sign up', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Senha');
    const submitButton = getByText('Cadastrar');

    fireEvent.change(nameField, {
      target: {
        value: 'User Name'
      }
    });
    fireEvent.change(emailField, {
      target: {
        value: 'user@mail.com'
      }
    });
    fireEvent.change(password, {
      target: {
        value: '123456'
      }
    });

    fireEvent.click(submitButton);

    const fakeUser = { data: { name: "User Name" } };

    const requisition = jest.spyOn(api, 'post').mockImplementation(() => Promise.resolve(fakeUser))

    await waitFor(() => {
      expect(requisition).toHaveBeenCalled();
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });
  });

  it('should not be able to sign up with invalid credentials', () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Senha');
    const submitButton = getByText('Cadastrar');

    fireEvent.change(nameField, {
      target: {
        value: 'User Name'
      }
    });
    fireEvent.change(emailField, {
      target: {
        value: 'invalid-email'
      }
    });
    fireEvent.change(password, {
      target: {
        value: '123456'
      }
    });

    jest.spyOn(api, 'post').mockImplementation(() => {
      throw new Error()
    });

    fireEvent.click(submitButton);

    expect(mockedHistoryPush).not.toHaveBeenCalled();
  });

  it('shoult display toast error if sign up fails', async () => {
    const { getByPlaceholderText, getByText } = render(<SignUp />);

    const nameField = getByPlaceholderText('Nome');
    const emailField = getByPlaceholderText('E-mail');
    const password = getByPlaceholderText('Senha');
    const submitButton = getByText('Cadastrar');

    fireEvent.change(nameField, {
      target: {
        value: 'User Name'
      }
    });
    fireEvent.change(emailField, {
      target: {
        value: 'user@mail.com'
      }
    });
    fireEvent.change(password, {
      target: {
        value: '123456'
      }
    });

    jest.spyOn(api, 'post').mockImplementation(() => {
      throw new Error()
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockedAddToast).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error'
        })
      );
    });
  });
});
