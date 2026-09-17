(() => {
  const STORAGE_KEY = "stayedScenesState";
  const defaults = [
    {id:"porto",country:"포르투갈",countryEn:"PORTUGAL",city:"포르투",cityEn:"PORTO",date:"2025-06-14",type:"도시 탐방",transport:"대중교통",place:"동 루이스 1세 다리",rating:5,cost:1800000,title:"느린 강변의 오후",review:"해 질 무렵 도우루강을 따라 걷던 시간이 가장 오래 남았다. 서두르지 않아도 좋은 도시라는 생각이 들었다.",image:"https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=1800&q=85",alt:"포르투의 주황색 지붕과 도우루강"},
    {id:"kyoto",country:"일본",countryEn:"JAPAN",city:"교토",cityEn:"KYOTO",date:"2024-11-08",type:"문화·예술",transport:"대중교통",place:"기요미즈데라",rating:5,cost:1250000,title:"붉게 물든 골목",review:"단풍이 내려앉은 오래된 골목을 천천히 걸었다. 저녁 종소리와 작은 찻집의 온기가 오래 기억에 남는다.",image:"https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85",alt:"교토의 전통 거리와 오층탑"},
    {id:"barcelona",country:"스페인",countryEn:"SPAIN",city:"바르셀로나",cityEn:"BARCELONA",date:"2024-07-21",type:"문화·예술",transport:"대중교통",place:"구엘 공원",rating:4,cost:2300000,title:"색과 곡선의 도시",review:"가우디의 건축을 따라 걷는 동안 도시 전체가 하나의 전시처럼 느껴졌다. 늦은 저녁 광장의 활기도 인상적이었다.",image:"https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1800&q=85",alt:"바르셀로나 구엘 공원의 타일 장식"},
    {id:"jeju",country:"대한민국",countryEn:"KOREA",city:"제주",cityEn:"JEJU",date:"2023-05-03",type:"자연 여행",transport:"렌터카",place:"성산일출봉",rating:5,cost:680000,title:"바람을 따라 걷던 날",review:"검은 현무암 해안과 푸른 바다 사이로 바람이 세차게 불었다. 성산일출봉에서 바라본 제주의 넓은 풍경이 가장 선명하다.",image:"https://images.unsplash.com/photo-1642950722659-94734c495370?auto=format&fit=crop&w=1800&q=85",alt:"제주의 바다와 검은 현무암 해안"},
    {id:"paris",country:"프랑스",countryEn:"FRANCE",city:"파리",cityEn:"PARIS",date:"2022-09-17",type:"도시 탐방",transport:"대중교통",place:"세느강",rating:4,cost:2650000,title:"비 온 뒤의 저녁",review:"비가 그친 세느강 주변의 불빛이 젖은 길 위로 번졌다. 계획 없이 걷다가 만난 작은 서점이 특히 좋았다.",image:"https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=85",alt:"파리 에펠탑과 세느강 풍경"},
    {id:"new-york",country:"미국",countryEn:"USA",city:"뉴욕",cityEn:"NEW YORK",date:"2021-12-24",type:"도시 탐방",transport:"대중교통",place:"센트럴 파크",rating:5,cost:3400000,title:"겨울의 빛과 소음",review:"크리스마스 조명과 분주한 거리의 소리가 영화의 한 장면처럼 느껴졌다. 눈 내린 센트럴 파크의 고요함도 잊기 어렵다.",image:"https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1800&q=85",alt:"뉴욕 맨해튼의 거리와 건물"}
  ];

  const readState = () => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return value && Array.isArray(value.records) && Array.isArray(value.deleted) ? value : {records:[],deleted:[]};
    } catch {
      return {records:[],deleted:[]};
    }
  };
  const writeState = state => localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  const getAll = () => {
    const state = readState();
    const overrides = new Map(state.records.map(record => [record.id, record]));
    const initial = defaults.filter(record => !state.deleted.includes(record.id)).map(record => ({...record,...overrides.get(record.id)}));
    const custom = state.records.filter(record => !defaults.some(item => item.id === record.id) && !state.deleted.includes(record.id)).sort((a,b) => (b.createdAt || 0) - (a.createdAt || 0));
    return [...custom,...initial];
  };
  const get = id => getAll().find(record => record.id === id);
  const save = record => {
    const state = readState();
    const index = state.records.findIndex(item => item.id === record.id);
    if (index >= 0) state.records[index] = record; else state.records.push(record);
    state.deleted = state.deleted.filter(id => id !== record.id);
    writeState(state);
  };
  const remove = id => {
    const state = readState();
    state.records = state.records.filter(record => record.id !== id);
    if (!state.deleted.includes(id)) state.deleted.push(id);
    writeState(state);
  };
  const formatDate = value => value.replaceAll("-", ".");
  const formatKoreanDate = value => {
    const [year,month,day] = value.split("-").map(Number);
    return `${year}년 ${month}월 ${day}일`;
  };
  window.TravelStore = {getAll,get,save,remove,formatDate,formatKoreanDate};
})();
