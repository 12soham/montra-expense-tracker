
import { CURRENCY_LOCALE, CURRENCY_CODE } from "./constants";

export function formatCurrency(amount) {
  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    style: "currency",
    currency: CURRENCY_CODE,
    currencyDisplay: "symbol",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}
