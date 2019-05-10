import moment from 'moment'

import PercentageBaseDiscount from './models/PercentageBaseDiscount'
import AmountBaseDiscount from './models/AmountBaseDiscount'
import { IDiscount, IItemDiscount } from './models/Discount'
import { IUser, IBill } from './models/Bill'
import BillCalculator from './models/BillCalculator'

const employeeDiscount = new PercentageBaseDiscount(
  'User is an employee of the store, he gets a 30% discount',
  30
)

const affiliateDiscount = new PercentageBaseDiscount(
  'User is an affiliate of the store, he gets a 10% discount',
  10
)

const longTimeCustomerDiscount = new PercentageBaseDiscount(
  'User has been a customer for over 2 years, he gets a 5% discount',
  5
)

const get5ForEvery100 = new AmountBaseDiscount(
  'For every $100 on the bill, there would be a $ 5 discount',
  100,
  5
)

const getUserDiscount = (user: IUser): undefined | IItemDiscount => {
  if (user.isEmployee) return employeeDiscount
  if (user.isAffiliate) return affiliateDiscount
  if (user.registrationDate) {
    const customerYears = moment().diff(user.registrationDate, 'years')
    if (customerYears >= 2) {
      return longTimeCustomerDiscount
    }
  }
}

const getNetPayableAmount = (bill: IBill) => {
  const regularDiscount = get5ForEvery100
  const itemDiscount = getUserDiscount(bill.user)
  const billCalculator = new BillCalculator(bill, itemDiscount, regularDiscount)
  return billCalculator.getNetPayableAmount()
}

export default getNetPayableAmount