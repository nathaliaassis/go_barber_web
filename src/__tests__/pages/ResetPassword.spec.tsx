import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import ResetPassword from '../../pages/ResetPassword';
import api from '../../services/api';


const mockedHistoryPush = jest.fn(); // a mesma coisa que () => {}
const mockedAddToast = jest.fn(); // a mesma coisa que () => {}
const mockedResetPassword = jest.fn(); // a mesma coisa que () => {}


jest.mock('react-router-dom', () => {
  return {
    useHistory: () => ({
      push: mockedHistoryPush
    }),
    useLocation: () => ({
      search: '?token=token1234'
    })
  }
});

jest.mock('../../hooks/ToastContext', () => {
  return {
    useToast: () => ({
      addToast: mockedAddToast
    }),
  }
});

describe('Page: ResetPassword', () => {
  it("should be able to reset user password", async () => {
    const { getByTestId, getByText } = render(<ResetPassword />);

    const passwordField = getByTestId('new-password');
    const passwordConfirmationField = getByTestId('new-password-confirmation');
    const buttonElement = getByText('Alterar senha');

    fireEvent.change(passwordField, {
      target: {
        value: '123456'
      }
    });

    fireEvent.change(passwordConfirmationField, {
      target: {
        value: '123456'
      }
    });

    fireEvent.click(buttonElement);


    const fakeData = {
      password: '123456',
      password_confirmation: '123456',
      token: '123'
    };

    const requisition = jest.spyOn(api, 'post').mockImplementation(() => Promise.resolve(fakeData))


    await waitFor(() => {
      expect(requisition).toHaveBeenCalled();
      expect(mockedHistoryPush).toHaveBeenCalledWith('/');
    });

  });
});
