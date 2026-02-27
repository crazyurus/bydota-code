import { useNavigate } from '@modern-js/runtime/router';
import { useEffect } from 'react';

function Page(): null {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('./record');
  }, []);

  return null;
}

export default Page;
