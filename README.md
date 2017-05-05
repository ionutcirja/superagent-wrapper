# Superagent wrapper

This is a simple wrapper over superagent library.

Any pull request for optimisations and new additions is more than welcome.

# Installing superagent-wrapper

```
npm install superagent-wrapper
```

# Usage

```js
import api from 'superagent-wrapper';
```

## Methods

### init

Takes apiUrl and headers as parameters.

Initialisation should be called before any get/post/put/delete request.

```js
const API_BASE_URL = 'http://domain/api';
const defaultHeaders = {
    Accept: 'application/json',
    AppVersion: '1.0.0'
};

api.init(API_BASE_URL, defaultHeaders);
```

### get

Takes endpoint and headers as parameters.

Headers sent to the server will extend the default headers set into the initialization call.

Returns a promise.

```js
get('/fetch-endpoint', { Authorization: `Token 123` })
```

### post

Takes endpoint and headers as parameters.

Headers sent to the server will extend the default headers set into the initialization call.

Returns a promise.

```js
post('/post-endpoint', { Authorization: `Token 123` })
```

### put

Takes endpoint and headers as parameters.

Headers sent to the server will extend the default headers set into the initialization call.

Returns a promise.

```js
put('/put-endpoint', { Authorization: `Token 123` })
```

### del

Takes endpoint and headers as parameters.

Headers sent to the server will extend the default headers set into the initialization call.

Returns a promise.

```js
del('/delete-endpoint', { Authorization: `Token 123` })
```