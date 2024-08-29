import { Icon } from '@/libs/design-system/icons';
import ActionButton from '../ActionButton';
import { Flex } from '@/libs/design-system/flex';

export function KakaoLogin() {
  const kakaoLogin = async () => {
    window.location.href = process.env.NEXT_PUBLIC_API_URL + '/auth/kakao';
  };

  return (
    <ActionButton bgColor="#FEE500" fontSize="14px" padding="8px 14px" borderRadius="6px" onClick={kakaoLogin}>
      <Flex $gap={3}>
        <Icon.Kakao />
        로그인
      </Flex>
    </ActionButton>
  );
}
