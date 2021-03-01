import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useHistory } from 'react-router-dom'
import { axiosInstance } from 'src/axiosinstance'

// import user from './user'

const User = ({match}) => {
  const [user,setUser]= useState([])

  // const user = user.find( user => user.id.toString() === match.params.id)
  const userDetails = user ? Object.entries(user) : 
  [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
  useEffect(() => {
    axiosInstance.get(`/users/${match.params.id}`)
    .then(function(response){
      console.log(response)
      setUser(response.data)
      // setFormData(response.data);
    })
    .catch(function(err){
      console.log(err);
    })
  }, [])
  const history = useHistory();
  return (
    <CRow>
      <CCol lg={10}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    userDetails.map(([key, value], index) => {
                      return (
                        <tr key={index.toString()}  onClick={(item) => {
                          if (item.target.childNodes[0].data==='places:'){
                            // history.push(`/users/${match.params.id}/places`)
                          }
                        }}>
                          <td>{`${key}:`}</td>
                          <td><strong>{value}</strong></td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
