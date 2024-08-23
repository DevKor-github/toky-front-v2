import { useCopyToClipboard } from '@/libs/hooks/useCopyToClipboard';
import { usePreservedCallback } from '@/libs/hooks/usePreservedCallback';
import ActionButton from '../ActionButton';
import { Icon } from '@/libs/design-system/icons';

export function CopyInviteCode() {
  const [copiedText, copy] = useCopyToClipboard();
  const { inviteCode } = { inviteCode: 'inviteCode' };

  function generateInviteCode(code: string) {
    return process.env.NEXT_PUBLIC_DOMAIN_URL + '&referer=' + inviteCode;
  }

  const handleCopy = usePreservedCallback(() => {
    copy(generateInviteCode(inviteCode))
      .then((isCopied) => {
        if (isCopied) {
          // TODO toast 띄우기?
        } else {
          // TODO 복사할 수 있게 모달 띄우기?
          console.log('Failed');
        }
      })
      .catch((e) => {
        console.error(e);
      });
  });

  return (
    <ActionButton
      bgColor="var(--white-high-emphasis-87, rgba(255, 255, 255, 0.87))"
      color="#121212"
      borderRadius="99px"
      padding="8px 16px"
      fontSize="14px"
      fontWeight="700"
      onClick={handleCopy}
    >
      <Icon.TablerCopy />내 초대링크
    </ActionButton>
  ); // TODO: 간격 설정 필요, 초대링크 복사 기능 추가 필요
}
