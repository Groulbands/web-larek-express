export interface OrderProduct {
  id: string;
  price: number | null | undefined;
}

export class OrderValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'OrderValidationError';
  }
}

export const calculateOrderTotalCents = (
  itemIds: string[],
  products: OrderProduct[],
): number => {
  const byId = new Map(products.map(({ id, price }) => [id.toLowerCase(), price]));

  return itemIds.reduce((sum, id) => {
    if (!byId.has(id.toLowerCase())) {
      throw new OrderValidationError(`Товар с id ${id} не найден`);
    }

    const price = byId.get(id.toLowerCase());
    if (price == null) {
      throw new OrderValidationError(`Товар с id ${id} не продается`);
    }

    return sum + Math.round(price * 100);
  }, 0);
};

export const matchesOrderTotal = (calculatedCents: number, claimedTotal: number): boolean => (
  calculatedCents === Math.round(claimedTotal * 100)
);
