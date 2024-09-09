import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function ParamProvider() {
  const param = useSearchParams();
  const inviteCode = param.get('referer');

  if (typeof window !== 'undefined' && inviteCode) {
    sessionStorage.setItem('invite-code', inviteCode);
  }

  return <></>;
}

export function SuspenseParamProvider() {
  return (
    <Suspense>
      <ParamProvider />
    </Suspense>
  );
}
