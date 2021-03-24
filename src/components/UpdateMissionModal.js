import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import Swal from 'sweetalert2'
import { getMissionById, updateMission } from '../store/actions'

export default function UpdateMovieModal({ id }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [experience, setExperience] = useState('')
  const [contributor, setContributor] = useState('')
  const [status, setStatus] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    if (id) {
      dispatch(getMissionById(id))
    }
  }, [id])

  const mission = useSelector(state => state.mission)

  useEffect(() => {
    setTitle(mission.title)
    setDescription(mission.description)
    setExperience(mission.experience)
    setContributor(mission.contributor)
    setStatus(mission.status)
  }, [mission])

  const editMission = (e) => {
    e.preventDefault()
    dispatch(updateMission({
      _id: id,
      title: title,
      experience: experience,
      description: description,
      contributor: contributor,
      status: status
    }))
  }

  return (
    <div className="modal fade" id="example-update-mission" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Update Movie</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form onSubmit={editMission}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  aria-describedby="emailHelp" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Experience</label>
                <input 
                  type="number" 
                  className="form-control" 
                  aria-describedby="emailHelp" 
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input 
                  type="text" 
                  className="form-control" 
                  aria-describedby="emailHelp" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contributor</label>
                <input 
                  type="text" 
                  className="form-control" 
                  aria-describedby="emailHelp" 
                  value={contributor}
                  onChange={(e) => setContributor(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label for="exampleInputEmail1" class="form-label">Status</label>
                <select class="form-select" aria-label="Default select example" value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option disabled value="">---------------------------  Select Status  ---------------------------</option>
                  <option>false</option>
                  <option>true</option>
                </select>
                {/* <label className="form-label">Status</label>
                <input 
                  type="checkbox" 
                  // className="form-control" 
                  aria-describedby="emailHelp" 
                  checked={status}
                  onChange={(e) => setStatus(e.target.checked)}
                /> */}
              </div>
            </div>
            <div className="modal-footer">
              <div className="mt-4 d-flex justify-content-center w-100">
                <button className="btn btn-primary w-100" data-bs-dismiss="modal" onClick={editMission}>Submit</button>
              </div>
            </div>
            </form>
        </div>
      </div>
    </div>
  )
}