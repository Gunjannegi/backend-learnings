import { load } from "@cashfreepayments/cashfree-js";

let cashfree = null;

export const initializeSDK = async () => {
  if (!cashfree) {
    cashfree = await load({
      mode: "sandbox",  // ONLY mode is allowed
    });
  }
  return cashfree;
};

export const getCashfree = () => cashfree;
