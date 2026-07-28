/* =========================================================================
   홈의 챕터 목록
   -------------------------------------------------------------------------
   · 번호(01, 02…)는 배열 순서에서 나옵니다. 손으로 매기지 마세요.
     섹션을 넣거나 빼면 번호와 오른쪽 목차가 함께 따라옵니다.
   · id 는 <section id> 이자 목차 앵커입니다. 바꾸면 링크가 끊깁니다.
   · label 은 섹션 위 작은 라벨(eyebrow)이자 목차에 뜨는 이름입니다.
     등대 어휘는 여기와 섹션 제목에만 씁니다. 본문은 담백하게 둡니다.
   ========================================================================= */

export interface Chapter {
  id: string;
  label: string;
}

export const homeChapters: Chapter[] = [
  { id: 'lost', label: '사라진 것들' },
  { id: 'standard', label: '정한 기준' },
  { id: 'works', label: '켜 둔 것들' },
  { id: 'order', label: '등을 세우는 순서' },
  { id: 'glass', label: '유리를 닦는 일' },
  { id: 'beside', label: '곁에 있는 방식' },
  { id: 'keeper', label: '등대지기 한 사람' },
  { id: 'unsaid', label: '하지 않는 말' },
];

/** '01' 형태의 두 자리 번호. 배열 순서가 곧 번호입니다. */
export const chapterNo = (i: number) => String(i + 1).padStart(2, '0');
