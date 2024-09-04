import { Icon } from '@/libs/design-system/icons';
import ActionButton from '../ActionButton';
import { Flex } from '@/libs/design-system/flex';
import { onClickKakaoLogin } from '@/libs/utils/kakaoLogin';

export function KakaoLogin() {
  return (
    <ActionButton bgColor="#FEE500" fontSize="14px" padding="8px 14px" borderRadius="6px" onClick={onClickKakaoLogin}>
      <Flex $gap={3}>
        <Icon.Kakao />
        로그인
      </Flex>
    </ActionButton>
  );
}
