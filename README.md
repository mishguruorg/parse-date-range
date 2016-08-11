# parse-date-range [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Parses two strings to determine whether they are valid ISO8601 Dates. Otherwise returns a date range of a given length (defaults to one week).

## Installation

```sh
$ npm install --save parse-date-range
```

## Usage

```js
import parseDateRange from 'parse-date-range'

const res = parseDateRange('2016-08-11T10:39:56+00:00', '2016-08-11T10:39:56+00:00')
const startDate = res.startDate // Date object
const endDate = res.startDate // Date object
```
## License

MIT © [Mish Guru](mish.guru)


[npm-image]: https://badge.fury.io/js/parse-date-range.svg
[npm-url]: https://npmjs.org/package/parse-date-range
[travis-image]: https://travis-ci.org/mishguruorg/parse-date-range.svg?branch=master
[travis-url]: https://travis-ci.org/mishguruorg/parse-date-range
[daviddm-image]: https://david-dm.org/mishguruorg/parse-date-range.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mishguruorg/parse-date-range
