export default function isComposing(event) {
  // Some browsers end composition before Enter; keyCode 229 still identifies the IME key.
  return Boolean(event?.isComposing || event?.keyCode === 229)
}
