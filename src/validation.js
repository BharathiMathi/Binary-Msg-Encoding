function validateHeaders(headersInput) {
  const headers = headersInput.value.split("\n");
  for (const header of headers) {
    const [key, value] = header.split(":");
    if (!key || !value) {
      return 'Invalid headers format. Each header must be in the format "key:value".';
    }
  }
  return null;
}

function validatePayload(payloadInput) {
  const payload = payloadInput.value;
  if (!payload) {
    return "Payload cannot be empty.";
  }
  return null;
}

function validateForm(headersInput, payloadInput) {
  const headersError = validateHeaders(headersInput);
  document.getElementById("headersError").textContent = headersError || "";

  const payloadError = validatePayload(payloadInput);
  document.getElementById("payloadError").textContent = payloadError || "";

  return headersError || payloadError;
}

module.exports = { validateForm, validateHeaders, validatePayload };
