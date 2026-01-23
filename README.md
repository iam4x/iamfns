# iamfns

A collection of lightweight, type-safe utility functions for TypeScript.

## Installation

```bash
bun add iamfns
```

## Table of Contents

- [Numbers](#numbers)
  - [abbreviateNumber](#abbreviatenumber)
  - [afterDecimals](#afterdecimals)
  - [adjust](#adjust)
  - [add](#add)
  - [calcPercent](#calcpercent)
  - [calcVolatility](#calcvolatility)
  - [subtract](#subtract)
  - [multiply](#multiply)
  - [divide](#divide)
  - [genIntId](#genintid)
  - [pFloat](#pfloat)
  - [roundDecimals](#rounddecimals)
- [Arrays](#arrays)
  - [chunk](#chunk)
  - [last](#last)
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
- [Strings](#strings)
  - [stringify](#stringify)
  - [parse](#parse)

---

## Numbers

### `abbreviateNumber`

Formats large numbers with K, M, B, T suffixes for better readability.

```typescript
function abbreviateNumber(n: number): number | string
```

**Parameters:**
- `n` - The number to abbreviate

**Returns:** The original number if < 1000, otherwise a string with suffix (K, M, B, T)

**Example:**

```typescript
import { abbreviateNumber } from 'iamfns';

// Numbers < 1000 return as-is
abbreviateNumber(500);  // => 500
abbreviateNumber(999);  // => 999

// Thousands (K)
abbreviateNumber(1000);   // => '1k'
abbreviateNumber(1500);   // => '1.5k'
abbreviateNumber(50000);  // => '50k'

// Millions (M)
abbreviateNumber(1000000);  // => '1m'
abbreviateNumber(1500000);  // => '1.5m'

// Billions (B)
abbreviateNumber(1000000000);  // => '1b'
abbreviateNumber(1500000000);  // => '1.5b'

// Trillions (T)
abbreviateNumber(1000000000000);  // => '1t'

// Negative numbers
abbreviateNumber(-1500);    // => '-1.5k'
abbreviateNumber(-1000000); // => '-1m'
```

---

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

### `calcPercent`

Calculates the percentage change between two values.

```typescript
function calcPercent({ now, start }: { now: number; start: number }): number
```

**Parameters:**
- `now` - The current value
- `start` - The starting/reference value

**Returns:** The percentage change (positive for increase, negative for decrease)

**Example:**

```typescript
import { calcPercent } from 'iamfns';

// Positive change (50% increase)
calcPercent({ now: 150, start: 100 }); // => 50

// Negative change (50% decrease)
calcPercent({ now: 50, start: 100 });  // => -50

// No change
calcPercent({ now: 100, start: 100 }); // => 0

// Both zero
calcPercent({ now: 0, start: 0 });     // => 0

// Division by zero (start is 0)
calcPercent({ now: 100, start: 0 });   // => Infinity

// Decimal values
calcPercent({ now: 1.5, start: 1 });   // => 50
```

---

### `calcVolatility`

Calculates the volatility (standard deviation of percentage changes) for a series of values. Useful for measuring price fluctuations in financial data.

```typescript
function calcVolatility(values: number[]): number
```

**Parameters:**
- `values` - An array of numeric values (e.g., prices over time)

**Returns:** The volatility as standard deviation of percentage changes

**Example:**

```typescript
import { calcVolatility } from 'iamfns';

// Varying changes = higher volatility
calcVolatility([100, 110, 100]); // => ~13.49

// Price series with fluctuations
calcVolatility([100, 105, 102, 108, 106, 110]); // => > 0

// Consistent percentage changes = no volatility
calcVolatility([100, 200, 400]); // => 0 (doubling each time)

// Constant values = no volatility
calcVolatility([100, 100, 100]); // => 0

// Need at least 3 values for meaningful result
calcVolatility([100, 110]); // => 0
calcVolatility([100]);      // => 0
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

### `genIntId`

Generates a random integer ID between 0 and 999,999.

```typescript
function genIntId(): number
```

**Returns:** A random integer from 0 to 999,999

**Example:**

```typescript
import { genIntId } from 'iamfns';

genIntId(); // => 482957
genIntId(); // => 139482
genIntId(); // => 7234
```

---

### `pFloat`

Parses a number from a string with support for comma decimal separators (European format). Returns `NaN` for undefined or invalid input.

```typescript
function pFloat(value?: number | string): number
```

**Parameters:**
- `value` - A number or string to parse (optional)

**Returns:** The parsed number, or `NaN` if invalid/undefined

**Example:**

```typescript
import { pFloat } from 'iamfns';

// Numbers pass through
pFloat(42);      // => 42
pFloat(3.14);    // => 3.14

// Standard decimal strings
pFloat('42');    // => 42
pFloat('3.14');  // => 3.14

// European format (comma as decimal separator)
pFloat('3,14');  // => 3.14
pFloat('10,50'); // => 10.5

// Handles undefined safely
pFloat(undefined); // => NaN

// Invalid strings
pFloat('invalid'); // => NaN
pFloat('');        // => NaN

// Scientific notation
pFloat('1e6');   // => 1000000
pFloat('2.5e3'); // => 2500
```

---

### `roundDecimals`

Rounds a number to a specified number of decimal places.

```typescript
function roundDecimals(num: number, decimals: number = 8): number
```

**Parameters:**
- `num` - The number to round
- `decimals` - The number of decimal places (default: 8)

**Returns:** The rounded number

**Example:**

```typescript
import { roundDecimals } from 'iamfns';

// Round to integer
roundDecimals(3.14, 0);  // => 3
roundDecimals(3.5, 0);   // => 4

// Round to 1 decimal
roundDecimals(3.14, 1);  // => 3.1
roundDecimals(3.15, 1);  // => 3.2

// Round to 2 decimals
roundDecimals(3.14159, 2); // => 3.14
roundDecimals(3.145, 2);   // => 3.15

// Round to many decimals
roundDecimals(3.14159265359, 4); // => 3.1416

// Handles floating point issues
roundDecimals(0.1 + 0.2, 1); // => 0.3

// Negative numbers
roundDecimals(-3.14, 1); // => -3.1
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

### `last`

Returns the last element of an array.

```typescript
function last<T>(array: T[]): T | undefined
```

**Parameters:**
- `array` - The source array

**Returns:** The last element, or `undefined` if the array is empty

**Example:**

```typescript
import { last } from 'iamfns';

last([1, 2, 3]);       // => 3
last(['a', 'b', 'c']); // => 'c'
last([42]);            // => 42
last([]);              // => undefined
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

## Strings

### `stringify`

Converts an object to a URL query string. Supports arrays, nested objects, and properly encodes special characters.

```typescript
function stringify(obj: Record<string, any>): string
```

**Parameters:**
- `obj` - The object to convert

**Returns:** A URL-encoded query string

**Example:**

```typescript
import { stringify } from 'iamfns';

// Simple object
stringify({ a: 1, b: '2', c: true });
// => 'a=1&b=2&c=true'

// Arrays (repeated keys)
stringify({ tags: ['js', 'ts', 'node'] });
// => 'tags=js&tags=ts&tags=node'

// Nested objects (bracket notation)
stringify({ user: { name: 'John', age: 30 } });
// => 'user[name]=John&user[age]=30'

// Null/undefined values (flags)
stringify({ a: null, b: undefined, c: 'value' });
// => 'a&b&c=value'

// Special characters are encoded
stringify({ q: 'hello world' });
// => 'q=hello%20world'
```

---

### `parse`

Parses a URL query string into an object. Handles arrays, nested objects with bracket notation, and decodes special characters.

```typescript
function parse(str: string): Record<string, any>
```

**Parameters:**
- `str` - The query string to parse (with or without leading `?`)

**Returns:** The parsed object

**Example:**

```typescript
import { parse } from 'iamfns';

// Simple query string
parse('a=1&b=2&c=true');
// => { a: '1', b: '2', c: 'true' }

// With leading question mark
parse('?name=John&age=30');
// => { name: 'John', age: '30' }

// Repeated keys become arrays
parse('tag=js&tag=ts&tag=node');
// => { tag: ['js', 'ts', 'node'] }

// Bracket notation becomes nested object
parse('user[name]=John&user[age]=30');
// => { user: { name: 'John', age: '30' } }

// Flags (keys without values)
parse('active&verified&role=admin');
// => { active: true, verified: true, role: 'admin' }

// Decodes special characters
parse('q=hello%20world');
// => { q: 'hello world' }
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
