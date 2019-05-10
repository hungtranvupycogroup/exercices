import ApplyNonGroceryDiscount from '../ApplyNonGroceryDiscount'
import { IBillItem } from '../models/Bill';
import { IItemDiscount } from '../models/Discount';

class TestItemDiscount implements IItemDiscount {
  description: 'test item discount'
  getDiscount = () => 5 // test discount
}

describe('ApplyNonGroceryDiscount', () => {
  describe('getDiscount method', () => {
    it('should have discount for none grocery item', () => {
      const testDiscount = new ApplyNonGroceryDiscount(new TestItemDiscount())
      const notGroceryItem: IBillItem = {
        name: 'laptop',
        quantity: 1,
        price: 1000 
      }
  
      expect(testDiscount.getDiscount(notGroceryItem)).toBe(5)
    })
  
    it('should not discount for grocery item', () => {
      const testDiscount = new ApplyNonGroceryDiscount(new TestItemDiscount())
      const groceryItem: IBillItem = {
        name: 'beef',
        isGrocery: true,
        quantity: 1,
        price: 1000 
      }
  
      expect(testDiscount.getDiscount(groceryItem)).toBe(0)
    })
  })

  describe('get description method', () => {
    const testDiscount = new ApplyNonGroceryDiscount(new TestItemDiscount())
    expect(testDiscount.description).toBeDefined()
  })
})