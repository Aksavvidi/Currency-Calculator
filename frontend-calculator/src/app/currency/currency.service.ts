import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currencies, currencyAPI } from 'shared';


const CURRENCY_API = 'http://localhost:3000/api/currencies'

@Injectable()
export class CurrencyService {
  constructor(private http: HttpClient) { }

  getAllCurrencies(){
    return this.http.get<currencyAPI>(`${CURRENCY_API}/findAll`);
  }

  getCurrencyByCode(code: string){
    return this.http.get<currencyAPI>(`${CURRENCY_API}/find/${code}`);
  }

  deleteCurrency(code:string){
    return this.http.delete<currencyAPI>(`${CURRENCY_API}/delete/${code}`);
  }

  updateCurrency(code:string, data: Currencies){
    return this.http.patch<currencyAPI>(`${CURRENCY_API}/update/${code}`, data);
  }

  createCurrency(data: Currencies){
    return this.http.post<currencyAPI>(`${CURRENCY_API}/create`,data)
  }
}
