import DineroFactory from "dinero.js";
import Dinero from "dinero.js";

interface SEKInstance {
  add: (sekToAdd: SEKInstance) => SEKInstance;
  addVAT: (vat: number) => SEKInstance;
  multiply: (multiplier: number) => SEKInstance;
  getAmount: () => number;
  toString: () => string;
}

export const SEK = (amount: number): SEKInstance =>
  encapsulateDineroAsSEK(dineroFromAmount(amount));

const dineroFromAmount = (amount: number) =>
  Dinero({
    amount: parseInt((amount * 100).toFixed(0), 10),
    currency: "SEK",
  });

const encapsulateDineroAsSEK = (
  dineroInstance: DineroFactory.Dinero
): SEKInstance => ({
  add: (sekToAdd: SEKInstance) => {
    const dinero1 = dineroFromAmount(sekToAdd.getAmount());
    const dinero2 = dineroInstance;
    return encapsulateDineroAsSEK(dinero1.add(dinero2));
  },
  addVAT: (vat: number) => {
    const withVAT = dineroInstance.multiply((100 + vat) / 100);
    return encapsulateDineroAsSEK(withVAT);
  },
  multiply: (multiplier: number) => {
    const multiplied = dineroInstance.multiply(multiplier);
    return encapsulateDineroAsSEK(multiplied);
  },
  getAmount: () => dineroInstance.getAmount() / 100,
  toString: () => dineroInstance.toFormat("0.00 dollar"),
});
