import { checkHangul, checkHangulAlphabet } from "./stringHandling";

export const customCompare = (a, b) => {
  const typeclassification = (string) => {
    const code = string.toLowerCase().charCodeAt(0);
    let prefix;
    // 한글 확인
    if (checkHangul(code) || checkHangulAlphabet(code)) {
      prefix = "1";
    }
    // 영어 소문자 0061-007A
    else if (0x61 <= code && code <= 0x7a) {
      prefix = "2";
    }
    // 기타 유니코드
    else {
      prefix = "9";
    }
    return prefix + string;
  };
  a = typeclassification(a);
  b = typeclassification(b);

  return a.localeCompare(b);
};
