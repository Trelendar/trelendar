import { useState, useEffect } from 'react';

export const useHydrationSafeDate = (date: Date) => {
  const [safeDate, setSafeDate] = useState<Date>();

  useEffect(() => {
    setSafeDate(new Date(date));
  }, [date]);

  return safeDate;
};
