import { swal, swalLoading, swalClose } from '../helpers/swal'
import axios from '../api/axios'

export function setMissions(payload) {
  return { type: 'MISSIONS/SET_MISSIONS', payload }
}

export function setMission(payload) {
  return { type: 'MISSIONS/SET_MISSION', payload }
}

export function setLoading(payload) {
  return { type: 'MISSIONS/SET_LOADING', payload }
}

export function setLogin(payload) {
  return { type: 'LOGIN/SET_LOGIN', payload }
}

export function fetchMissions(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true))
      const response = await axios({
        method: 'get',
        url: `/missions`,
      })
      dispatch(setMissions(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function getMissionById(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true))
      const response = await axios({
        method: 'get',
        url: `/missions/${payload}`,
      })
      console.log(response, 'dari action')
      dispatch(setMission(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export function updateMission(payload) {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true))
      await axios({
        method: 'put',
        url: `/missions/${payload._id}`,
        data: {
          title: payload.title,
          experience: payload.experience,
          description: payload.description,
          contributor: payload.contributor,
          status: payload.status
        }
      })
      dispatch(fetchMissions())
    } catch (err) {
      console.log(err)
    }
  }
}

export function deleteMission(payload) {
  return async (dispatch, getState) => {
    try {
      console.log(payload, 'action>>>>')
      dispatch(setLoading(true))
      await axios({
        method: 'delete',
        url: `/missions/${payload}`,
      })
      dispatch(fetchMissions())
    } catch (err) {
      console.log(err)
    }
  }
}

export function postMission(payload) {
  return async (dispatch, getState) => {
    try {
      console.log('Post mission to server')
      let { mission } = getState()

      dispatch(setLoading(true))
      swalLoading()

      const response = await axios({
        method: 'post',
        url: `/missions`,
        data: mission,
      })

      console.log(response, 'response dari server, post mission')
      dispatch(setMission(response))

      dispatch(setLoading(false))

      swalClose()
      swal('Successfully added mission to server')
    } catch (err) {
      console.log(err)
      swalClose()
      swal('Failed to upload mission to server', 'error')
    }
  }
}


export function LoginAdmin(payload) {
  return async (dispatch) => {
    try {
      const { data } = await axios({
        method: "post",
        url: `/admin/login`,
        data: {
          email: payload.email,
          password: payload.password
        }
      })
      dispatch(setLogin(true))
      localStorage.setItem('access_token', data.access_token)
    } catch(err) {
      console.log(err)
    }
  }
}