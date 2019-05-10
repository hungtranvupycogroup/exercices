import ApplyNonGroceryDiscount from '../ApplyNonGroceryDiscount'
import { IBillItem } from '../Bill';
import { IItemDiscount } from '../Discount';

describe('ApplyNonGroceryDiscount', () => {
  class TestItemDiscount implements IItemDiscount {
    description: 'test item discount'
    getDiscount = () => 5 // test discount
  }

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