import { IPercentageBaseDiscount, IAmountBaseDiscount } from "./Discount";

interface IBillItem {
  name: string,
  isGrocery?: boolean
  quantity: number
  price: number
}

interface IUser {
  name: string,
  isEmployee?: boolean,
  isAffiliate?: boolean,
  registrationDate?: Date
}

interface IBill {
  user: IUser,
  items: IBillItem[]
}

export { IBill, IBillItem, IUser }
