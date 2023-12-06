const {
  validateForm,
  validateHeaders,
  validatePayload,
} = require("../src/validation.js");
const { TextEncoder, TextDecoder } = require("util");
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const mockElement = {
  value: "",
  textContent: "",
};

jest.spyOn(document, "getElementById").mockImplementation(() => mockElement);

describe("Form validation", () => {
  describe("validateHeaders", () => {
    it("should return error for invalid headers format", () => {
      mockElement.value = "invalidHeaderFormat";
      const error = validateHeaders(mockElement);
      expect(error).toBe(
        'Invalid headers format. Each header must be in the format "key:value".'
      );
    });

    it("should return null for valid headers", () => {
      mockElement.value = "key:value";
      const error = validateHeaders(mockElement);
      expect(error).toBe(null);
    });
  });

  describe("validatePayload", () => {
    it("should return error for empty payload", () => {
      mockElement.value = "";
      const error = validatePayload(mockElement);
      expect(error).toBe("Payload cannot be empty.");
    });

    it("should return null for non-empty payload", () => {
      mockElement.value = "payload";
      const error = validatePayload(mockElement);
      expect(error).toBe(null);
    });
  });

  describe("validateForm", () => {
    it("should validate headers and payload", () => {
      mockElement.value = "key:value";
      const error = validateForm(mockElement, mockElement);
      expect(error).toBe(null);
      expect(mockElement.textContent).toBe("");
    });

    it("should return error for invalid headers", () => {
      const headersMockElement = { value: "invalidHeaderFormat" };
      const payloadMockElement = { value: "validPayload" };
      const error = validateForm(headersMockElement, payloadMockElement);
      expect(error).toBe(
        'Invalid headers format. Each header must be in the format "key:value".'
      );
    });
  });
});
