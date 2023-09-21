export interface exchangeRate {
    baseCurrency : string;
    targetCurrency : string;
    rate : number;
  }
  export interface exchangeRateAPI {
    rate: exchangeRate[];
  }