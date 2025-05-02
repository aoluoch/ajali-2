import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import Button from './Button';
import PropTypes from 'prop-types';

const ConfirmDialog = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  message, 
  confirmText = 'Confirm', 
  cancelText = 'Cancel',
  confirmVariant = 'danger',
  isLoading = false
}) => {
  const dialogRef = useRef(null);

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose, isLoading]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target) && !isLoading) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, isLoading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div 
        ref={dialogRef}
        className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h3 id="dialog-title" className="text-lg font-semibold text-gray-900">
            {title}
          </h3>
          <button 
            onClick={onClose}
            disabled={isLoading}
            className="text-gray-400 hover:text-gray-500 focus:outline-none"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-4">
          <p className="text-gray-700">{message}</p>
        </div>
        
        <div className="flex justify-end gap-3 p-4 border-t bg-gray-50">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
          >
            {cancelText}
          </Button>
          <Button
            variant={confirmVariant}
            onClick={onConfirm}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

ConfirmDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmVariant: PropTypes.string,
  isLoading: PropTypes.bool
};

export default ConfirmDialog;
