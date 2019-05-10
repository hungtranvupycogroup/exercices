import BillCalculator from '../BillCalculator'
import { IBill } from '../models/Bill';
import { IItemDiscount, IDiscount } from '../models/Discount';

describe('BillCalculator', () => {
  describe('getNetPayableAmount method', () => {
    it('should make discount if having discount set', () => {
      const bill: IBill = {
        user: {
          name: 'anonymous'
        },
        items: [{
          name: 'some goods',
          price: 10,
          quantity: 2
        }]
      }
      const itemDiscount: IItemDiscount = {
        description: 'item discount',
        getDiscount: () => 1
      }
      const billDiscount: IDiscount = {
        description: 'bill discount',
        getDiscount: () => 1
      }
      const billCalculator = new BillCalculator(bill, itemDiscount, billDiscount)
      expect(billCalculator.getNetPayableAmount()).toEqual(18)
    })

    it('should not make discount if having no discount set', () => {
      const bill: IBill = {
        user: {
          name: 'anonymous'
        },
        items: [{
          name: 'some goods',
          price: 10,
          quantity: 2
        }]
      }
      const billCalculator = new BillCalculator(bill)
      expect(billCalculator.getNetPayableAmount()).toEqual(20)
    })
  })
})