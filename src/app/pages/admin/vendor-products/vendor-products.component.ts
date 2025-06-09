import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-vendor-products',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './vendor-products.component.html',
  
})
export class VendorProductsComponent {
vendors = [
  { id: '', name: 'All Vendors' },
  { id: 'vendor1', name: 'Vendor One' },
  { id: 'vendor2', name: 'Vendor Two' },
  { id: 'vendor3', name: 'Vendor Three' },
];

selectedVendor: string = '';

products = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    category: 'Electronics',
    price: 25999,
    vendorId: 'vendor1',
    vendorName: 'Vendor One',
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'High-performance smartphone with long-lasting battery.'
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    category: 'Accessories',
    price: 4999,
    vendorId: 'vendor2',
    vendorName: 'Vendor Two',
    image: 'https://via.placeholder.com/150',
    inStock: false,
    description: 'Crystal clear sound with noise cancellation.'
  },
  {
    id: 3,
    name: 'LED Monitor',
    category: 'Computers',
    price: 12999,
    vendorId: 'vendor1',
    vendorName: 'Vendor One',
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Full HD monitor with vibrant display.'
  },
  {
    id: 4,
    name: 'Gaming Keyboard',
    category: 'Accessories',
    price: 3999,
    vendorId: 'vendor3',
    vendorName: 'Vendor Three',
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Mechanical keyboard with customizable RGB lighting.'
  },
  {
    id: 5,
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    price: 2999,
    vendorId: 'vendor2',
    vendorName: 'Vendor Two',
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Portable speaker with deep bass and long battery life.'
  },
  {
    id: 6,
    name: 'Laptop Stand',
    category: 'Office',
    price: 1499,
    vendorId: 'vendor1',
    vendorName: 'Vendor One',
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Ergonomic laptop stand with adjustable height.'
  },
  {
    id: 7,
    name: 'Smartwatch Pro',
    category: 'Wearables',
    price: 19999,
    vendorId: 'vendor4',
    vendorName: 'Vendor Four',
    image: 'https://via.placeholder.com/150',
    inStock: false,
    description: 'Advanced smartwatch with fitness tracking features.'
  },
  {
    id: 8,
    name: 'USB-C Hub',
    category: 'Computers',
    price: 2499,
    vendorId: 'vendor3',
    vendorName: 'Vendor Three',
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Multi-port USB-C hub for laptops and tablets.'
  },
  {
    id: 9,
    name: 'Wireless Charger',
    category: 'Accessories',
    price: 1799,
    vendorId: 'vendor2',
    vendorName: 'Vendor Two',
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Fast wireless charger compatible with all Qi-enabled devices.'
  },
  {
    id: 10,
    name: 'Noise Cancelling Earbuds',
    category: 'Electronics',
    price: 5999,
    vendorId: 'vendor4',
    vendorName: 'Vendor Four',
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Compact earbuds with active noise cancellation.'
  },
  {
    id: 11,
    name: '4K Action Camera',
    category: 'Cameras',
    price: 8999,
    vendorId: 'vendor1',
    vendorName: 'Vendor One',
    image: 'https://via.placeholder.com/150',
    inStock: false,
    description: 'Waterproof action camera with 4K recording.'
  },
  {
    id: 12,
    name: 'Ergonomic Office Chair',
    category: 'Furniture',
    price: 7999,
    vendorId: 'vendor3',
    vendorName: 'Vendor Three',
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'Comfortable office chair with lumbar support.'
  },
  {
    id: 13,
    name: 'Portable SSD 1TB',
    category: 'Computers',
    price: 10999,
    vendorId: 'vendor4',
    vendorName: 'Vendor Four',
    image: 'https://via.placeholder.com/150',
    inStock: true,
    description: 'High-speed portable SSD with USB 3.1 interface.'
  }
];


filteredProducts() {
  if (!this.selectedVendor) return this.products;
  return this.products.filter(p => p.vendorId === this.selectedVendor);
}

}
