export interface Order {
  id: number;
  order_id: string;
  customer_id: string;
  payment_status: string;
  order_status: string;
  date: string;
  total: number;
}
