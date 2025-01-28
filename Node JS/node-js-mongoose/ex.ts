const a = {
  b: 1,
  c: 'abc'
}

const sum = (a: string, b: number) => {
  return a + b
}

function createPair<S, T>(v1: S, v2: T): [S, T] {
  // flexible type
  return [v1, v2]
} // <===

console.log(createPair<string, number>('hello', 42))
