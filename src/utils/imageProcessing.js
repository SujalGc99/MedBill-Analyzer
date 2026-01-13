// Image processing utilities

/**
 * Validates if file is a supported image type
 */
export const validateImageFile = (file) => {
    const validExtensions = ['jpg', 'jpeg', 'png', 'webp'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!file) {
        return { valid: false, error: 'No file selected' };
    }

    // Check MIME type (permissive check for any image)
    const isImageType = file.type.startsWith('image/');

    // Fallback: Check extension if MIME type is missing or generic (e.g. application/octet-stream)
    const fileName = file.name.toLowerCase();
    const extension = fileName.split('.').pop();
    const isValidExtension = validExtensions.includes(extension);

    if (!isImageType && !isValidExtension) {
        return {
            valid: false,
            error: `Invalid file type (${file.type || 'unknown'}). Please upload JPG, PNG, or WEBP.`
        };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File too large. Maximum size is 5MB.' };
    }

    return { valid: true };
};

/**
 * Compresses image to reduce file size before upload
 */
export const compressImage = async (file, maxWidth = 1920, quality = 0.8) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            const img = new Image();

            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate new dimensions while maintaining aspect ratio
                if (width > maxWidth) {
                    height = (height * maxWidth) / width;
                    width = maxWidth;
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to blob
                canvas.toBlob(
                    (blob) => {
                        resolve(blob);
                    },
                    file.type,
                    quality
                );
            };

            img.onerror = () => {
                reject(new Error('Failed to load image'));
            };

            img.src = event.target.result;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Converts file/blob to base64 string
 */
export const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
            const base64 = reader.result.split(',')[1];
            resolve(base64);
        };

        reader.onerror = (error) => {
            reject(error);
        };

        reader.readAsDataURL(file);
    });
};

/**
 * Process image: validate, compress, and convert to base64
 */
export const processImage = async (file) => {
    // Validate
    const validation = validateImageFile(file);
    if (!validation.valid) {
        throw new Error(validation.error);
    }

    // Compress if needed
    let processedFile = file;
    if (file.size > 1024 * 1024) { // If larger than 1MB, compress
        processedFile = await compressImage(file, 1280, 0.8);
    }

    // Convert to base64
    const base64 = await convertToBase64(processedFile);

    return {
        base64,
        fileName: file.name,
        fileSize: processedFile.size,
        fileType: file.type,
    };
};

/**
 * Create preview URL for image
 */
export const createPreviewUrl = (file) => {
    return URL.createObjectURL(file);
};

/**
 * Revoke preview URL to free memory
 */
export const revokePreviewUrl = (url) => {
    URL.revokeObjectURL(url);
};
