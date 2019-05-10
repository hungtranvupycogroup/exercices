import { IItemDiscount } from "./Discount";
import { IBillItem } from "./Bill";

export default class ApplyNonGroceryDiscount implements IItemDiscount {
  constructor(private discount: IItemDiscount) {
  }

  public get description() {
    return `${this.discount.description} apply to non grocery`
  }

  public getDiscount = (item: IBillItem) => {
    if (item.isGrocery) return 0
    return this.discount.getDiscount(item)
  }
}
