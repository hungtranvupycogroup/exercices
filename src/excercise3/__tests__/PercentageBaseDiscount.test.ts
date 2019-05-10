import PercentageBaseDiscount from '../PercentageBaseDiscount'
import { IBillItem } from '../models/Bill';

describe('PercentageBaseDiscount', () => {
  it('should have discount for item', () => {
    const testDiscount = new PercentageBaseDiscount('test', 20)
    const notGroceryItem: IBillItem = {
      name: 'laptop',
      quantity: 1,
      price: 1000 
    }
    expect(testDiscount.description).toBe('test')
    expect(testDiscount.percent).toBe(20)
    expect(testDiscount.getDiscount(notGroceryItem)).toBe(200)
  })
})