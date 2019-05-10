import Retail from '../Retail'
import { IBill } from '../models/Bill';

jest.mock('moment', () => (t) => {
  const origin = require.requireActual('moment')
  if (t) return origin(t)
  return origin(new Date(2019, 4, 11))
})

describe('Retail website', () => {
  const retail = new Retail()

  it('should discount 30% for employee', () => {
    const bill: IBill = {
      user: {
        name: 'Mr Employee',
        isEmployee: true
      },
      items: [{
        name: 'Not grocery',
        quantity: 2,
        price: 10
      }]
    }
    expect(retail.getNetPayableAmount(bill)).toBe(14)
  })

  it('should discount 10% for affiliate', () => {
    const bill: IBill = {
      user: {
        name: 'Ms Affiliate',
        isAffiliate: true
      },
      items: [{
        name: 'Not grocery',
        quantity: 2,
        price: 10
      }]
    }
    expect(retail.getNetPayableAmount(bill)).toBe(18)
  })

  it('should discount 5% for user has been a customer for over 2 years', () => {
    const bill: IBill = {
      user: {
        name: 'Mrs Long Time User',
        registrationDate: new Date(2015, 0)
      },
      items: [{
        name: 'Not grocery',
        quantity: 2,
        price: 10
      }]
    }
    expect(retail.getNetPayableAmount(bill)).toBe(19)
  })

  it('should not discount 5% for user has been a customer for less than 2 years', () => {
    const bill: IBill = {
      user: {
        name: 'Mrs Long Time User',
        registrationDate: new Date(2018, 0)
      },
      items: [{
        name: 'Not grocery',
        quantity: 2,
        price: 10
      }]
    }
    expect(retail.getNetPayableAmount(bill)).toBe(20)
  })

  it('should discount 5$ for every $100 on the bill', () => {
    const bill: IBill = {
      user: {
        name: 'anonymous'
      },
      items: [{
        name: 'item 1',
        quantity: 9,
        price: 100
      }, {
        name: 'item 1',
        quantity: 9,
        price: 10
      }]
    }
    // for $ 990, you get $ 45 as a discount
    expect(retail.getNetPayableAmount(bill)).toBe(945)
  })

  it('should not apply percentage based discounts on groceries', () => {
    const bill: IBill = {
      user: {
        name: 'Mr Employee',
        isEmployee: true
      },
      items: [{
        name: 'Grocery',
        isGrocery: true,
        quantity: 2,
        price: 10
      }]
    }
    expect(retail.getNetPayableAmount(bill)).toBe(20)
  })

  it('should apply only one of the percentage based discounts on a bill', () => {
    const bill: IBill = {
      user: {
        name: 'Mr All Type',
        isEmployee: true,
        isAffiliate: true,
        registrationDate: new Date(2015)
      },
      items: [{
        name: 'Not grocery',
        quantity: 2,
        price: 10
      }]
    }
    expect(retail.getNetPayableAmount(bill)).toBe(14) // only apply employee discount
  })
})
