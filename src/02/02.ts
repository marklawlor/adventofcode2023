export const exampleMode = false;

export function parse(input: string) {
  return input
    .trim()
    .split("\n")
    .map((line) =>
      line
        .split(":")[1]
        .split(";")
        .map((rule) =>
          rule
            .trim()
            .split(", ")
            .map((n) => {
              const [num, color] = n.split(" ");
              return [parseInt(num), color] as const;
            })
        )
    );
}

export const partOneExampleSolution = 8;
export function partOne(input: ReturnType<typeof parse>) {
  let sum = 0;
  for (const [index, line] of input.entries()) {
    const isRevealPossible = line.every((sets) => {
      return sets.every(([num, color]) => {
        if (color === "red") return num <= 12;
        if (color === "green") return num <= 13;
        if (color === "blue") return num <= 14;
        return false;
      });
    });

    if (isRevealPossible) {
      sum += index + 1;
    }
  }

  return sum;
}

export const partTwoExampleSolution = 2286;
export function partTwo(input: ReturnType<typeof parse>) {
  let sum = 0;
  for (const line of input) {
    let maxRed = 0;
    let maxGreen = 0;
    let maxBlue = 0;

    for (const sets of line) {
      for (const [num, color] of sets) {
        if (color === "red") {
          maxRed = Math.max(maxRed, num);
        }
        if (color === "green") {
          maxGreen = Math.max(maxGreen, num);
        }
        if (color === "blue") {
          maxBlue = Math.max(maxBlue, num);
        }
      }
    }

    sum += maxRed * maxBlue * maxGreen;
  }

  return sum;
}
