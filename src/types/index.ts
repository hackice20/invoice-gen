export interface CustomerData {
  name: string;
  email: string;
  address: string;
  gstNo: string;
  bankName: string;
  branch: string;
  ifsc: string;
  micr: string;
  pan: string;
}

export interface ProductItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  gst: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  customer: CustomerData;
  seller: CustomerData;
  items: ProductItem[];
  signature: string;
}