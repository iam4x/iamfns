# iamfns

A collection of lightweight, type-safe utility functions for TypeScript.

## Installation

```bash
bun add iamfns
```

## Table of Contents

- [Numbers](#numbers)
  - [afterDecimals](#afterdecimals)
  - [adjust](#adjust)
  - [add](#add)
  - [subtract](#subtract)
  - [multiply](#multiply)
  - [divide](#divide)
- [Arrays](#arrays)
  - [chunk](#chunk)
  - [orderBy](#orderby)
  - [take](#take)
  - [takeRight](#takeright)
- [Objects](#objects)
  - [getKV](#getkv)
  - [inverseObj](#inverseobj)
  - [objDelta](#objdelta)
  - [omitBy](#omitby)
  - [omitUndefined](#omitundefined)
- [JSON](#json)
  - [tryParse](#tryparse)

---

## Numbers

### `afterDecimals`

Returns the number of digits after the decimal point. Handles integers, floats, string inputs, and scientific notation.

```typescript
function afterDecimals(num: number | string): number
```

**Parameters:**
- `num` - A number or string representation of a number

**Returns:** The count of digits after the decimal point

**Example:**

```typescript
import { afterDecimals } from 'iamfns';

// Integers return 0
afterDecimals(5);       // => 0
afterDecimals(100);     // => 0

// Floats return decimal count
afterDecimals(5.25);    // => 2
afterDecimals(3.14159); // => 5

// String inputs
afterDecimals('5.25');    // => 2
afterDecimals('0.00001'); // => 5

// Scientific notation
afterDecimals(1e-5);    // => 5
afterDecimals(1.23e-7); // => 7
```

---

### `adjust`

Rounds a value to the nearest step increment. Useful for price/quantity adjustments.

```typescript
function adjust(value: number, step: number | string): number
```

**Parameters:**
- `value` - The number to adjust
- `step` - The step increment (e.g., `0.01` for cents)

**Returns:** The value rounded to the nearest step

**Example:**

```typescript
import { adjust } from 'iamfns';

adjust(10.123, 0.1);   // => 10.1
adjust(10.123, 0.01);  // => 10.12
adjust(10.126, 0.01);  // => 10.13
adjust(10.6, 1);       // => 11
adjust(10.4, 1);       // => 10

// String step values
adjust(10.123, '0.1'); // => 10.1
```

---

### `add`

Adds two numbers with correct decimal precision, avoiding floating point errors.

```typescript
function add(a: number, b: number): number
```

**Parameters:**
- `a` - First number
- `b` - Second number

**Returns:** The sum with correct precision

**Example:**

```typescript
import { add } from 'iamfns';

// Native JS: 0.1 + 0.2 = 0.30000000000000004
add(0.1, 0.2);   // => 0.3
add(0.01, 0.02); // => 0.03
add(0.3, 0.6);   // => 0.9
add(1, 0.001);   // => 1.001
```

---

### `subtract`

Subtracts two numbers with correct decimal precision, avoiding floating point errors.

```typescript
function subtract(a: number, b: number): number
```

**Parameters:**
- `a` - Number to subtract from
- `b` - Number to subtract

**Returns:** The difference with correct precision

**Example:**

```typescript
import { subtract } from 'iamfns';

// Native JS: 0.3 - 0.1 = 0.19999999999999998
subtract(0.3, 0.1);   // => 0.2
subtract(0.03, 0.01); // => 0.02
subtract(2, 0.001);   // => 1.999
subtract(0.1, 0.3);   // => -0.2
```

---

### `multiply`

Multiplies two numbers with correct decimal precision, avoiding floating point errors.

```typescript
function multiply(a: number, b: number): number
```

**Parameters:**
- `a` - First number
- `b` - Second number

**Returns:** The product with correct precision

**Example:**

```typescript
import { multiply } from 'iamfns';

// Native JS: 0.1 * 0.2 = 0.020000000000000004
multiply(0.1, 0.2);  // => 0.02
multiply(0.3, 0.3);  // => 0.09
multiply(10, 0.123); // => 1.23
multiply(2, 0.5);    // => 1
```

---

### `divide`

Divides two numbers with correct decimal precision, avoiding floating point errors.

```typescript
function divide(a: number, b: number): number
```

**Parameters:**
- `a` - Dividend
- `b` - Divisor

**Returns:** The quotient with correct precision

**Example:**

```typescript
import { divide } from 'iamfns';

divide(0.3, 0.1);    // => 3
divide(0.12, 0.1);   // => 1.2
divide(1, 0.5);      // => 2
divide(10.123, 10);  // => 1.012
```

---

## Arrays

### `chunk`

Splits an array into chunks of a specified size.

```typescript
function chunk<T>(arr: T[], size: number): T[][]
```

**Parameters:**
- `arr` - The array to split
- `size` - The size of each chunk

**Returns:** A new array of chunks

**Example:**

```typescript
import { chunk } from 'iamfns';

chunk([1, 2, 3, 4, 5], 2);
// => [[1, 2], [3, 4], [5]]

chunk(['a', 'b', 'c', 'd'], 3);
// => [['a', 'b', 'c'], ['d']]

chunk([1, 2, 3, 4, 5, 6], 2);
// => [[1, 2], [3, 4], [5, 6]]
```

---

### `orderBy`

Sorts an array by one or more criteria with configurable sort orders. Supports property keys and custom iteratee functions.

```typescript
function orderBy<T>(
  arr: T[],
  iteratees?: Array<keyof T | ((item: T) => any)>,
  orders?: Array<'asc' | 'desc'>
): T[]
```

**Parameters:**
- `arr` - The array to sort
- `iteratees` - Array of property keys or functions to sort by (defaults to identity)
- `orders` - Array of sort directions: `'asc'` or `'desc'` (defaults to `'asc'`)

**Returns:** A new sorted array

**Example:**

```typescript
import { orderBy } from 'iamfns';

const users = [
  { name: 'Charlie', age: 30 },
  { name: 'Alice', age: 25 },
  { name: 'Bob', age: 35 }
];

// Sort by name ascending
orderBy(users, ['name'], ['asc']);
// => [{ name: 'Alice', age: 25 }, { name: 'Bob', age: 35 }, { name: 'Charlie', age: 30 }]

// Sort by age descending
orderBy(users, ['age'], ['desc']);
// => [{ name: 'Bob', age: 35 }, { name: 'Charlie', age: 30 }, { name: 'Alice', age: 25 }]

// Sort by multiple criteria
orderBy(users, ['age', 'name'], ['desc', 'asc']);

// Sort primitives (uses identity by default)
orderBy([3, 1, 2]);
// => [1, 2, 3]

// Sort with custom iteratee function
const words = ['apple', 'pear', 'banana', 'kiwi'];
orderBy(words, [(w) => w.length], ['desc']);
// => ['banana', 'apple', 'pear', 'kiwi']

// Mix property keys and functions
const items = [
  { name: 'aa', value: 2 },
  { name: 'a', value: 1 },
  { name: 'aaa', value: 1 }
];
orderBy(items, [(u) => u.name.length, 'value'], ['asc', 'desc']);
```

---

### `take`

Returns the first `n` elements from an array.

```typescript
function take<T>(array: T[], n: number): T[]
```

**Parameters:**
- `array` - The source array
- `n` - The number of elements to take

**Returns:** A new array with the first `n` elements

**Example:**

```typescript
import { take } from 'iamfns';

take([1, 2, 3, 4, 5], 3);
// => [1, 2, 3]

take(['a', 'b', 'c'], 2);
// => ['a', 'b']
```

---

### `takeRight`

Returns the last `n` elements from an array.

```typescript
function takeRight<T>(array: T[], n: number): T[]
```

**Parameters:**
- `array` - The source array
- `n` - The number of elements to take from the end

**Returns:** A new array with the last `n` elements

**Example:**

```typescript
import { takeRight } from 'iamfns';

takeRight([1, 2, 3, 4, 5], 3);
// => [3, 4, 5]

takeRight(['a', 'b', 'c'], 2);
// => ['b', 'c']
```

---

## Objects

### `getKV`

Gets a value from an object by key with automatic case conversion. Tries the exact key first, then `snake_case`, then `camelCase` versions.

```typescript
function getKV(obj: Record<string, any> | undefined, key: string): any
```

**Parameters:**
- `obj` - The source object (or `undefined`)
- `key` - The key to look up

**Returns:** The value if found, otherwise `undefined`

**Example:**

```typescript
import { getKV } from 'iamfns';

// Direct key match
getKV({ testKey: 'value' }, 'testKey');
// => 'value'

// camelCase key finds snake_case property
getKV({ test_key: 'value' }, 'testKey');
// => 'value'

// snake_case key finds camelCase property
getKV({ testKey: 'value' }, 'test_key');
// => 'value'

// Complex key conversion
getKV({ my_complex_key_name: 'value' }, 'myComplexKeyName');
// => 'value'

// Handles undefined objects
getKV(undefined, 'testKey');
// => undefined

// Returns undefined when key not found
getKV({ otherKey: 'value' }, 'testKey');
// => undefined
```

---

### `inverseObj`

Inverts the keys and values of an object.

```typescript
function inverseObj<K extends PropertyKey, V extends PropertyKey>(
  obj: Record<K, V>
): Record<V, K>
```

**Parameters:**
- `obj` - An object with keys and values that are valid property keys (string, number, or symbol)

**Returns:** A new object with keys and values swapped

**Example:**

```typescript
import { inverseObj } from 'iamfns';

inverseObj({ a: 'x', b: 'y', c: 'z' });
// => { x: 'a', y: 'b', z: 'c' }

inverseObj({ one: 1, two: 2, three: 3 });
// => { 1: 'one', 2: 'two', 3: 'three' }

// Note: duplicate values will be overwritten
inverseObj({ a: 'x', b: 'x', c: 'y' });
// => { x: 'b', y: 'c' }
```

---

### `objDelta`

Returns the changed properties between two objects. Only includes keys that exist in the first object and have different values in the second object.

```typescript
function objDelta<T extends Record<string, any>>(obj1: T, obj2: T): Partial<T>
```

**Parameters:**
- `obj1` - The original object (defines which keys to compare)
- `obj2` - The updated object (source of new values)

**Returns:** An object containing only the properties that changed

**Example:**

```typescript
import { objDelta } from 'iamfns';

// Single property changed
objDelta({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 4 });
// => { c: 4 }

// Multiple properties changed
objDelta({ a: 1, b: 2, c: 3 }, { a: 10, b: 2, c: 30 });
// => { a: 10, c: 30 }

// No changes returns empty object
objDelta({ a: 1, b: 2 }, { a: 1, b: 2 });
// => {}

// Only compares keys from first object
objDelta({ a: 1, b: 2 }, { a: 10, b: 2, c: 30 });
// => { a: 10 }  (c is ignored since it's not in obj1)

// Excludes undefined values from delta
objDelta({ a: 1, b: 2, c: 3 }, { a: 1, b: undefined, c: 4 });
// => { c: 4 }
```

---

### `omitBy`

Filters an object's entries based on a predicate function. Keeps only the entries where the filter returns `true`.

```typescript
function omitBy<T extends Record<string, any>>(
  obj: T,
  filter: (key: keyof T, value: T[keyof T]) => boolean
): T
```

**Parameters:**
- `obj` - The source object
- `filter` - A predicate function that receives the key and value, returns `true` to keep the entry

**Returns:** A new object with only the entries that match the filter

**Example:**

```typescript
import { omitBy } from 'iamfns';

// Keep only entries with value greater than 1
omitBy({ a: 1, b: 2, c: 3 }, (_key, value) => value > 1);
// => { b: 2, c: 3 }

// Keep only entries with specific keys
omitBy({ a: 1, b: 2, c: 3 }, (key) => key !== 'b');
// => { a: 1, c: 3 }

// Keep only truthy values
omitBy({ a: 0, b: '', c: 'hello', d: 42 }, (_key, value) => Boolean(value));
// => { c: 'hello', d: 42 }

// Filter by both key and value
omitBy({ name: 'John', age: 30, active: true }, (key, value) =>
  typeof value === 'string' || key === 'active'
);
// => { name: 'John', active: true }
```

---

### `omitUndefined`

Removes all properties with `undefined` values from an object. Preserves `null`, `false`, `0`, and empty string values.

```typescript
function omitUndefined<T extends Record<string, any>>(obj: T): OmitUndefined<T>
```

**Parameters:**
- `obj` - The source object

**Returns:** A new object with all `undefined` values removed

**Example:**

```typescript
import { omitUndefined } from 'iamfns';

omitUndefined({ a: 1, b: undefined, c: 'test' });
// => { a: 1, c: 'test' }

omitUndefined({ a: null, b: undefined, c: 0 });
// => { a: null, c: 0 }

omitUndefined({ a: false, b: '', c: 0, d: undefined });
// => { a: false, b: '', c: 0 }
```

---

## JSON

### `tryParse`

Safely parses a JSON string, returning `undefined` instead of throwing on invalid input.

```typescript
function tryParse<T>(json: any): T | undefined
```

**Parameters:**
- `json` - The JSON string to parse

**Returns:** The parsed value typed as `T`, or `undefined` if parsing fails

**Example:**

```typescript
import { tryParse } from 'iamfns';

tryParse<{ a: number }>('{"a": 1}');
// => { a: 1 }

tryParse<{ a: number }>('invalid json');
// => undefined

tryParse<number[]>('[1, 2, 3]');
// => [1, 2, 3]
```

---

## Development

```bash
# Install dependencies
bun install

# Run tests
bun test

# Build
bun run build

# Lint
bun run lint
```

## License

MIT
