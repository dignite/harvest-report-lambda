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

export const SEK = (amount: number): SEKInstance => ({
  add: (sekToAdd: SEKInstance) => {
    return SEK(
      sekToAdd.getAmount() + parseInt((amount * 100).toFixed(0), 10) / 100
    );
  },
  addVAT: (vat: number) => {
    const withVAT =
      (parseInt((amount * 100).toFixed(0), 10) / 100) * ((100 + vat) / 100);
    return SEK(withVAT);
  },
  multiply: (multiplier: number) => {
    const multiplied =
      (parseInt((amount * 100).toFixed(0), 10) / 100) * multiplier;
    return SEK(multiplied);
  },
  getAmount: () => parseInt((amount * 100).toFixed(0), 10) / 100,
  toString: () => formatCurrency(parseInt((amount * 100).toFixed(0), 10) / 100),
});
