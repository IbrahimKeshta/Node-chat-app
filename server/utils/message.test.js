var expect = require('expect');
const {generateMessage, generateLocationMessage} = require('./message');
describe('generateMessage', () => {
    it('should generate correct message object', () => {
        var from = 'keshta';
        var text = 'some message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        // expect(message).objectContaining({from: expect.any('String'),text: expect.any('String')});
        expect(message).toEqual(
            expect.objectContaining({
             from,
              text,
            }),
          );
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
    var from = 'deb',
        latitude = 15,
        longitude = 19, 
        url = 'https://www.google.com/maps?q=15,19';
    let message = generateLocationMessage(from, latitude, longitude);
    expect(typeof message.createdAt).toBe('number');
    expect(message).toEqual(
        expect.objectContaining({
         from,
          url,
        }),
      );
    });
});