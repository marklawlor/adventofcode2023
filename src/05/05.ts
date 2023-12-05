export const exampleMode = false;

let line;

function processPart1Mapping(lines: string[], prevMap: Map<number, number>) {
  const entries = [...prevMap.entries()];

  while ((line = lines.shift())) {
    const [dest, source, range] = line.split(" ").map(Number);

    for (const [seed, prev] of entries) {
      if (prev >= source && prev < source + range) {
        const offset = prev - source;
        prevMap.set(seed, dest + offset);
      }
    }
  }
}

export function parse(input: string) {
  return input.trim().split("\n");
}

export const partOneExampleSolution = 35;
export function partOne(input: ReturnType<typeof parse>) {
  const seeds = input.shift()!.replace("seeds: ", "").split(" ").map(Number);

  input.shift(); // empty line

  const seedMapping = new Map(seeds.map((seed) => [seed, seed]));

  input.shift(); // seed-to-soil-map
  processPart1Mapping(input, seedMapping);

  input.shift(); // soil-to-fertilizer map
  processPart1Mapping(input, seedMapping);

  input.shift(); // fertilizer-to-water map
  processPart1Mapping(input, seedMapping);

  input.shift(); // water-to-light map
  processPart1Mapping(input, seedMapping);

  input.shift(); // light-to-temp map
  processPart1Mapping(input, seedMapping);

  input.shift(); // temp-to-humidity map
  processPart1Mapping(input, seedMapping);

  input.shift(); // humidity-to-location map
  processPart1Mapping(input, seedMapping);

  return Math.min(...seedMapping.values());
}

function processPart2Mapping(lines: string[], pairing: Set<[number, number]>) {
  const newPairings = new Set<[number, number]>();

  const mapping: number[][] = [];
  while ((line = lines.shift())) {
    mapping.push(line.split(" ").map(Number));
  }

  for (const [seedStart, seedRange] of pairing) {
    let found = false;

    for (const [dest, source, range] of mapping) {
      const seedEnd = seedStart + seedRange - 1;
      const sourceEnd = source + range - 1;

      if (seedEnd < source || seedStart > sourceEnd) {
        continue;
      }

      found = true;

      const overlapStart = Math.max(seedStart, source);
      const overlapRange = Math.min(seedEnd, sourceEnd) - overlapStart + 1;

      const offset = overlapStart - source;

      newPairings.add([dest + offset, overlapRange]);

      if (seedStart < source) {
        pairing.add([seedStart, source - seedStart]);
      }

      if (seedEnd > source + range) {
        pairing.add([source + range, seedEnd - (source + range)]);
      }
    }

    if (!found) {
      newPairings.add([seedStart, seedRange]);
    }
  }

  return newPairings;
}

export const partTwoExampleSolution = 46;
export function partTwo(input: ReturnType<typeof parse>) {
  const seedArray = input
    .shift()!
    .replace("seeds: ", "")
    .split(" ")
    .map(Number);

  let seeds = new Set<[number, number]>();

  for (let i = 0; i < seedArray.length; i += 2) {
    seeds.add([seedArray[i], seedArray[i + 1]]);
  }

  input.shift(); // empty line
  input.shift(); // seed-to-soil-map
  seeds = processPart2Mapping(input, seeds);

  input.shift(); // soil-to-fertilizer map
  seeds = processPart2Mapping(input, seeds);

  input.shift(); // fertilizer-to-water map
  seeds = processPart2Mapping(input, seeds);

  input.shift(); // water-to-light map
  seeds = processPart2Mapping(input, seeds);

  input.shift(); // light-to-temp map
  seeds = processPart2Mapping(input, seeds);

  input.shift(); // temp-to-humidity map
  seeds = processPart2Mapping(input, seeds);

  input.shift(); // humidity-to-location map
  seeds = processPart2Mapping(input, seeds);

  return Math.min(...new Set([...seeds].map(([start]) => start)));
}
