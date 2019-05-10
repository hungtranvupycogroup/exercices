import Decimal from 'decimal.js-light'

import { IPercentageBaseDiscount } from  './Discount'
import { IBillItem } from './Bill';

export default class PercentageBaseDiscount implements IPercentageBaseDiscount {
  private _description: string
  private _percent : number

  constructor(description: string, percent: number) {
    this._description = description
    this._percent = percent
  }

  public get description() {
    return this._description
  }

  public get percent() {
    return this._percent
  }
  
  public getDiscount = (item: IBillItem): number => {
    // round down for discount
    return new Decimal(item.price).mul(item.quantity).mul(this._percent).div(100).todp(0, 3).toNumber()
  }
}
