export interface Currencies {
    code: string;
    name: string;
    createdAt?: string; 
    updatedAt?: string;
  }
  export interface currencyAPI {
    data: Currencies[]
  }