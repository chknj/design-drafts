/* ------------------------------------------------------------------
   HAAN MANAGEMENT — model data
   실제 모델로 교체할 때 이 파일만 수정하면 리스트/상세/메인 캐러셀에
   모두 반영됩니다. 사진은 assets/img/models/<slug>/00.jpg(대표) ~ 05.jpg
   ------------------------------------------------------------------ */
window.HAAN_DATA = {
  agency: {
    name: "HAAN MANAGEMENT",
    short: "HAAN",
    tel: "+82 2 000 0000",
    email: "booking@haanmgmt.com",
    address: "Dosan-daero 45gil 12, Gangnam-gu, Seoul, Korea",
    addressKo: "서울특별시 강남구 도산대로45길 12",
    instagram: "https://instagram.com/",
  },
  models: [
    {
      slug: "jiwoo", name: "JIWOO", gender: "women", origin: "Seoul, KR", korean: true,
      status: "IN TOWN", activity: "IN TOWN",
      height: 176, bust: 31, waist: 23.5, hips: 34.5, shoes: 245,
      hair: "BLACK", eyes: "DARK BROWN", photos: 6
    },
    {
      slug: "elise", name: "ELISE", gender: "women", origin: "Lyon, FR", korean: false,
      status: "IN TOWN", activity: "09.02 - 11.20",
      height: 178, bust: 32, waist: 24, hips: 35, shoes: 255,
      hair: "LIGHT BROWN", eyes: "BLUE", photos: 6
    },
    {
      slug: "amara", name: "AMARA", gender: "women", origin: "London, UK", korean: false,
      status: "NEW FACE", activity: "09.15 - 12.10",
      height: 180, bust: 32.5, waist: 24.5, hips: 36, shoes: 260,
      hair: "DARK BROWN", eyes: "BROWN", photos: 6
    },
    {
      slug: "dohyun", name: "DOHYUN", gender: "men", origin: "Busan, KR", korean: true,
      status: "IN TOWN", activity: "IN TOWN",
      height: 186, bust: 36, waist: 29, hips: 37, shoes: 275,
      hair: "BLACK", eyes: "DARK BROWN", photos: 6
    },
    {
      slug: "matteo", name: "MATTEO", gender: "men", origin: "Milan, IT", korean: false,
      status: "IN TOWN", activity: "08.20 - 10.30",
      height: 189, bust: 37, waist: 30, hips: 37.5, shoes: 280,
      hair: "BROWN", eyes: "HAZEL", photos: 6
    },
    {
      slug: "noah", name: "NOAH", gender: "men", origin: "Copenhagen, DK", korean: false,
      status: "DIRECT BOOKING", activity: "DIRECT BOOKING",
      height: 188, bust: 36.5, waist: 29.5, hips: 37, shoes: 285,
      hair: "BLONDE", eyes: "GREEN", photos: 6
    }
  ]
};
