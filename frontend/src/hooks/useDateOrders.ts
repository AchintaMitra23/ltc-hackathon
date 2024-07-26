import { useState, useEffect } from "react";
import { fetchDateOrders, DateOrders } from "../apis/slotsService";

export const useDateOrders = (company: string, dates: string[]) => {
  const [orders, setOrders] = useState<DateOrders | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchDateOrders(company, dates);
        setOrders(data);
      } catch (error) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    getOrders();
  }, [company, dates]);

  return { orders, loading, error };
};
