import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderSummary } from '../models';
import { PizzaService } from '../pizza.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders!:OrderSummary[];
  email!:string;

  constructor(private activatedRoute: ActivatedRoute, private pizzaSvc: PizzaService) { }

  ngOnInit(): void {
    this.email= this.activatedRoute.snapshot.params['email'];
    this.pizzaSvc.getOrders(this.email)
    .then((result)=>{
      console.info('results>>>', result);
      this.orders=result;
    }).catch((error) =>
    console.info('>>>error: , error')

    );
  }

}
