import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import '../index.css';
import { deleteMission, fetchMissions } from '../store/actions';
import UpdateMissionModal from '../components/UpdateMissionModal.js'


export default function Home() {
  const dispatch = useDispatch()
  const [id, setId] = useState(null)
  useEffect(() => {
    dispatch(fetchMissions())
  }, [dispatch])
  
  const missions = useSelector((state => state.missions))

  const updateMission = (e, id) => {
    e.preventDefault()
    setId(id)
  }

  const delMission = (e, id) => {
    e.preventDefault()
    dispatch(deleteMission(id))
  }

  return (
    <section>
      <div className="container">
        <h2 className="mt-5">List Mission</h2>
        <div className="mt-5">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">No</th>
                <th scope="col">Title</th>
                <th scope="col">Experience</th>
                <th scope="col">Description</th>
                <th scope="col">Contributor</th>
                <th scope="col">Status</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                missions.map((mission, index) => (
                  <tr>
                    <th scope="row">{index+1}</th>
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
                      onClick={(e) => updateMission(e, mission._id)}>
                        Edit Status
                    </button>
                    <button className="btn btn-outline-danger" onClick={(e) => delMission(e, mission._id)} style={{ marginLeft: 10}}>Delete</button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
      <UpdateMissionModal id={id} />
    </section>
  )
}