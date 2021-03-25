import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../index.css'
import { deleteMission, fetchMissions, setLogin } from '../store/actions'
import UpdateMissionModal from '../components/UpdateMissionModal.js'
import { useHistory } from 'react-router-dom'

export default function Home() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [id, setId] = useState(null)
  useEffect(() => {
    dispatch(fetchMissions())
    // eslint-disable-next-line
  }, [dispatch])

  useEffect(() => {
    if (!localStorage.getItem('access_token')) {
      history.push('/login')
    }
    // eslint-disable-next-line
  }, [])

  const missions = useSelector((state) => state.missions)

  const updateMission = (e, id) => {
    e.preventDefault()
    setId(id)
  }

  const delMission = (e, id) => {
    e.preventDefault()
    dispatch(deleteMission(id))
  }

  const handleLogout = (event) => {
    event.preventDefault()
    localStorage.clear()
    history.push('/login')
    dispatch(setLogin(false))
  }

  return (
    <div>
      <nav className="nav bg-dark justify-content-end fixed p-2 sticky">
        <button
          onClick={(event) => handleLogout(event)}
          className="nav-link active btn btn-sm btn-danger"
        >
          Logout
        </button>
      </nav>
      <div className="container-fluid p-5">
        <h2 className="mt-5">List Mission</h2>
        <div className="mt-5" id="table">
          <table className="table ">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Title</th>
                <th scope="col">Experience</th>
                <th span="1" style={{ width: '20%' }} scope="col ">
                  Description
                </th>
                <th scope="col">Contributor</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((mission, index) => (
                <tr className="tableRow" key={mission._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{mission.title}</td>
                  <td>{mission.experience}</td>
                  <td>{mission.description}</td>
                  <td>{mission.contributor}</td>
                  <td>{String(mission.status)}</td>
                  <td>
                    <button
                      className="btn btn-outline-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#example-update-mission"
                      data-bs-whatever="@getbootstrap"
                      onClick={(e) => updateMission(e, mission._id)}
                    >
                      Edit Status
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={(e) => delMission(e, mission._id)}
                      style={{ marginLeft: 10 }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <UpdateMissionModal id={id} />
    </div>
  )
}
