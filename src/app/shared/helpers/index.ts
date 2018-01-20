const typeCache: { [label: string]: boolean } = {};

/**
 * This function coerces a string into a string literal type.
 * Using tagged union types in TypeScript 2.0, this enables
 * powerful typechecking of our reducers.
 *
 * Since every action label passes through this function it
 * is a good place to ensure all of our action labels are unique.
 *
 * @param label
 */
export function type<T>(label: T | ""): T {
  if (typeCache[<string>label]) {
    throw new Error(`Action type "${label}" is not unqiue"`);
  }

  typeCache[<string>label] = true;

  return <T>label;
}

export function flattenArray(arr: any[]): any[] {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    out.push.apply(out, Array.isArray(arr[i]) ? flattenArray(arr[i]) : [arr[i]]);
  }

  return out;
}
