import React, { createContext, useContext, useState, useEffect } from 'react';

const RFQContext = createContext();

export const RFQProvider = ({ children }) => {
  const [rfqItems, setRfqItems] = useState(() => {
    try {
      const saved = localStorage.getItem('ftit_rfq_basket');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('All Vehicles');

  useEffect(() => {
    try {
      localStorage.setItem('ftit_rfq_basket', JSON.stringify(rfqItems));
    } catch (e) {
      console.error(e);
    }
  }, [rfqItems]);

  const addToRFQ = (product, quantity = 1) => {
    setRfqItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          category: product.category,
          image: product.image,
          material: product.material,
          quantity
        }
      ];
    });
  };

  const updateQuantity = (id, delta) => {
    setRfqItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(1, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromRFQ = (id) => {
    setRfqItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearRFQ = () => {
    setRfqItems([]);
  };

  const totalItemsCount = rfqItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <RFQContext.Provider
      value={{
        rfqItems,
        addToRFQ,
        updateQuantity,
        removeFromRFQ,
        clearRFQ,
        totalItemsCount,
        isModalOpen,
        setIsModalOpen,
        selectedVehicle,
        setSelectedVehicle
      }}
    >
      {children}
    </RFQContext.Provider>
  );
};

export const useRFQ = () => useContext(RFQContext);
