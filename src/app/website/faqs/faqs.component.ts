import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class FAQsComponent {
  faqs = [
    {
      question: 'How do I place an order?',
      answer: 'To place an order, simply browse our product categories, add the desired items to your cart, and proceed to checkout. You can sign in or create an account during checkout. Once your order is placed, you’ll receive a confirmation email with your order details.'
    },
    {
      question: 'What are your delivery options?',
      answer: 'We offer several delivery options to suit your needs: Standard Delivery, Same-Day Delivery, and Express Delivery.'
    },
    {
      question: 'Do you have a minimum order amount for delivery?',
      answer: 'Yes, the minimum order amount for delivery is $20. Orders below this amount may incur an additional delivery fee.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order is dispatched, we’ll send you a tracking link via email or SMS. You can use this link to track the status of your delivery in real-time.'
    },
    {
      question: 'What if an item I ordered is out of stock?',
      answer: 'If an item is out of stock, we will notify you as soon as possible. You can choose to receive a substitute item, get a refund, or remove the item from your order.'
    },
    // Add more FAQs as needed
  ];
}
