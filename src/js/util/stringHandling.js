// 한글 AC00—D7AF,
export const checkHangul = (code) => {
  if (0xac00 <= code && code <= 0xd7af) {
    return true;
  }
  return false;
};

// 한글 자모 3130—318F
export const checkHangulAlphabet = (code) => {
  if (0x3130 <= code && code <= 0x318f) {
    return true;
  }
  return false;
};

const initialList = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

export const getInitial = (word) => {
  const ga = 44032;
  let uni = word.charCodeAt(0);
  uni = uni - ga;
  let initialIndex = parseInt(uni / 588);

  return initialList[initialIndex];
};
