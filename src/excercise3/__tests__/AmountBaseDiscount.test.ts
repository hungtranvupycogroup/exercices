import AmountBaseDiscount from '../AmountBaseDiscount'

describe('AmountBaseDiscount', () => {
  it('should have discount for every cash amount', () => {
    const testDiscount = new AmountBaseDiscount('test', 100, 10)
    expect(testDiscount.description).toBe('test')
    expect(testDiscount.acceptAmount).toBe(100)
    expect(testDiscount.discountAmount).toBe(10)
    expect(testDiscount.getDiscount(200)).toBe(20)
  })
})