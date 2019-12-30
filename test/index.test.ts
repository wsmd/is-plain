import isPlain from '../src';

describe('returns true for Object values', () => {
  test.each<any[]>([
    ['{}', {}],
    ["{ foo: 'bar' }", { foo: 'bar' }],
    ['new Object()', new Object()],
    ['Object.create({})', Object.create({})],
    ['Object.create(null)', Object.create(null)],
    ['Object.create(Object.prototype)', Object.create(Object.prototype)],
    [
      'Object.create({ constructor: Object })',
      Object.create({ constructor: Object }),
    ],
    ['{ prototype: {} }', { prototype: {} }],
    ['{ constructor: Foo }', { constructor: class Foo {} }],
    ['{ __proto__: {} }', { __proto__: {} }],
  ])('%s', (_, value) => {
    expect(isPlain(value)).toBe(true);
  });
});

describe('returns false for non-Object values', () => {
  test.each<any[]>([
    // primitives

    ['truthy number', 1],
    ['falsy number', 0],
    ['string', ''],
    ['null', null],
    ['boolean: true', true],
    ['boolean: false', false],
    ['undefined', undefined],
    ['Symbol()', Symbol()],
    ['BigInt()', BigInt('0x1fffffffffffff')],

    // constructors and special objects

    ['Boolean', Boolean],
    ['BigInt', BigInt],
    ['Error', Error],
    ['Array', Array],
    ['Symbol', Symbol],
    ['Map', Number],
    ['Number', ArrayBuffer],
    ['Infinity', Infinity],
    ['Number', Number],
    ['NaN', NaN],
    ['Math', Math],
    ['JSON', JSON],
    [
      'arguments object',
      (function() {
        return arguments;
      })(),
    ],

    // non-Object objects

    ['[]', []],
    ['new RegExp("")', new RegExp('')],
    ['/\\/i', /\\/i],
    ['new Map()', new Map()],
    ['new Date()', new Date()],
    ['new Array()', new Array()],
    ['new Error()', new Error()],
    ['() => {}', () => {}],
    ['[1, "foo"]', [1, 'foo']],
    ['class Foo {}', class Foo {}],
    ['function() {}', function() {}],

    // functions instances

    ['new Foo()', new (class Foo {})()],
    ['new (function Bar() {})()', new (function Bar() {} as any)()],

    // other objects
    [
      'object with Symbol.toStringTag property',
      (() => {
        var object = {};
        (object as any)[Symbol.toStringTag] = 'Foo';
        return object;
      })(),
    ],
    [
      'object with Symbol.toStringTag property (defineProperty)',
      (() => {
        const object = {};
        Object.defineProperty(object, Symbol.toStringTag, { value: 'Foo' });
        return object;
      })(),
    ],
    [
      'instance with own constructor and prototype properties',
      (() => {
        return new (function Baz(this: any) {
          this.prototype = '';
          this.constructor = () => {};
        } as any)();
      })(),
    ],
  ])('%s', (_, value) => {
    expect(isPlain(value)).toBe(false);
  });

  if (typeof document !== 'undefined') {
    test('HTML Element', () => {
      expect(isPlain(document.createElement('div'))).toBe(false);
    });
  }
});
