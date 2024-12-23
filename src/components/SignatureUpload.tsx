import React from 'react';
import { Upload } from 'lucide-react';

interface SignatureUploadProps {
  signature: string;
  onChange: (signature: string) => void;
}

export function SignatureUpload({ signature, onChange }: SignatureUploadProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        Authority Signature
      </label>
      <div className="flex items-end gap-4">
        {signature ? (
          <div className="w-40">
            <img
              src={signature}
              alt="Signature"
              className="max-h-20 object-contain"
            />
          </div>
        ) : null}
        <label className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50">
          <Upload className="w-5 h-5" />
          <span className="text-sm">Upload Signature</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}