// taken from here https://stackoverflow.com/a/14428340 from the short and fast solution
// obviously if this were enterprise production grade, we would need to make sure the currency, locale, etc. is all correct

/**
 * const formatted = formatter(1234); // 1,234.00
 *
 * @param number n: the number to be formatted
 */
export const formatter = (n: number) => {
    return n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
};
