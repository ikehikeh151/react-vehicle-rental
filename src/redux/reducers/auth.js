import { ACTION_STRING } from "../actions/actionString"
import { ActionType } from "redux-promise-middleware"

const initialState = {
  userData: {
    token: JSON.parse(localStorage["vehicle-token"] || null),
    photo: "",
    role: 0
  },
  isPending: false,
  isFulfilled: false,
  isRejected: false,
  err: {}
}
const authReducer = (prevState = initialState, action) => {
  const { authLogin, authLogout } = ACTION_STRING
  const { Pending, Fulfilled, Rejected } = ActionType
  // membuat logic berdasarkan action
  switch (action.type) {
    // case authLogin + pending:
    case authLogout:
      var userData = {
        ...prevState.userData,
        token: null
      }
      return {
        ...prevState,
        isRejected: true,
        isPending: false,
        isFulfilled: true,
        userData
      }

    case authLogin.concat("_", Pending):
      return {
        ...prevState,
        isPending: true,
        isFulfilled: false,
        isRejected: false
      }

    // case authLogin + fulfilled:
    case authLogin.concat("_", Fulfilled):
      const data = action.payload.data

      userData = {
        ...prevState.userData,
        token: data.result.token
      }
      return {
        ...prevState,
        isRejected: false,
        isPending: false,
        isFulfilled: true,
        userData
      }

    // case authLogin + rejected:
    case authLogin.concat("_", Rejected):
      const err = action.payload
      return {
        ...prevState,
        isPending: false,
        isRejected: true,
        err
      }

    default:
      return prevState
  }
}

export default authReducer