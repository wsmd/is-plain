/**
 * Tests if value is a plain object (an object created with the Object
 * constructor, an object without a prototype, or an object literal).
 *
 * @param value {*}
 * @returns boolean
 */
function isPlain<T>(value: T): boolean {
  if (Object.prototype.toString.call(value) !== '[object Object]') {
    return false;
  }

  // if the object has own 'constructor' property, we fallback to the
  // constructor of its prototype
  const ctor = Object.prototype.hasOwnProperty.call(value, 'constructor')
    ? Object.getPrototypeOf(value).constructor
    : (value as {}).constructor;

  return (
    !ctor /* objects created with Object.create(null) */ ||
    ctor === Object /* constructor must be Object */
  );
}

export default isPlain;
