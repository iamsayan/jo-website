'use client';

import runOneSignal from '@/lib/onesignal';
import { useEffectOnce } from '@/hooks/useEffectOnce';

export default function OneSignal() {
  useEffectOnce(() => {
    runOneSignal();
  });

  return null;
}
