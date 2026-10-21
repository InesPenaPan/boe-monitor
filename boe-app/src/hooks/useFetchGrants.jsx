import { useState, useEffect, useCallback } from 'react';

const API_URL = 'http://localhost:5678/webhook/grants';

/**
 * Custom hook to manage fetching and lifecycle states of BOE grant records.
 *
 * @param {string} [endpoint=API_URL] - Webhook endpoint for grant ingestion.
 * @returns {{
 *   grants: Array<Object>,
 *   isLoading: boolean,
 *   error: string|null,
 *   refetch: Function
 * }} Data payload, network state flags, and revalidation handler.
 */
export function useFetchGrants(endpoint = API_URL) {
  const [grants, setGrants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGrants = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(endpoint);
      if (!res.ok) {
        throw new Error(`Status: ${res.status}`);
      }
      const data = await res.json();
      setGrants(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching grants:', err);
      setError('No se pudo conectar con el servicio local de ayudas.');
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchGrants();
  }, [fetchGrants]);

  return { grants, isLoading, error, refetch: fetchGrants };
}