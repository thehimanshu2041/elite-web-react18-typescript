import { useState, useEffect } from 'react';

// Define the type for the setValue function, which can be a value or a function that returns a value
type SetValue<T> = T | ((currentValue: T) => T);

export default function UseLocalStorage<T>(key: string, defaultValue: T): [T, (newValue: SetValue<T>) => void] {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(e.newValue === null ? defaultValue : JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', listener);

    return () => {
      window.removeEventListener('storage', listener);
    };
  }, [key, defaultValue]);

  const setValueInLocalStorage = (newValue: SetValue<T>) => {
    setValue((currentValue) => {
      const result = typeof newValue === 'function' ? (newValue as (currentValue: T) => T)(currentValue) : newValue;
      localStorage.setItem(key, JSON.stringify(result));
      return result;
    });
  };

  return [value, setValueInLocalStorage];
}
