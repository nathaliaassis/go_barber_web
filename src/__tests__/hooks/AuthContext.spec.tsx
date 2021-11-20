import MockAdapter from 'axios-mock-adapter';
import { renderHook, act } from '@testing-library/react-hooks';
import { AuthProvider, useAuth } from '../../hooks/AuthContext';
import api from '../../services/api';


const mockApi = new MockAdapter(api);

describe('Hook: AuthContext', () => {

  const data = {
    user: {
      id: 'user-123',
      name: 'user',
      email: 'user@mail.com'
    },
    token: 'token-123'
  }
  it('should be able to sign in the user', async () => {
    mockApi.onPost('sessions').reply(200, data)
    const { result, waitForNextUpdate } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    const spyStorage = jest.spyOn(Storage.prototype, 'setItem');

    result.current.signIn({
      email: 'user@mail.com',
      password: '123456'
    });

    await waitForNextUpdate();

    expect(spyStorage).toHaveBeenCalledWith('@GoBarber:user', JSON.stringify(data.user));
    expect(spyStorage).toHaveBeenCalledWith('@GoBarber:token', data.token);

    expect(result.current.user.email).toEqual('user@mail.com');
  });

  it('should restore storage data when user sign in', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify(data.user);
        default:
          return null
      }
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    expect(result.current.user.email).toEqual('user@mail.com');
  });

  it('should be able to sign out user', () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation(key => {
      switch (key) {
        case '@GoBarber:token':
          return 'token-123';
        case '@GoBarber:user':
          return JSON.stringify(data.user);
        default:
          return null
      }
    });

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem')

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    act(() => {
      result.current.signOut();
    });

    expect(removeItemSpy).toHaveBeenCalledTimes(2);
    expect(result.current.user).toBeUndefined();
  });

  it('should be able to update user data', async () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    act(() => {
      result.current.updateUser({ ...data.user, avatar_url: 'image-test.jpg' })
    });

    expect(setItemSpy).toHaveBeenCalledWith('@GoBarber:user',
      JSON.stringify({
        ...data.user,
        avatar_url: 'image-test.jpg'
      })
    );

    expect(result.current.user).toEqual({ ...data.user, avatar_url: 'image-test.jpg' });
  })
});
