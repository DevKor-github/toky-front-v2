export function onClickKakaoLogin() {
  window.location.href = process.env.NEXT_PUBLIC_API_URL + '/auth/kakao';
}
