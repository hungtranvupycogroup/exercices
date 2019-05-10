import Decimal from 'decimal.js-light'

import { IAmountBaseDiscount } from  './models/Discount'

export default class AmountBaseDiscount implements IAmountBaseDiscount {
  private _description: string
  private _acceptAmount : number
  private _discountAmount : number

  constructor(description: string, acceptAmount: number, discountAmount: number) {
    this._description = description
    this._acceptAmount = acceptAmount
    this._discountAmount = discountAmount
  }

  public get description() {
    return this._description
  }

  public get acceptAmount() {
    return this._acceptAmount
  }

  public get discountAmount() {
    return this._discountAmount
  }
  
  public getDiscount = (amount: number): number => {
    // round down for discount
    return new Decimal(amount).dividedToIntegerBy(this._acceptAmount).mul(this._discountAmount).todp(0, 3).toNumber()
  }
}
