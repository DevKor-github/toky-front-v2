import { useCopyToClipboard } from '@/libs/hooks/useCopyToClipboard';
import { usePreservedCallback } from '@/libs/hooks/usePreservedCallback';
import ActionButton from '../ActionButton';
import { Icon } from '@/libs/design-system/icons';
import { useProfileStore } from '@/libs/store/Providers/ProfileStoreProvider';
import { useToast } from '@/components/Toast';

export function CopyInviteCode() {
  const [copiedText, copy] = useCopyToClipboard();
  const profile = useProfileStore((state) => state.profile);
  const { inviteCode } = { inviteCode: profile?.inviteCode };
  const { openToast } = useToast();

  function generateInviteCode(code: string) {
    return process.env.NEXT_PUBLIC_DOMAIN_URL + '/?referer=' + inviteCode;
  }

  const handleCopy = usePreservedCallback(() => {
    if (inviteCode) {
      copy(generateInviteCode(inviteCode))
        .then((isCopied) => {
          if (isCopied) {
            openToast({ message: '초대링크 복사!' });
          }
        })
        .catch((e) => {
          alert('에러가 발생했습니다 다시 시도해주세요');
        });
    }
  });

  return (
    <ActionButton
      bgColor="var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87))"
      color="#121212"
      borderRadius="99px"
      padding="8px 16px"
      fontSize="14px"
      fontWeight="700"
      gap="2px"
      onClick={handleCopy}
    >
      <Icon.TablerCopy />내 초대링크
    </ActionButton>
  );
}
