export const exampleMode = true;

export function parse(input: string) {
  return input.trim().split("\n");
}

export const partOneExampleSolution = 288;
export function partOne(input: ReturnType<typeof parse>) {
  const times = [...input[0].matchAll(/\d+/g)].map(Number);
  const records = [...input[1].matchAll(/\d+/g)].map(Number);

  const races = times.map((time, i) => ({ time, record: records[i] }));

  let sum = 0;

  for (const { time, record } of races) {
    let count = 0;

    for (let i = 0; i < time + 1; i++) {
      if ((time - i) * i > record) {
        count++;
      }
    }

    if (count) {
      sum = sum ? sum * count : count;
    }
  }

  return sum;
}

export const partTwoExampleSolution = 71503;
export function partTwo(input: ReturnType<typeof parse>) {
  const time = parseInt([...input[0].matchAll(/\d+/g)].join(""));
  const record = parseInt([...input[1].matchAll(/\d+/g)].join(""));

  let count = 0;

  for (let i = 0; i < time + 1; i++) {
    if ((time - i) * i > record) {
      count++;
    }
  }

  return count;
}
