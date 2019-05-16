import { createStore } from "redux";

const CHECKIN = "@action/checkin";
const CHECKOUT = "@action/checkout";

const InitializeState = {
  checkInStatus: false,
  checkOutStatus: false,
  visitorName: "",
  checkInTimestamp: 0,
  checkOutTimestamp: 0
};

// 리듀서는 순수 함수여야한다 사이드 이펙트 없도록 (API 콜 등은 다른대서 --> 리덕스는 미들웨어를 제공한다.)
function reducer(state = InitializeState, action) {
  switch (action.type) {
    case CHECKIN:
      return {
        ...state,
        visitorName: action.payload.visitorName,
        checkInStatus: true,
        checkInTimestamp: Date.now(),
        checkOutTimestamp: 0
      };
    case CHECKOUT:
      return {
        ...state,
        checkInStatus: true,
        checkOutStatus: true,
        checkOutTimestamp: Date.now()
      };
    default:
      // return Object.assign({}, state);
      return {
        ...state
      };
  }
}

const store = createStore(reducer); // param1 : reducer(변경된 사항에 대한 스냅샵 객체를 리턴)

store.subscribe(() => {
  console.log("change", store.getState());
});

store.dispatch({
  type: CHECKIN,
  payload: {
    visitorName: "아르바이트"
  }
});

store.dispatch({
  type: CHECKOUT,
  payload: {
    visitorName: ""
  }
});

store.dispatch({
  type: CHECKIN,
  payload: {
    visitorName: "강석진"
  }
});
