import { IItemDiscount } from "./models/Discount";
import { IBillItem } from "./models/Bill";

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
