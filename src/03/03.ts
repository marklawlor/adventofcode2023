export const exampleMode = false;

export function parse(input: string) {
  return input.trim().split("\n");
}


export const partOneExampleSolution = 4361
export function partOne(input: ReturnType<typeof parse>) {
  let sum = 0;
const digitOrDot = new Set([".", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"])

  function hasSymbol(match: RegExpExecArray, lineNo: number) {
    if (lineNo < 0) return false
    if (lineNo >= input.length) return false

    for (let i = -1; i < match[0].length + 1; i++) {
      if ((match.index + i) < 0) continue
      if ((match.index + i) >= input[lineNo].length) continue
      const char = input[lineNo][match.index + i]
      if (!digitOrDot.has(char)) {
        return true
      }
    }

  }

  let match: RegExpExecArray | null;
  for (const [lineNo, line] of input.entries()) {
    let re = /\d+/g
    while (match = re.exec(line)) {
      let foundSymbol = hasSymbol(match, lineNo - 1) || hasSymbol(match, lineNo) || hasSymbol(match, lineNo + 1)
      if (foundSymbol) {
        sum += parseInt(match[0])
      }
    }
  }


  return sum

}

export const partTwoExampleSolution = 467835;
export function partTwo(input: ReturnType<typeof parse>) {
  let sum = 0
  for (const [lineNo, line] of input.entries()) {
    let match: RegExpExecArray | null;
    let re = /\*/g

    function getDigitsPerLine(line: string, digits: [number, string][]) {
      let re = /\d+/g
      let match
      while (match = re.exec(line)) {
        digits.push([match.index, match[0]])
      }
      return digits
    }

    while (match = re.exec(line)) {
      const adjacentDigits: [number, string][] = []
      let gear1 = 0
      let gear2 = 0

      if (lineNo - 1 >= 0) getDigitsPerLine(input[lineNo - 1], adjacentDigits)
      getDigitsPerLine(input[lineNo], adjacentDigits)
      if (lineNo + 1 < input.length) getDigitsPerLine(input[lineNo + 1], adjacentDigits)


      for (const [index, digit] of adjacentDigits) {
        if (match.index + 1 >= index && match.index -1 <= index + digit.length -1)  {
          if (!gear1) {
            gear1 ||= parseInt(digit)
          } else if (gear1) {
            gear2 = parseInt(digit)
            break
          }
        }
      }

      sum += gear1 * gear2
    }
  }

  return sum
}