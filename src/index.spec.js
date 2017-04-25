import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import request from 'superagent';
import api from './';

chai.use(sinonChai);

describe('Superagent wrapper', () => {
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        sandbox.restore();
    });

    describe('get', () => {
        it('should resolve a promise when call is successful', () => {
            const expectedData = { id: 1, token: '123' };
            const headers = { header: 'some-value' };
            const setStub = sandbox.stub().returns({
                end: (cb) => {
                    cb(null, { ok: true, body: { status: 'OK' }, text: '{ "id": 1, "token": "123" }' });
                },
            });
            sandbox.stub(request, 'get').returns({
                set: setStub,
            });

            const promise = api.get('endpoint', headers);
            expect(request.get.getCall(0).args[0]).to.contain('endpoint');
            expect(setStub.getCall(0).args[0].header).to.equal('some-value');
            expect(setStub.getCall(0).args[0]).to.have.property('Accept', 'application/json');
            return promise.then((data) => {
                expect(data).to.eql(expectedData);
            });
        });

        it('should reject a promise when call is not successful', () => {
            const expectedError = { error: true, data: { message: 'error message' }, status: 401 };
            const setStub = sandbox.stub().returns({
                end: (cb) => {
                    cb('error', { ok: false, status: 401, text: '{ "message": "error message" }' });
                },
            });
            sandbox.stub(request, 'get').returns({
                set: setStub,
            });

            const promise = api.get('endpoint');
            expect(request.get.getCall(0).args[0]).to.contain('endpoint');
            return promise.then().catch((error) => {
                expect(error).to.eql(expectedError);
            });
        });
    });

    describe('post', () => {
        it('should resolve a promise when call is successful', () => {
            const values = { email: 'email@dom.com' };
            const headers = { header: 'some-value' };
            const expectedData = { id: 1 };
            const sendStub = sandbox.stub().returns({
                end: (cb) => {
                    cb(null, { ok: true, body: { status: 'OK' }, text: '{ "id": 1 }' });
                },
            });
            const setStub = sandbox.stub().returns({ send: sendStub });
            sandbox.stub(request, 'post').returns({
                set: setStub,
            });

            const promise = api.post('endpoint', values, headers);
            expect(request.post.getCall(0).args[0]).to.contain('endpoint');
            expect(setStub.getCall(0).args[0].header).to.equal('some-value');
            expect(setStub.getCall(0).args[0]).to.have.property('Accept', 'application/json');
            expect(sendStub).to.have.been.calledWith(values);
            return promise.then((data) => {
                expect(data).to.eql(expectedData);
            });
        });

        it('should reject a promise when call is not successful', () => {
            const values = { email: 'email@dom.com' };
            const expectedError = { error: true, data: { message: 'error message' }, status: 401 };
            const sendStub = sandbox.stub().returns({
                end: (cb) => {
                    cb('error', { ok: false, status: 401, text: '{ "message": "error message" }' });
                },
            });
            const setStub = sandbox.stub().returns({ send: sendStub });
            sandbox.stub(request, 'post').returns({
                set: setStub,
            });

            const promise = api.post('endpoint', values);
            expect(request.post.getCall(0).args[0]).to.contain('endpoint');
            expect(sendStub).to.have.been.calledWith(values);
            return promise.then().catch((error) => {
                expect(error).to.eql(expectedError);
            });
        });
    });

    describe('put', () => {
        it('should resolve a promise when call is successful', () => {
            const values = { email: 'email@dom.com' };
            const headers = { header: 'some-value' };
            const expectedData = { id: 1 };
            const sendStub = sandbox.stub().returns({
                end: (cb) => {
                    cb(null, { ok: true, body: { status: 'OK' }, text: '{ "id": 1 }' });
                },
            });
            const setStub = sandbox.stub().returns({ send: sendStub });
            sandbox.stub(request, 'put').returns({
                set: setStub,
            });

            const promise = api.put('endpoint', values, headers);
            expect(request.put.getCall(0).args[0]).to.contain('endpoint');
            expect(setStub.getCall(0).args[0].header).to.equal('some-value');
            expect(setStub.getCall(0).args[0]).to.have.property('Accept', 'application/json');
            expect(sendStub).to.have.been.calledWith(values);
            return promise.then((data) => {
                expect(data).to.eql(expectedData);
            });
        });

        it('should reject a promise when call is not successful', () => {
            const values = { email: 'email@dom.com' };
            const expectedError = { error: true, data: { message: 'error message' }, status: 401 };
            const sendStub = sandbox.stub().returns({
                end: (cb) => {
                    cb('error', { ok: false, status: 401, text: '{ "message": "error message" }' });
                },
            });
            const setStub = sandbox.stub().returns({ send: sendStub });
            sandbox.stub(request, 'put').returns({
                set: setStub,
            });

            const promise = api.put('endpoint', values);
            expect(request.put.getCall(0).args[0]).to.contain('endpoint');
            expect(sendStub).to.have.been.calledWith(values);
            return promise.then().catch((error) => {
                expect(error).to.eql(expectedError);
            });
        });
    });

    describe('delete', () => {
        it('should resolve a promise when call is successful', () => {
            const expectedData = { id: 1, token: '123' };
            const headers = { header: 'some-value' };
            const setStub = sandbox.stub().returns({
                end: (cb) => {
                    cb(null, { ok: true, body: { status: 'OK' }, text: '{ "id": 1, "token": "123" }' });
                },
            });
            sandbox.stub(request, 'del').returns({
                set: setStub,
            });

            const promise = api.del('endpoint', headers);
            expect(request.del.getCall(0).args[0]).to.contain('endpoint');
            expect(setStub.getCall(0).args[0].header).to.equal('some-value');
            expect(setStub.getCall(0).args[0]).to.have.property('Accept', 'application/json');
            return promise.then((data) => {
                expect(data).to.eql(expectedData);
            });
        });

        it('should reject a promise when call is not successful', () => {
            const expectedError = { error: true, data: { message: 'error message' }, status: 401 };
            const setStub = sandbox.stub().returns({
                end: (cb) => {
                    cb('error', { ok: false, status: 401, text: '{ "message": "error message" }' });
                },
            });
            sandbox.stub(request, 'del').returns({
                set: setStub,
            });

            const promise = api.del('endpoint');
            expect(request.del.getCall(0).args[0]).to.contain('endpoint');
            return promise.then().catch((error) => {
                expect(error).to.eql(expectedError);
            });
        });
    });
});
