export function trimText (text, maxLen) {
  if (!text) {
    return '...'
  }
  if (text.length < 1) {
    return '...'
  }
  if (maxLen < 2) {
    maxLen = 2
  }
  if (text.length > maxLen) {
    return text.substr(0, maxLen) + '...'
  }

  return text
}
