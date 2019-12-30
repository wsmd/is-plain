<div align=center><img style="margin-bottom: 24px; display: inline-block" src="https://user-images.githubusercontent.com/2100222/71579003-64cf9780-2af2-11ea-9511-79696793c2e8.png" width="96" /></div>

<h1 align="center">

`is-plain`

</h1>

<div align="center">

[![NPM Release](https://img.shields.io/npm/v/is-plain.svg)](https://www.npmjs.com/package/is-plain)
[![Build Status](https://travis-ci.org/wsmd/is-plain.svg?branch=master)](https://travis-ci.org/wsmd/is-plain)
[![Code Coverage](https://coveralls.io/repos/github/wsmd/is-plain/badge.svg?branch=master)](https://coveralls.io/github/wsmd/is-plain?branch=master)
[![License](https://img.shields.io/github/license/wsmd/is-plain.svg)](https://github.com/wsmd/is-plain/blob/master/LICENSE)

</div>

<details>
<summary>📖 Table of Contents</summary>
<p>

- [Installation](#installation)
- [Usage](#usage)
- [Comparison with Other Libraries](#comparison-with-other-libraries)
  - [Small Package Size](#small-package-size)
  - [Edge Cases Other Libraries Missed](#edge-cases-other-libraries-missed)
    - [Case 1](#case-1)
    - [Case 2](#case-2)
    - [Case 3](#case-3)
    - [Case 4](#case-4)
    - [Case 5](#case-5)
    - [Case 6](#case-6)
- [License](#license)

</p>
</details>

Tests if a value is a [plain object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer), which can be:

- An object created with the `Object` constructor, `new Object()`
- An object without a prototype `Object.create(null)`
- An object created using the literal notation `{}`

## Installation

```sh
# using npm
npm install --save is-plain

# using yarn
yarn add is-plain
```

## Usage

```js
import isPlain from 'is-plain';

isPlain({ foo: 'bar' });
//=> true

isPlain(Object.create(null));
//=> true

isPlain(new Object());
//=> true

class Foo {}
isPlain(new Foo());
//=> false

isPlain([1, 2, 3]);
//=> false

isPlain(null);
//=> false

isPlain(Promise.resolve());
//=> false
```

## Comparison with Other Libraries

There are already similar libraries available to test if a value is a plain object. Some of these libraries are very widely adopted. To name a few:

- [`lodash.isplainobject`](https://www.npmjs.com/package/lodash.isplainobject)
- [`is-plain-object`](https://www.npmjs.com/package/is-plain-object)
- [`is-plain-obj`](https://www.npmjs.com/package/is-plain-obj)

So, why need `is-plain` when other solutions already exist?

### Small Package Size

`is-plain` is only [**167 bytes**](https://github.com/siddharthkp/bundlesize) minzipped.

I originally wanted something _very_ small but the available solutions did not quite meet my needs. The small package size is one of the goals I was aiming for with `is-plain`.

The following is a [size comparison](https://bundlephobia.com/) between `is-plain` and other popular libraries ranked by size:

<div align="center">
<img src="https://user-images.githubusercontent.com/2100222/71575258-3cd93780-2ae4-11ea-8a37-0bf464fba1bf.png" width="820" />
</div>

### Edge Cases Other Libraries Missed

It's obvious that `is-plain` is not the smallest of the four, but the size wasn't the only thing I was after. Most importantly, what I wanted to address is some of the edge cases the other libraries are missing.

The following are some of the cases that causes inconsistent, arguably incorrect, results when one of the other three libraries is used (**note that in all of the following cases, `is-plain` considers these objects to be plain objects**).

#### Case 1

```js
// an object without a prototype
const value = Object.create(null);
```

|     |                               | is `value` a plain object? |
| --- | ----------------------------- | -------------------------- |
|     | `is-plain` (**this package**) | `true`                     |
|     | `is-plain-obj`                | `true`                     |
| ⚠️  | `is-plain-object`             | `false`                    |
|     | `lodash.isplainobject`        | `true`                     |

#### Case 2

```js
// an object with an empty prototype
const value = Object.create({});
```

|     |                               | is `value` a plain object? |
| --- | ----------------------------- | -------------------------- |
|     | `is-plain` (**this package**) | `true`                     |
| ⚠️  | `is-plain-obj`                | `false`                    |
|     | `is-plain-object`             | `true`                     |
| ⚠️  | `lodash.isplainobject`        | `false`                    |

#### Case 3

```js
// an object with a prototype whose constructor is Object
const value = Object.create({ constructor: Object });
```

|     |                               | is `value` a plain object? |
| --- | ----------------------------- | -------------------------- |
|     | `is-plain` (**this package**) | `true`                     |
| ⚠️  | `is-plain-obj`                | `false`                    |
|     | `is-plain-object`             | `true`                     |
|     | `lodash.isplainobject`        | `true`                     |

#### Case 4

```js
// an object literal with own property 'constructor'
const value = {
  constructor: Foo,
};
```

|     |                               | is `value` a plain object? |
| --- | ----------------------------- | -------------------------- |
|     | `is-plain` (**this package**) | `true`                     |
|     | `is-plain-obj`                | `true`                     |
| ⚠️  | `is-plain-object`             | `false`                    |
|     | `lodash.isplainobject`        | `true`                     |

#### Case 5

```js
// an object literal with a '__proto__' property as an object
const value = {
  __proto__: {},
};
```

|     |                               | is `value` a plain object? |
| --- | ----------------------------- | -------------------------- |
|     | `is-plain` (**this package**) | `true`                     |
| ⚠️  | `is-plain-obj`                | `false`                    |
|     | `is-plain-object`             | `true`                     |
| ⚠️  | `lodash.isplainobject`        | `false`                    |

#### Case 6

```js
// an instance of a prototype whose constructor is Object
function ObjectConstructor() {}
ObjectConstructor.prototype.constructor = Object;
const value = new ObjectConstructor();
```

|     |                               | is `value` a plain object? |
| --- | ----------------------------- | -------------------------- |
|     | `is-plain` (**this package**) | `true`                     |
| ⚠️  | `is-plain-obj`                | `false`                    |
|     | `is-plain-object`             | `true`                     |
|     | `lodash.isplainobject`        | `true`                     |

## License

MIT
