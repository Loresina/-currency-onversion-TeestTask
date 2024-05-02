const makeConversion = (
  amount: number,
  currencyOne: string,
  currencyTwo: string,
  dataRates: { [key: string]: number },
  type = "straight"
): number => {
  console.log("Это dataRates", dataRates);
  const rateOne = dataRates[currencyOne];
  const rateTwo = dataRates[currencyTwo];
  const currentRate = rateTwo / rateOne;

  let result;

  switch (type) {
    case "flipped":
      result = amount / currentRate;
      break;
    default:
      result = amount * currentRate;
      break;
  }

  return parseFloat(result.toFixed(3));
};

export { makeConversion };
