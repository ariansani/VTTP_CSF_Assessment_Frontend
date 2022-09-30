// Implement the methods in PizzaService for Task 3
// Add appropriate parameter and return type 

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { firstValueFrom, lastValueFrom, Observable, of, tap } from "rxjs";
import { Order, OrderSummary } from "./models";

@Injectable()
export class PizzaService {

  private url = 'api/order'; //URL to web API
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) { }

  // POST /api/order
  // Add any required parameters or return type
  createOrder(order: Order):Promise<any> {
    console.info(order,"this is in createOrder method of pizzaService");
    
    const url = `${this.url}`;
    return lastValueFrom(
    this.http.post<any>(url,order));
  }

  // GET /api/order/<email>/all
  // Add any required parameters or return type
  getOrders(email: string):Promise<OrderSummary[]> { 
    const url = `${this.url}/${email}/all`;
    return lastValueFrom(
    this.http.get<OrderSummary[]>(url,this.httpOptions));
  }


}
