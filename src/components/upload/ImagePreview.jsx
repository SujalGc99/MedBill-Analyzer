// Image Preview Component

import { X, ZoomIn } from 'lucide-react';
import { useState } from 'react';
import Modal from '../common/Modal';

export const ImagePreview = ({ file, onRemove }) => {
    const [showFullScreen, setShowFullScreen] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(() => URL.createObjectURL(file));

    const handleRemove = () => {
        URL.revokeObjectURL(previewUrl); // Clean up
        onRemove();
    };

    return (
        <>
            <div className="relative group">
                <img
                    src={previewUrl}
                    alt="Receipt preview"
                    className="w-full h-64 object-cover rounded-lg shadow-soft"
                />

                {/* Overlay with actions */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center gap-2">
                    <button
                        onClick={() => setShowFullScreen(true)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-3 bg-white rounded-lg hover:bg-neutral-100"
                        aria-label="View full size"
                    >
                        <ZoomIn className="h-5 w-5 text-neutral-700" />
                    </button>
                    <button
                        onClick={handleRemove}
                        className="opacity-0 group-hover:opacity-100 transition-opacity p-3 bg-white rounded-lg hover:bg-danger-50"
                        aria-label="Remove image"
                    >
                        <X className="h-5 w-5 text-danger-600" />
                    </button>
                </div>

                {/* File info */}
                <div className="mt-2 text-sm text-neutral-600">
                    <p className="truncate font-medium">{file.name}</p>
                    <p className="text-xs text-neutral-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                </div>
            </div>

            {/* Full Screen Modal */}
            <Modal
                isOpen={showFullScreen}
                onClose={() => setShowFullScreen(false)}
                title="Receipt Preview"
                size="xl"
            >
                <img
                    src={previewUrl}
                    alt="Receipt full view"
                    className="w-full h-auto rounded-lg"
                />
            </Modal>
        </>
    );
};

export default ImagePreview;
