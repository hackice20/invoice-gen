import React from 'react';
import { InvoiceData } from '../types';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export function InvoicePreview({ data }: InvoicePreviewProps) {
  const calculateSubtotal = () => {
    return data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  };

  const calculateTotalGST = () => {
    return data.items.reduce(
      (sum, item) => sum + (item.quantity * item.price * item.gst) / 100,
      0
    );
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTotalGST();
  };

  return (
    <div id="invoice-preview" className="bg-white p-8 rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold">TAX INVOICE</h1>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h2 className="text-lg font-semibold mb-2">From:</h2>
          <div>
            <p className="font-semibold">{data.seller.name}</p>
            <p>{data.seller.address}</p>
            <p>GST: {data.seller.gstNo}</p>
            <p>PAN: {data.seller.pan}</p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">To:</h2>
          <div>
            <p className="font-semibold">{data.customer.name}</p>
            <p>{data.customer.address}</p>
            <p>GST: {data.customer.gstNo}</p>
            <p>PAN: {data.customer.pan}</p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p><strong>Invoice No:</strong> {data.invoiceNumber}</p>
          </div>
          <div>
            <p><strong>Date:</strong> {data.date}</p>
          </div>
        </div>
      </div>

      <table className="min-w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Item</th>
            <th className="text-right py-2">Qty</th>
            <th className="text-right py-2">Price</th>
            <th className="text-right py-2">GST %</th>
            <th className="text-right py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.items.map((item) => (
            <tr key={item.id} className="border-b">
              <td className="py-2">{item.name}</td>
              <td className="text-right py-2">{item.quantity}</td>
              <td className="text-right py-2">₹{item.price.toFixed(2)}</td>
              <td className="text-right py-2">{item.gst}%</td>
              <td className="text-right py-2">
                ₹{(item.quantity * item.price).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={4} className="text-right py-2 font-semibold">
              Subtotal:
            </td>
            <td className="text-right py-2 font-semibold">
              ₹{calculateSubtotal().toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={4} className="text-right py-2 font-semibold">
              Total GST:
            </td>
            <td className="text-right py-2 font-semibold">
              ₹{calculateTotalGST().toFixed(2)}
            </td>
          </tr>
          <tr>
            <td colSpan={4} className="text-right py-2 font-semibold">
              Total Amount:
            </td>
            <td className="text-right py-2 font-semibold">
              ₹{calculateTotal().toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Bank Details:</h3>
          <p>Bank: {data.seller.bankName}</p>
          <p>Branch: {data.seller.branch}</p>
          <p>IFSC: {data.seller.ifsc}</p>
          <p>MICR: {data.seller.micr}</p>
        </div>
        <div className="text-right">
          {data.signature && (
            <img
              src={data.signature}
              alt="Authorized Signature"
              className="h-20 ml-auto mb-2"
            />
          )}
          <p className="pt-2 border-t">Authorized Signatory</p>
        </div>
      </div>
    </div>
  );
}