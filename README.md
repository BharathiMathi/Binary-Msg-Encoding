# Message Encoder/Decoder

This project is a simple message encoder and decoder which is implemented in HTML and JavaScript. It allows users to input headers and a payload, which are then encoded into a message and decoded back into the original format.

## Features

- Form validation to ensure headers and payload are in the correct format.
- Error handling for encoding and decoding processes.
- Unit tests for both the encoder/decoder and form validation.

## How to Use

1. Pull the code from to your local environment.
2. Run `npm install`
3. Open the HTML file in your browser or install live server in your code editor. Right click the index.html file then select "Open with Live Server" option.
4. Enter headers in the format `key:value`, separated by new lines.
5. Enter your payload.
6. Click the "Encode and Decode" button to process your message.

After clicking the button, the encoded message will be displayed under "Encoded Message", and the decoded message will be displayed under "Decoded Message". If there are any errors in your input, they will be displayed above the "Encode and Decode" button.

## Code Structure

This project consists of the following files:

- `index.html`: Contains the form for inputting headers and payload, and the placeholders for displaying the encoded and decoded messages.
- `encode-decode.js`: Contains the `Message` and `DataPacket` classes which handle the encoding and decoding of messages.
- `validation.js`: Contains the form validation functions.
- `styles.css`: Contains the styles for the HTML file.
- `encode-decode.test.js and validation.test.js`: Contains unit tests for the `DataPacket` class and form validation functions.

## Unit Tests

This project uses Jest for unit testing. To run the tests, navigate to the project directory and run `npm test`.

## Error Handling

If there are any errors during the encoding or decoding process, such as a header name or value exceeding the size limit, or the payload exceeding the size limit, an error message will be displayed.

## Limitations

- The maximum length for a header name or value is 1023 characters.
- The maximum number of headers is 63.
- The maximum size for the payload is 256 KiB.
- Developed with plain HTML, CSS and Javascript.
