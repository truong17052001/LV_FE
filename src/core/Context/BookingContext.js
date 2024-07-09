import React, { createContext, useState } from 'react';

const BookingContext = createContext();

const BookingProvider = ({ children }) => {
  const [adult, setAdult] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  return (
    <BookingContext.Provider value={{ adult, setAdult, childrenCount, setChildrenCount }}>
      {children}
    </BookingContext.Provider>
  );
};

export { BookingContext, BookingProvider };
