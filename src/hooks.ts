import { useState, useCallback } from 'react';

export function useLoading<F extends (...args: any) => Promise<any>>(
  handler: F,
): [F, boolean, Error | undefined] {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error>();
  const newHandler = useCallback(
    (...args: any) => {
      setLoading(true);

      return handler(...args)
        .catch(e => {
          setError(e);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [handler],
  );

  return [newHandler as F, loading, error];
}
