import { useState, useCallback } from 'react';

function useToast() {
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: 'success' }), 3000);
  }, []);

  const clearToast = () => setToast({ message: '', type: 'success' });

  return { toast, showToast, clearToast };
}

export default useToast;