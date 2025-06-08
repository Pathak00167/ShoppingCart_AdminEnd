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
    }
  ];
}
