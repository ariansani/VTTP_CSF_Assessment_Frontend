import { Component, OnInit } from '@angular/core';
import {
  EmailValidator,
  Form,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../models';
import { PizzaService } from '../pizza.service';

const SIZES: string[] = [
  'Personal - 6 inches',
  'Regular - 9 inches',
  'Large - 12 inches',
  'Extra Large - 15 inches',
];

const PizzaToppings: string[] = [
  'chicken',
  'seafood',
  'beef',
  'vegetables',
  'cheese',
  'arugula',
  'pineapple',
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  mainForm!: FormGroup;
  formArray!: FormArray;
  output!: JSON;
  obj!: any;
  order!: Order;

  pizzaSize = SIZES[0];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private pizzaSvc: PizzaService
  ) {}

  ngOnInit(): void {
    this.mainForm = this.createForm();
  }

  createForm() {
    return this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      size: [Validators.min(1), Validators.required],
      base: ['', Validators.required],
      sauce: ['', Validators.required],
      toppings: this.fb.array([Validators.required]),
      comments: [''],
    });
  }

  updateSize(size: string) {
    this.pizzaSize = SIZES[parseInt(size)];
  }

  get toppings() {
    return this.mainForm.get('toppings') as FormArray;
  }

  onCheckChange(event: { target: { checked: any; value: any } }) {
    const formArray = this.mainForm.get('toppings') as FormArray;

    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    }
  }

  listOrders(): void {
    this.mainForm.get('email')?.hasError('email') ||
    this.mainForm.get('email')?.hasError('required')
      ? alert('enter a proper email!')
      : this.router.navigate(['/orders/', this.mainForm.get('email')?.value]);
  }

  onSubmit(): void {

    this.order = this.mainForm.value as Order;
    this.order.base= this.mainForm.get('base')?.value ==="thick"? true:false;
    this.order.toppings= this.mainForm.get('toppings')?.value.slice(1);

    this.pizzaSvc
      .createOrder(this.order)
      .then(() => {
       alert('added successfully,redirecting');
        this.router.navigate(['/orders/', this.mainForm.get('email')?.value]);
      })
      .catch((error) => console.info('error' + error));

      // this.router.navigate(['/orders/', this.mainForm.get('email')?.value]);
  }
  
}
