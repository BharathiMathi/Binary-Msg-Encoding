class Message {
  constructor() {
    this.headers = {};
    this.payload = new Uint8Array(256 * 1024); // 256 KiB;
  }
}

class DataPacket {
  constructor() {
    this.encoder = new TextEncoder();
    this.decoder = new TextDecoder();
  }

  encode(message) {
    try {
      const headersArray = [];
      for (let [key, value] of Object.entries(message.headers)) {
        if (key.length > 1023 || value.length > 1023) {
          return "Header name or value exceeds size limit";
        }
        headersArray.push(
          this.encoder.encode(
            String.fromCharCode(key.length) +
              key +
              String.fromCharCode(value.length) +
              value
          )
        );
      }
      if (headersArray.length > 63) {
        return "Headers length should not be more than 63";
      }

      // Calculate total length of headers.
      const headersLength = headersArray.reduce(
        (sum, arr) => sum + arr.length,
        0
      );
      const headers = new Uint8Array(headersLength + 2); // 2 for separator.

      // Copy each header into headers.
      let offset = 0;
      for (const arr of headersArray) {
        headers.set(arr, offset);
        offset += arr.length;
      }

      // Add separator.
      headers.set([0, 0], offset);

      const payload = message.payload;
      if (payload.byteLength > 256 * 1024) {
        return "Payload exceeds size limit";
      }

      // Concatenate headers and payload.
      const combined = new Uint8Array(headers.byteLength + payload.byteLength);
      combined.set(headers);
      combined.set(payload, headers.byteLength);

      return combined;
    } catch (error) {
      console.error("Error occurred during encoding:", error);
      return "Encoding error occurred";
    }
  }

  decode(data) {
    try {
      let message = new Message();
      let i = 0;

      // Decode headers
      while (i < data.length && (data[i] !== 0 || data[i + 1] !== 0)) {
        // Stop when we reach the separator (two null bytes)
        const nameLength = data[i++];
        const name = this.decoder.decode(data.subarray(i, i + nameLength));
        i += nameLength;

        const valueLength = data[i++];
        const value = this.decoder.decode(data.subarray(i, i + valueLength));
        i += valueLength;

        message.headers[name] = value;
      }

      // Skip over separator
      i += 2;

      // The rest of the data is the payload
      if (i < data.length) {
        message.payload = data.subarray(i);
      } else {
        message.payload = new Uint8Array(); // Empty array if no payload
      }

      return message;
    } catch (error) {
      console.error("Error occurred during decoding:", error);
      return "Decoding error occurred";
    }
  }
}

module.exports = { DataPacket, Message };
