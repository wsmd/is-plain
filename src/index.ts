/**
 * Tests if value is a plain object (an object created with the Object
 * constructor, an object without a prototype, or an object literal).
 *
 * @param value {*}
 * @returns boolean
 */
function isPlain(value: unknown): value is object {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  const prototype = Object.getPrototypeOf(value);

  return (
    !prototype /* objects created with Object.create(null) */ ||
    prototype.constructor === Object /* constructor must be Object */
  );
}

export default isPlain;
