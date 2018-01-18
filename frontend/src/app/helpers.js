// convert timestamp to human readable format
export function humanDate(timestamp = Date.now()) {
  return new Date(timestamp).toUTCString();
}
