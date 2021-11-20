import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
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
});
