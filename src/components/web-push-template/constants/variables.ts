export const VARIABLES = [
  {
    variable: '{{customer.first_name}}',
    example: 'John',
    description: 'The first name of the customer'
  },
  {
    variable: '{{customer.last_name}}',
    example: 'Doe', 
    description: 'The last name of the customer'
  },
  {
    variable: '{{customer.email}}',
    example: 'john@example.com',
    description: 'The email address of the customer'
  },
  {
    variable: '{{shop.name}}',
    example: 'My Awesome Store',
    description: 'The name of your Shopify store'
  },
  {
    variable: '{{order.name}}',
    example: '#1001',
    description: 'The unique order number for this purchase'
  },
  {
    variable: '{{order.total_price}}',
    example: '$299.99',
    description: 'The total amount of the order'
  },
  {
    variable: '{{product.title}}',
    example: 'Wireless Headphones',
    description: 'The title of the product in the order'
  },
  {
    variable: '{{product.price}}',
    example: '$199.99',
    description: 'The price of the product'
  },
  {
    variable: '{{order.tracking_number}}',
    example: 'TN123456789',
    description: 'The tracking number for shipment'
  },
  {
    variable: '{{shop.url}}',
    example: 'https://mystore.myshopify.com',
    description: 'The URL of your Shopify store'
  },
  {
    variable: '{{order.status}}',
    example: 'fulfilled',
    description: 'The current status of the order'
  },
  {
    variable: '{{order.created_at}}',
    example: 'January 15, 2024',
    description: 'The date when the order was created'
  }
];
