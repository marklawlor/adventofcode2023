export const exampleMode = false;

/**
 * This was my original solution, but if I would redo again, it would be with two regex
 *
 * const first = /.*?([1-9]|one|two|three|four|five|six|seven|eight|nine)/;
 * const last = /.*([1-9]|one|two|three|four|five|six|seven|eight|nine).*$/;
 */

export function parse(input: string) {
  return input.split("\n");
}

const mapping: Record<string, string> = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

export const partOneExampleSolution = 142;
export function partOne(input: ReturnType<typeof parse>) {
  return input.reduce((acc, line) => {
    const match = [...line.matchAll(/\d/g)].map((m) => m[0]);
    return acc + parseInt(`${match.at(0)}${match.at(-1)}`);
  }, 0);
}

export const partTwoExampleSolution = 281;
export function partTwo(input: ReturnType<typeof parse>) {
  let sum = 0;
  for (const line of input) {
    let match;
    const matches = [];
    const re = /[1-9]|one|two|three|four|five|six|seven|eight|nine/g;
    while ((match = re.exec(line))) {
      match = match[0];
      re.lastIndex -= match.length - 1;
      matches.push(mapping[match] ?? match);
    }
    sum += parseInt(`${matches.at(0)}${matches.at(-1)}`);
  }
  return sum;
}
