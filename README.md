Express API
======

## Examples

Read codes in [index.js](./index.js)

### Init

```javascript
const ExpressApi = require('./src/api');
const api = new ExpressApi();
const api = new ExpressApi({ tokenV2, cookie }); // Optional, you can load tokenV2 and cookie from last state. But we recommend to init new token every launch.

await api.init(); // If tokenV2 and cookie is loaded from last state, you can skip this call.
```

### Get

```javascript
const data = await api.get(packageNo, {company: companyCode});
```

If you don't know which company is carrying this package, you can ignore `company` options.

```javascript
const data = await api.get(packageNo);
```

## License

No Licenses. Just use as you like.
