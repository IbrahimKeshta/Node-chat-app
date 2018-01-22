var expect = require('expect');
const generateMessage = require('./message');
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