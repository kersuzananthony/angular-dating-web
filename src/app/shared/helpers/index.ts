export function flattenArray(arr: any[]): any[] {
  const out = [];
  for (let i = 0; i < arr.length; i++) {
    out.push.apply(out, Array.isArray(arr[i]) ? flattenArray(arr[i]) : [arr[i]]);
  }

  return out;
}
