// File Upload Component with drag-and-drop

import { useState, useCallback } from 'react';
import { Upload, FileImage, AlertCircle } from 'lucide-react';
import { validateImage } from '../../utils/imageProcessing';

export const FileUpload = ({ onFileSelect, disabled = false }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState(null);

    const handleFile = useCallback((file) => {
        setError(null);

        const validation = validateImage(file);
        if (!validation.valid) {
            setError(validation.error);
            return;
        }

        onFileSelect(file);
    }, [onFileSelect]);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (disabled) return;

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    }, [disabled, handleFile]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) {
            setIsDragging(true);
        }
    }, [disabled]);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleClick = () => {
        if (!disabled) {
            document.getElementById('file-input').click();
        }
    };

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFile(file);
        }
    };

    return (
        <div className="w-full">
            {/* Drop Zone */}
            <div
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`
          relative border-2 border-dashed rounded-xl p-12 
          transition-all duration-200 cursor-pointer
          ${isDragging
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-neutral-300 bg-neutral-50 hover:border-primary-400 hover:bg-primary-50'
                    }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
            >
                <input
                    id="file-input"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleInputChange}
                    disabled={disabled}
                    className="hidden"
                />

                <div className="flex flex-col items-center gap-4 text-center">
                    {isDragging ? (
                        <FileImage className="h-16 w-16 text-primary-500 animate-bounce" />
                    ) : (
                        <Upload className="h-16 w-16 text-neutral-400" />
                    )}

                    <div>
                        <p className="text-lg font-medium text-neutral-700 mb-1">
                            {isDragging ? 'Drop your receipt here' : 'Upload Receipt Image'}
                        </p>
                        <p className="text-sm text-neutral-500">
                            Click to browse or drag and drop
                        </p>
                        <p className="text-xs text-neutral-400 mt-2">
                            Supports JPG, PNG, WEBP (Max 5MB)
                        </p>
                    </div>

                    <div className="flex gap-2 mt-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-success-100 text-success-700">
                            ✓ Printed receipts
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-success-100 text-success-700">
                            ✓ Handwritten bills
                        </span>
                    </div>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="mt-4 p-4 bg-danger-50 border border-danger-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-danger-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-danger-700">{error}</p>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
