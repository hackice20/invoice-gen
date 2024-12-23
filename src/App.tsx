import React, { useState } from 'react';
import { FileText, Printer } from 'lucide-react';
import { CustomerData, InvoiceData, ProductItem } from './types';
import { PartyDetails } from './components/PartyDetails';
import { ProductList } from './components/ProductList';
import { InvoicePreview } from './components/InvoicePreview';
import { SignatureUpload } from './components/SignatureUpload';
import { generatePDF } from './utils/pdf';

const emptyCustomerData: CustomerData = {
  name: '',
  email: '',
  address: '',
  gstNo: '',
  bankName: '',
  branch: '',
  ifsc: '',
  micr: '',
  pan: '',
};

function App() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: crypto.randomUUID().split('-')[0].toUpperCase(),
    date: new Date().toISOString().split('T')[0],
    customer: emptyCustomerData,
    seller: emptyCustomerData,
    items: [],
    signature: '',
  });

  const handlePrint = async () => {
    const filename = `Invoice-${invoiceData.invoiceNumber}.pdf`;
    await generatePDF('invoice-preview', filename);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Invoice Generator</h1>
          <div className="flex gap-4">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                activeTab === 'edit'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              <FileText className="w-5 h-5" />
              Edit
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                activeTab === 'preview'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700'
              }`}
            >
              <Printer className="w-5 h-5" />
              Preview
            </button>
          </div>
        </div>

        {activeTab === 'edit' ? (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <PartyDetails
                title="Seller Information"
                data={invoiceData.seller}
                onChange={(seller) => setInvoiceData({ ...invoiceData, seller })}
              />
              <PartyDetails
                title="Customer Information"
                data={invoiceData.customer}
                onChange={(customer) => setInvoiceData({ ...invoiceData, customer })}
              />
            </div>
            <ProductList
              items={invoiceData.items}
              onItemsChange={(items) => setInvoiceData({ ...invoiceData, items })}
            />
            <div className="bg-white p-6 rounded-lg shadow-md">
              <SignatureUpload
                signature={invoiceData.signature}
                onChange={(signature) => setInvoiceData({ ...invoiceData, signature })}
              />
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-4 print:hidden">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Printer className="w-5 h-5" />
                Download PDF
              </button>
            </div>
            <InvoicePreview data={invoiceData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;