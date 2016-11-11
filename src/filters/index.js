export function trimAuthorInfo (authorInfo) {
  if (authorInfo && authorInfo.length > 2) {
    return authorInfo
  }

  return 'No info'
}

export function trimSummary (summary) {
  if (!summary) {
    return '...'
  }
  if (summary.length < 1) {
    return '...'
  }
  if (summary.length > 48) {
    return summary.substr(0, 64) + '...'
  }

  return summary
}
