import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product('id', 'sku', 'name', 'description', 100, 'imageUrl', true, 1, new Date(), new Date())).toBeTruthy();
  });
});
