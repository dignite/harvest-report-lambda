const Dinero = require("dinero.js");

const SEK = amount => encapsulateDineroAsSEK(dineroFromAmount(amount));

const dineroFromAmount = amount =>
  Dinero({
    amount: parseInt((amount * 100).toFixed(0), 10),
    currency: "SEK",
    locale: "sv-SE",
  });

const encapsulateDineroAsSEK = dineroInstance => ({
  add: sekToAdd => {
    const dinero1 = dineroFromAmount(sekToAdd.getAmount());
    const dinero2 = dineroInstance;
    return encapsulateDineroAsSEK(dinero1.add(dinero2));
  },
  addVAT: vat => {
    const withVAT = dineroInstance.multiply((100 + vat) / 100);
    return encapsulateDineroAsSEK(withVAT);
  },
  multiply: multiplier => {
    const multiplied = dineroInstance.multiply(multiplier);
    return encapsulateDineroAsSEK(multiplied);
  },
  getAmount: () => dineroInstance.getAmount() / 100,
  toString: () => dineroInstance.toFormat("0.00 dollar"),
});

module.exports.SEK = SEK;
