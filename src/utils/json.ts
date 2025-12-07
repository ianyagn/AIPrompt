export function sanitizeJson(rawString: string) {
  let jsonString = rawString;
  if (jsonString.charCodeAt(0) === 0xFEFF) {
    jsonString = jsonString.slice(1);
  }

  let inString = false;
  let result = '';
  let i = 0;

  while (i < jsonString.length) {
    const char = jsonString[i];

    if (char === '"') {
      let backslashCount = 0;
      let j = i - 1;
      while (j >= 0 && jsonString[j] === '\\') {
        backslashCount++;
        j--;
      }
      if (backslashCount % 2 === 0) {
        inString = !inString;
      }
    }

    if (inString) {
      if (char === '\n') {
        result += '\\n';
      } else if (char === '\r') {
        result += '\\r';
      } else if (char === '\t') {
        result += '\\t';
      } else {
        result += char;
      }
    } else {
      result += char;
    }
    i++;
  }

  result = result.replace(/,(\s*[}\]])/g, '$1');

  return result;
}
