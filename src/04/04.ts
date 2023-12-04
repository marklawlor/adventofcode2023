export const exampleMode = false;

export function parse(input: string) {
  return input
    .trim()
    .split("\n")
    .map((line) => line.replace(/Card\s+\d+:\s+/, ""));
}

export const partOneExampleSolution = 13;
export function partOne(input: ReturnType<typeof parse>) {
  let sum = 0;

  for (const line of input) {
    const [winningCard, myCard] = line.split(" | ");
    const winningSet = winningCard.split(/\s+/).map((n) => {
      return parseInt(n.trim());
    });
    const myNumbers = myCard.split(/\s+/).map((n) => parseInt(n.trim()));

    let total = 0;

    for (const n of winningSet) {
      if (myNumbers.includes(n)) {
        if (total === 0) {
          total = 1;
        } else {
          total *= 2;
        }
      }
    }

    sum += total;
  }

  return sum;
}

export const partTwoExampleSolution = 30;
export function partTwo(input: ReturnType<typeof parse>) {
  const cards: number[] = [];
  const copiesForCard: number[][] = [];

  for (const [i, line] of input.entries()) {
    const [winningCard, myCard] = line.split(" | ");
    const winningSet = winningCard.split(/\s+/).map((n) => parseInt(n.trim()));
    const myNumbers = myCard.split(/\s+/).map((n) => parseInt(n.trim()));

    let copyCount = 0;
    let copies = [];

    for (const n of winningSet) {
      if (myNumbers.includes(n)) {
        copyCount++;
        copies.push(i + copyCount);
      }
    }

    cards.push(i);
    copiesForCard.push(copies);
  }

  return getTotalCards(cards, copiesForCard, []).length;
}

function getTotalCards(
  indices: number[],
  copiesToAdd: number[][],
  copies: number[]
): number[] {
  for (const index of indices) {
    copies.push(index);
    getTotalCards(copiesToAdd[index], copiesToAdd, copies);
  }
  return copies;
}
