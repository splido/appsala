import React from 'react';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end">
          <button className="mr-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  onClick={onCancel}>Cancel</button>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
