import DineroFactory from "dinero.js";
import Dinero from "dinero.js";

export const SEK = (amount: number) =>
  encapsulateDineroAsSEK(dineroFromAmount(amount));

const dineroFromAmount = (amount: number) =>
  Dinero({
    amount: parseInt((amount * 100).toFixed(0), 10),
    currency: "SEK",
  });

interface SEKInstance extends ReturnType<typeof encapsulateDineroAsSEK> {}

const encapsulateDineroAsSEK = (dineroInstance: DineroFactory.Dinero) => ({
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
