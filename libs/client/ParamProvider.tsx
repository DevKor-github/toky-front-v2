import { Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

function ParamProvider() {
  const param = useSearchParams();

  useEffect(() => {
    // invite-code가 있다면 세션에 저장
    const inviteCode = param.get('referer');
    if (inviteCode) {
      sessionStorage.setItem('invite-code', inviteCode);
    }
  }, [param]);

  return <></>;
}

export function SuspenseParamProvider() {
  return (
    <Suspense>
      <ParamProvider />
    </Suspense>
  );
}
