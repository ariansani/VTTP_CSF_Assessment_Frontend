// Add your models here if you have any
export interface OrderSummary{
   orderId: number
   name: string
   email: string
   amount: number
}

export interface Order{
    name:string
    email:string
    size:number
   base:boolean
   sauce:string
   comments:string
   toppings:string
}