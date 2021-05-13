interface SEKInstance {
  add: (sekToAdd: SEKInstance) => SEKInstance;
  addVAT: (vat: number) => SEKInstance;
  multiply: (multiplier: number) => SEKInstance;
  getAmount: () => number;
  toString: () => string;
}

const formatCurrency = new Intl.NumberFormat("sv-SE", {
  style: "currency",
  currency: "SEK",
}).format;

export const SEK = (amount: number): SEKInstance => {
  const amountWithWholeCents = parseInt((amount * 100).toFixed(0), 10) / 100;
  return {
    add: (sekToAdd: SEKInstance) => {
      return SEK(sekToAdd.getAmount() + amountWithWholeCents);
    },
    addVAT: (vat: number) => {
      const withVAT = amountWithWholeCents * ((100 + vat) / 100);
      return SEK(withVAT);
    },
    multiply: (multiplier: number) => {
      const multiplied = amountWithWholeCents * multiplier;
      return SEK(multiplied);
    },
    getAmount: () => amountWithWholeCents,
    toString: () => formatCurrency(amountWithWholeCents),
  };
};
