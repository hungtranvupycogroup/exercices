import { IBill } from "./Bill";

interface IRetail {
  getNetPayableAmount(bill: IBill): number
}

export { IRetail }