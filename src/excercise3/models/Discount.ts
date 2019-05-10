import { IBillItem } from "./Bill";

interface IDiscount {
  description: string
  getDiscount(amount: number): number
}

interface IItemDiscount {
  description: string
  getDiscount(item: IBillItem): number
}

interface IPercentageBaseDiscount extends IItemDiscount {
  percent: number
}

interface IAmountBaseDiscount extends IDiscount {
  acceptAmount: number
  discountAmount: number
}

export { IPercentageBaseDiscount, IAmountBaseDiscount, IDiscount, IItemDiscount }