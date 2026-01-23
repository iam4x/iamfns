# iamfns

A collection of lightweight, type-safe utility functions for TypeScript.

## Installation

```bash
bun add iamfns
```

## Table of Contents

- [Numbers](#numbers)
  - [afterDecimals](#afterdecimals)
- [Arrays](#arrays)
  - [chunk](#chunk)
  - [orderBy](#orderby)
  - [take](#take)
  - [takeRight](#takeright)
- [Objects](#objects)
  - [inverseObj](#inverseobj)
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
