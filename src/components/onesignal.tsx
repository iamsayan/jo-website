'use client';

import { useEffect, useRef } from 'react';
import runOneSignal from '@/lib/onesignal';

export default function OneSignal() {
  const initialized = useRef<boolean>(false);

  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      runOneSignal();
    }
  }, []);

  return null;
}
