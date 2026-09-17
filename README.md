# 머문 장면 (Stayed Scenes)

과거에 방문한 여행지를 사진과 짧은 기록으로 모아보는 반응형 Multi-Page CRUD Frontend UI입니다.

## Service Topic

**과거 여행 기록 관리 서비스**입니다. 다녀온 국가와 도시, 기억에 남는 장소, 만족도와 후기 등을 개인 여행 아카이브 형태로 기록합니다.

## Data Fields

1. **국가**: 방문한 나라 이름
2. **도시**: 방문한 도시 이름
3. **방문일**: 여행지를 방문한 날짜
4. **여행 유형**: 휴양, 도시 탐방, 자연 여행, 문화·예술, 미식 여행 등의 구분
5. **주요 이동수단**: 여행지에서 주로 이용한 이동수단
6. **가장 기억에 남는 장소**: 여행 중 특히 인상적이었던 장소
7. **만족도**: 1점부터 5점까지의 여행 만족도
8. **여행 비용**: 여행에 사용한 총비용
9. **여행 후기**: 여행에서 기억에 남은 경험과 감상

## List Page

`index.html`은 여행 사진 중심의 카드 목록을 표시합니다. 각 카드에는 **국가, 도시를 나타내는 제목, 방문일, 만족도** 등 4개 이상의 정보를 표시하며, 카드 클릭 시 `view.html`로 이동합니다.

## Validation

`add.html`과 `edit.html`에 필수값, 문자열 최소 길이, 미래 날짜 제한, 여행 비용 범위, 후기 글자 수, Select 선택 여부 검사를 적용했습니다. 유효한 추가 폼 제출 시 `alert()`로 안내하고, 유효한 수정 폼 제출 시 `confirm()`으로 수정 여부를 확인합니다.

## RWD

Bootstrap Grid와 CSS Media Query를 함께 사용했습니다. 데스크톱에서는 두 열의 비대칭 카드 레이아웃과 넓은 여백을 사용하고, 모바일에서는 카드를 한 열로 배치합니다. 내비게이션은 모바일에서 토글 메뉴로 접히며, 폼은 두 열에서 한 열로 바뀝니다. 버튼은 작은 화면에서 전체 너비로 배치했습니다.

## Bootstrap

`container-fluid`, `row`, `col-md-6`, `navbar`, `collapse`, `form-control`, `form-select`, `invalid-feedback`, `btn`, Carousel 컴포넌트를 사용했습니다.

## Problem & Solution

사진 중심 카드가 모바일에서 너무 길어지고 데스크톱의 리듬이 사라지는 문제가 있었습니다. 데스크톱에서는 두 번째 카드에 세로 간격을 주어 비대칭 리듬을 만들고, 768px 미만에서는 해당 간격을 제거해 카드가 일정한 한 열로 이어지도록 Media Query를 적용했습니다. 모든 페이지의 내비게이션, 폼, 버튼 스타일은 `my.css`로 분리했습니다.

## Reflection

Bootstrap Grid로 기본 반응형 구조를 빠르게 만들 수 있지만 서비스 분위기를 표현하려면 타이포그래피, 여백, 이미지 비율을 함께 설계해야 한다는 점을 배웠습니다. HTML의 제약 속성과 JavaScript의 `checkValidity()`를 결합해 일관된 검증 피드백을 제공하는 방법도 알게 되었습니다.

 `novalidate`는 브라우저의 기본 검증 UI를 끄지만 JavaScript의 `checkValidity()`로 제약 조건의 유효성을 확인할 수 있습니다.

## Pages

- `example.html`: Bootstrap Carousel Example
- `index.html`: 여행 기록 목록
- `add.html`: 여행 기록 추가
- `view.html`: 여행 기록 상세 보기
- `edit.html`: 여행 기록 수정

## Deploy

정적 사이트이므로 Vercel에서 별도 Build Command 없이 저장소 루트를 배포하면 `index.html`이 기본 페이지로 표시됩니다.
