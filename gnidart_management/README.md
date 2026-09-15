# HAAN MANAGEMENT — 모델 에이전시 사이트 (정적 HTML)

## 구성
```
index.html              메인 (히어로 → 티커 → 소개/서비스 → 모델 캐러셀 → CTA → 푸터)
models.html             모델 리스트 (ALL / WOMEN / MEN 탭, 호버 시 사이즈 패널)
model.html?id=<slug>    모델 상세 (사이즈 cm/inch 토글, 갤러리, 이전/다음)
assets/css/style.css    전체 스타일 (상단 :root 토큰만 바꾸면 컬러·폰트 교체)
assets/js/data.js       에이전시 정보 + 모델 6명 데이터  ← 실제 데이터로 교체하는 곳
assets/js/main.js       렌더링/인터랙션 (외부 라이브러리 없음)
assets/img/models/<slug>/00.jpg ~ 05.jpg   모델 사진 (00 = 대표컷, 3:4 비율 권장 900×1200)
assets/img/hero.jpg     메인 히어로 배경
```
`_src/`, `_partials.html`, `_build.py` 는 헤더·푸터를 한 곳에서 관리하기 위한 선택 사항입니다.
`_partials.html` 수정 후 `python3 _build.py` 를 실행하면 세 페이지에 반영됩니다. 직접 각 HTML을 편집해도 됩니다.

## 실제 데이터로 교체
1. `assets/js/data.js` 의 `agency` (이름/이메일/전화/주소/인스타) 수정
2. `models` 배열의 이름·출신·상태·사이즈 수정. `slug` 는 사진 폴더명과 동일해야 합니다.
3. 사진을 `assets/img/models/<slug>/00.jpg~05.jpg` 로 교체 (`photos` 값으로 장수 조절)

## 폰트
- 영문 헤드라인: Instrument Serif (Google Fonts)
- 본문/한글: Pretendard (jsDelivr CDN)
오프라인 환경에서는 각각 Times / 시스템 산세리프로 대체됩니다.

## 확인 방법
파일을 더블클릭해도 열리지만, `model.html?id=` 쿼리 때문에 로컬 서버 사용을 권장합니다.
```
python3 -m http.server 8000   →  http://localhost:8000
```
