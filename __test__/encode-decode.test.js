const { Message, DataPacket } = require("../src/encode-decode");
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

describe("DataPacket", () => {
  let codec, message;

  beforeEach(() => {
    codec = new DataPacket();
    message = new Message();
    message.headers = {
      header1: "value1",
      header2: "value2",
    };
    message.payload = new TextEncoder().encode("This is a test payload");
  });

  it("should correctly encode a message", () => {
    const encodedMessage = codec.encode(message);
    expect(encodedMessage).toBeInstanceOf(Uint8Array);
  });

  it("should correctly decode a message", () => {
    const encodedMessage = codec.encode(message);
    const decodedMessage = codec.decode(encodedMessage);
    expect(decodedMessage.payload).toBeInstanceOf(Uint8Array);
  });

  it("should return an error if a header name or value exceeds size limit", () => {
    message.headers = {
      header1: "a".repeat(1024), // this will make the length of the value exceed 1023
    };
    const result = codec.encode(message);
    expect(result).toEqual("Header name or value exceeds size limit");
  });

  it("should return an error if the number of headers exceeds the limit", () => {
    // Create a message with 64 headers
    for (let i = 0; i < 64; i++) {
      message.headers[`header${i}`] = `value${i}`;
    }

    const result = codec.encode(message);
    expect(result).toBe("Headers length should not be more than 63");
  });

  it("should return an error if payload exceeds size limit", () => {
    message.payload = new Uint8Array(256 * 1024 + 1); // this will make the length of the payload exceed 256 KiB
    const result = codec.encode(message);
    expect(result).toEqual("Payload exceeds size limit");
  });
});
