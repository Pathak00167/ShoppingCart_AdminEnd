import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
})
export class ProductsComponent {
products = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    category: 'Electronics',
    price: 25999,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'High-performance smartphone with long-lasting battery.'
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    category: 'Accessories',
    price: 4999,
    image: 'https://via.placeholder.com/150',
    inStock: false,
    description: 'Crystal clear sound with noise cancellation.'
  },
  {
    id: 3,
    name: 'Gaming Laptop',
    category: 'Computers',
    price: 79999,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Powerful laptop for high-end gaming and productivity.'
  },
  {
    id: 4,
    name: 'Bluetooth Speaker',
    category: 'Audio',
    price: 1999,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Portable speaker with deep bass and long battery life.'
  },
  {
    id: 5,
    name: 'Smartwatch Pro',
    category: 'Wearables',
    price: 9999,
    image: 'https://via.placeholder.com/150',
    inStock: false,
    description: 'Track your fitness and get notifications on your wrist.'
  },
  {
    id: 6,
    name: 'DSLR Camera',
    category: 'Photography',
    price: 44999,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Capture stunning photos with advanced DSLR features.'
  },
  {
    id: 7,
    name: 'Electric Kettle',
    category: 'Home Appliances',
    price: 1299,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Quickly boil water with auto shut-off safety feature.'
  },
  {
    id: 8,
    name: 'LED Monitor 24"',
    category: 'Computers',
    price: 10999,
    image: 'https://via.placeholder.com/150',
    inStock: false,
    description: 'Full HD LED monitor with ultra-slim design.'
  },
  {
    id: 9,
    name: 'Wireless Keyboard & Mouse',
    category: 'Accessories',
    price: 2299,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Compact combo for comfortable typing and control.'
  },
  {
    id: 10,
    name: 'Fitness Band',
    category: 'Wearables',
    price: 1499,
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Track your steps, sleep, and heart rate throughout the day.'
  }
];


   selectedProduct: any = null;

  openProductDetails(product: any) {
    this.selectedProduct = product;
  }

  closeProductDetails() {
    this.selectedProduct = null;
  }
}
