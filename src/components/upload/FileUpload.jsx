// File Upload Component with drag-and-drop and animations
import { useState, useCallback } from 'react';
import { Upload, FileImage, AlertCircle, FileText, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateImage } from '../../utils/validation';

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
        if (file) handleFile(file);
    }, [disabled, handleFile]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
    }, [disabled]);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);

    const handleClick = () => {
        if (!disabled) document.getElementById('file-input').click();
    };

    const handleInputChange = (e) => {
        const file = e.target.files[0];
        if (file) handleFile(file);
    };

    return (
        <div className="w-full">
            <motion.div
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                animate={{
                    borderColor: isDragging ? 'var(--primary-500)' : 'rgba(226, 232, 240, 1)',
                    backgroundColor: isDragging ? 'rgba(240, 249, 255, 0.5)' : 'rgba(255, 255, 255, 0.4)',
                    scale: isDragging ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={`
                    relative border-2 border-dashed rounded-xl p-10 
                    transition-all duration-200 cursor-pointer overflow-hidden
                    ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primary-400/70 hover:bg-white/60'}
                `}
            >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />

                <input
                    id="file-input"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleInputChange}
                    disabled={disabled}
                    className="hidden"
                />

                <div className="relative flex flex-col items-center gap-5 text-center z-10">
                    <motion.div
                        animate={{
                            y: isDragging ? -5 : 0,
                            rotate: isDragging ? [0, -10, 10, 0] : 0
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className={`p-4 rounded-2xl ${isDragging ? 'bg-primary-100 text-primary-600' : 'bg-neutral-100 text-neutral-400'}`}
                    >
                        {isDragging ? (
                            <FileImage className="h-10 w-10" />
                        ) : (
                            <Upload className="h-10 w-10" />
                        )}
                    </motion.div>

                    <div>
                        <h3 className="text-lg font-display font-semibold text-neutral-800 mb-1">
                            {isDragging ? 'Drop it here!' : 'Upload Medical Bill'}
                        </h3>
                        <p className="text-sm text-neutral-500">
                            Drag & drop or click to browse
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-2 mt-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-success-50 text-success-700 border border-success-100">
                            <Check className="w-3 h-3" /> JPG/PNG
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-secondary-50 text-secondary-700 border border-secondary-100">
                            <Check className="w-3 h-3" /> Handwritten
                        </span>
                    </div>
                </div>
            </motion.div>

            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-3 p-3 bg-danger-50 border border-danger-200 rounded-lg flex items-start gap-2 text-sm text-danger-700"
                    >
                        <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                        <span>{error}</span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FileUpload;
