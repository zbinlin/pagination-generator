# pagination generator

## Install

```shell
npm install pagination-generator
```

## Usage

```js
const pagen = require("pagination-generator");
console.log(pagen(4, 1000, 9)); // current = 4, count = 1000, limit = 9;
/* returns:
[ { type: 'nav', name: 'first', value: 1, disabled: false },
  { type: 'nav', name: 'prev', value: 3, disabled: false },
  { type: 'num', name: 2, value: 2, current: false },
  { type: 'num', name: 3, value: 3, current: false },
  { type: 'num', name: 4, value: 4, current: true },
  { type: 'num', name: 5, value: 5, current: false },
  { type: 'num', name: 6, value: 6, current: false },
  { type: 'nav', name: 'next', value: 5, disabled: false },
  { type: 'nav', name: 'last', value: 1000, disabled: false } ]
*/
```
