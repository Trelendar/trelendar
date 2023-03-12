import { useState, useEffect } from 'react';

export const useHydrationSafeDate = (date: Date) => {
  const [safeDate, setSafeDate] = useState<String>();

  useEffect(() => {
    setSafeDate(new Date(date).toLocaleDateString());
  }, [date]);

  return safeDate;
};
