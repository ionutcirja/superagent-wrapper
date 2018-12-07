import request from 'superagent';
import api from '..';

describe('Superagent wrapper', () => {
  describe('get', () => {
    it('should resolve a promise when call is successful', () => {
      const expectedData = { id: 1, token: '123' };
      const headers = { header: 'some-value' };
      const set = jest.fn().mockReturnValue({
        end: (cb) => {
          cb(null, { ok: true, body: { status: 'OK' }, text: '{ "id": 1, "token": "123" }' });
        },
      });
      request.get = jest.fn().mockReturnValue({
        set,
      });

      const promise = api.get('endpoint', headers);
      expect(request.get.mock.calls[0][0]).toContain('endpoint');
      expect(set.mock.calls[0][0].header).toEqual('some-value');
      expect(set.mock.calls[0][0]).toHaveProperty('Accept', 'application/json');
      return promise.then((data) => {
        expect(data).toEqual(expectedData);
      });
    });

    it('should reject a promise when call is not successful', () => {
      const expectedError = { error: true, data: { message: 'error message' }, status: 401 };
      const set = jest.fn().mockReturnValue({
        end: (cb) => {
          cb('error', { ok: false, status: 401, text: '{ "message": "error message" }' });
        },
      });
      request.get.mockReturnValue({
        set,
      });

      const promise = api.get('endpoint');
      expect(request.get.mock.calls[0][0]).toContain('endpoint');
      return promise.then().catch((error) => {
        expect(error).toEqual(expectedError);
      });
    });
  });

  describe('post', () => {
    it('should resolve a promise when call is successful', () => {
      const values = { email: 'email@dom.com' };
      const headers = { header: 'some-value' };
      const expectedData = { id: 1 };
      const send = jest.fn().mockReturnValue({
        end: (cb) => {
          cb(null, { ok: true, body: { status: 'OK' }, text: '{ "id": 1 }' });
        },
      });
      const set = jest.fn().mockReturnValue({ send });
      request.post = jest.fn().mockReturnValue({
        set,
      });

      const promise = api.post('endpoint', values, headers);
      expect(request.post.mock.calls[0][0]).toContain('endpoint');
      expect(set.mock.calls[0][0].header).toEqual('some-value');
      expect(set.mock.calls[0][0]).toHaveProperty('Accept', 'application/json');
      expect(send).toHaveBeenCalledWith(values);
      return promise.then((data) => {
        expect(data).toEqual(expectedData);
      });
    });

    it('should reject a promise when call is not successful', () => {
      const values = { email: 'email@dom.com' };
      const expectedError = { error: true, data: { message: 'error message' }, status: 401 };
      const send = jest.fn().mockReturnValue({
        end: (cb) => {
          cb('error', { ok: false, status: 401, text: '{ "message": "error message" }' });
        },
      });
      const set = jest.fn().mockReturnValue({ send });
      request.post = jest.fn().mockReturnValue({
        set,
      });

      const promise = api.post('endpoint', values);
      expect(request.post.mock.calls[0][0]).toContain('endpoint');
      expect(send).toHaveBeenCalledWith(values);
      return promise.then().catch((error) => {
        expect(error).toEqual(expectedError);
      });
    });
  });

  describe('put', () => {
    it('should resolve a promise when call is successful', () => {
      const values = { email: 'email@dom.com' };
      const headers = { header: 'some-value' };
      const expectedData = { id: 1 };
      const send = jest.fn().mockReturnValue({
        end: (cb) => {
          cb(null, { ok: true, body: { status: 'OK' }, text: '{ "id": 1 }' });
        },
      });
      const set = jest.fn().mockReturnValue({ send });
      request.put = jest.fn().mockReturnValue({
        set,
      });

      const promise = api.put('endpoint', values, headers);
      expect(request.put.mock.calls[0][0]).toContain('endpoint');
      expect(set.mock.calls[0][0].header).toEqual('some-value');
      expect(set.mock.calls[0][0]).toHaveProperty('Accept', 'application/json');
      expect(send).toHaveBeenCalledWith(values);
      return promise.then((data) => {
        expect(data).toEqual(expectedData);
      });
    });

    it('should reject a promise when call is not successful', () => {
      const values = { email: 'email@dom.com' };
      const expectedError = { error: true, data: { message: 'error message' }, status: 401 };
      const send = jest.fn().mockReturnValue({
        end: (cb) => {
          cb('error', { ok: false, status: 401, text: '{ "message": "error message" }' });
        },
      });
      const set = jest.fn().mockReturnValue({ send });
      request.put = jest.fn().mockReturnValue({
        set,
      });

      const promise = api.put('endpoint', values);
      expect(request.put.mock.calls[0][0]).toContain('endpoint');
      expect(send).toHaveBeenCalledWith(values);
      return promise.then().catch((error) => {
        expect(error).toEqual(expectedError);
      });
    });
  });

  describe('delete', () => {
    it('should resolve a promise when call is successful', () => {
      const expectedData = { id: 1, token: '123' };
      const headers = { header: 'some-value' };
      const set = jest.fn().mockReturnValue({
        end: (cb) => {
          cb(null, { ok: true, body: { status: 'OK' }, text: '{ "id": 1, "token": "123" }' });
        },
      });
      request.del = jest.fn().mockReturnValue({
        set,
      });

      const promise = api.del('endpoint', headers);
      expect(request.del.mock.calls[0][0]).toContain('endpoint');
      expect(set.mock.calls[0][0].header).toEqual('some-value');
      expect(set.mock.calls[0][0]).toHaveProperty('Accept', 'application/json');
      return promise.then((data) => {
        expect(data).toEqual(expectedData);
      });
    });

    it('should reject a promise when call is not successful', () => {
      const expectedError = { error: true, data: { message: 'error message' }, status: 401 };
      const set = jest.fn().mockReturnValue({
        end: (cb) => {
          cb('error', { ok: false, status: 401, text: '{ "message": "error message" }' });
        },
      });
      request.del = jest.fn().mockReturnValue({
        set,
      });

      const promise = api.del('endpoint');
      expect(request.del.mock.calls[0][0]).toContain('endpoint');
      return promise.then().catch((error) => {
        expect(error).toEqual(expectedError);
      });
    });
  });
});
