
import { useMutation } from '@tanstack/react-query';

// Custom hook for file download
export const useFileDownload = () => {
  return useMutation({
    mutationFn: async ({ fileName }) => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/files/${fileName}`);
      if (!response.ok) throw new Error('فشل التحميل');
      return response.blob();
    },
    onSuccess: (blob, { fileName }) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  });
};