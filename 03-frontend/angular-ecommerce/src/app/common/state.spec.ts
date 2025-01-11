import { State } from './state';

describe('State', () => {
  it('should create an instance', () => {
    expect(new State('1', 'California', 1, 'CA', new Date(), new Date())).toBeTruthy();
  });
});
