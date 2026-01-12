import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const usePDFExport = () => {
    const [isExporting, setIsExporting] = useState(false);

    const exportToPDF = async (elementId, fileName = 'medbill-analysis.pdf') => {
        setIsExporting(true);
        try {
            const element = document.getElementById(elementId);
            if (!element) {
                console.error(`Element with id ${elementId} not found`);
                return false;
            }

            const canvas = await html2canvas(element, {
                scale: 2, // Higher resolution
                useCORS: true,
                logging: false,
                backgroundColor: '#ffffff'
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const imgWidth = 210; // A4 width
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            pdf.save(fileName);
            return true;
        } catch (error) {
            console.error('PDF export failed:', error);
            return false;
        } finally {
            setIsExporting(false);
        }
    };

    return { exportToPDF, isExporting };
};
