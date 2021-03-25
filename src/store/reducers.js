const initialState = {
  missions: [],
  mission: {},
  loading: false,
  isLogin: false
}

function reducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case 'MISSIONS/SET_MISSIONS':
      return { ...state, missions: JSON.parse(JSON.stringify(payload)) }

    case 'MISSIONS/SET_MISSION':
      return { ...state, mission: JSON.parse(JSON.stringify(payload)) }

    case 'MISSIONS/SET_LOADING':
      return { ...state, loading: payload }

    case 'LOGIN/SET_LOGIN':
      return { ...state, isLogin: payload }

    default:
      return state
  }
}

export default reducer
