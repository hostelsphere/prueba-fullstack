import { main } from './index';

describe('main function', () => {
  it('should return "Hello World!"', async () => {
    const result = await main();
    expect(result).toBe('Hello World!');
  });
});
