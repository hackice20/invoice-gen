import React from 'react';
import { Trash2 } from 'lucide-react';
import { ProductItem } from '../types';

interface ProductListProps {
  items: ProductItem[];
  onItemsChange: (items: ProductItem[]) => void;
}

export function ProductList({ items, onItemsChange }: ProductListProps) {
  const addItem = () => {
    onItemsChange([
      ...items,
      { id: crypto.randomUUID(), name: '', quantity: 1, price: 0, gst: 18 },
    ]);
  };

  const updateItem = (id: string, field: keyof ProductItem, value: string | number) => {
    onItemsChange(
      items.map((item) =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const removeItem = (id: string) => {
    onItemsChange(items.filter((item) => item.id !== id));
  };

  const calculateSubtotal = (item: ProductItem) => {
    return item.quantity * item.price;
  };

  const calculateGST = (item: ProductItem) => {
    return (calculateSubtotal(item) * item.gst) / 100;
  };

  const calculateTotal = (item: ProductItem) => {
    return calculateSubtotal(item) + calculateGST(item);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Products</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">GST %</th>
              <th className="px-4 py-2">Subtotal</th>
              <th className="px-4 py-2">GST Amount</th>
              <th className="px-4 py-2">Total</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="px-4 py-2">
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={item.gst}
                    onChange={(e) => updateItem(item.id, 'gst', Number(e.target.value))}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </td>
                <td className="px-4 py-2">₹{calculateSubtotal(item).toFixed(2)}</td>
                <td className="px-4 py-2">₹{calculateGST(item).toFixed(2)}</td>
                <td className="px-4 py-2">₹{calculateTotal(item).toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="px-4 py-2 text-right font-semibold">
                Total:
              </td>
              <td className="px-4 py-2 font-semibold">
                ₹{items.reduce((sum, item) => sum + calculateSubtotal(item), 0).toFixed(2)}
              </td>
              <td className="px-4 py-2 font-semibold">
                ₹{items.reduce((sum, item) => sum + calculateGST(item), 0).toFixed(2)}
              </td>
              <td className="px-4 py-2 font-semibold">
                ₹{items.reduce((sum, item) => sum + calculateTotal(item), 0).toFixed(2)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
      <button
        onClick={addItem}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Add Product
      </button>
    </div>
  );
}