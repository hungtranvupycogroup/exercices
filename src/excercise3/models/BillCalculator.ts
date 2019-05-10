import Decimal from 'decimal.js-light'

import { IBill, IBillItem, IUser } from './Bill'
import { IDiscount, IItemDiscount } from './Discount';

export default class BillCalculator {
  constructor(
    private bill: IBill,
    private itemDiscount?: IItemDiscount,
    private totalDiscount?: IDiscount
    ) {
  }

  private reduceGetNetOfItems = (total: number, item: IBillItem) => {
    if (this.itemDiscount) {
      const discount = this.itemDiscount.getDiscount(item)
      console.log(this.itemDiscount.getDiscount, discount)
      return total + (item.price * item.quantity) - discount
    }
    return total + (item.price * item.quantity)
  }

  public getNetPayableAmount = () => {
    const totalNetItems = this.bill.items.reduce(this.reduceGetNetOfItems, 0)

    if (this.totalDiscount) {
      const discount = this.totalDiscount.getDiscount(totalNetItems)
      return totalNetItems - discount
    }

    return totalNetItems
  }
}