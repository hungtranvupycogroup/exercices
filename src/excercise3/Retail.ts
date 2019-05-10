import * as moment from 'moment'

import PercentageBaseDiscount from './PercentageBaseDiscount'
import AmountBaseDiscount from './AmountBaseDiscount'
import { IItemDiscount } from './models/Discount'
import { IUser, IBill } from './models/Bill'
import BillCalculator from './BillCalculator'
import ApplyNonGroceryDiscount from './ApplyNonGroceryDiscount'
import { IRetail } from './models/Retail';

export default class Retail implements IRetail {
  public static EmployeeDiscount = new PercentageBaseDiscount(
    'User is an employee of the store, he gets a 30% discount',
    30
  )

  public static AffiliateDiscount = new PercentageBaseDiscount(
    'User is an affiliate of the store, he gets a 10% discount',
    10
  )
  
  public static LongTimeCustomerDiscount = new PercentageBaseDiscount(
    'User has been a customer for over 2 years, he gets a 5% discount',
    5
  )
  
  public static Get5ForEvery100Discount = new AmountBaseDiscount(
    'For every $100 on the bill, there would be a $ 5 discount',
    100,
    5
  )

  private getUserDiscount = (user: IUser): (undefined | IItemDiscount) => {
    if (user.isEmployee) return Retail.EmployeeDiscount
    if (user.isAffiliate) return Retail.AffiliateDiscount
    if (user.registrationDate) {
      const customerYears = moment().diff(user.registrationDate, 'years')
      if (customerYears >= 2) {
        return Retail.LongTimeCustomerDiscount
      }
    }
  }

  public getNetPayableAmount = (bill: IBill) => {
    const regularDiscount = Retail.Get5ForEvery100Discount
    const userDiscount = this.getUserDiscount(bill.user)
    const itemDiscount = userDiscount && new ApplyNonGroceryDiscount(userDiscount)
    const billCalculator = new BillCalculator(bill, itemDiscount, regularDiscount)
    return billCalculator.getNetPayableAmount()
  }
}
