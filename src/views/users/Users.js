import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CPagination
} from '@coreui/react'
import { axiosInstance } from 'src/axiosinstance'

// import usersData from './UsersData'
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Users = () => {
  const [usersData,setUsersData]= useState([])
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
  }
  useEffect(() => {
    axiosInstance.get("/users/")
    .then(function(response){
      console.log(response)
      setUsersData(response.data)
      // setFormData(response.data);
    })
    .catch(function(err){
      console.log(err);
    })
    currentPage !== page && setPage(currentPage)
  }, [])

  return (
    <CRow>
      <CCol xl={10}>
        <CCard>
          <CCardHeader>
            Users
            {/* <small className="text-muted"> example</small> */}
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={usersData}
            fields={[
              { key: 'fname', _classes: 'font-weight-bold' },
              'lname','email', 'phone_number','_id'
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/users/${item._id}`)}
            scopedSlots = {{
              'status':
                (item)=>(
                  <td>
                    <CBadge color={getBadge(item.status)}>
                      {item.status}
                    </CBadge>
                  </td>
                )
            }}
          />
          <CPagination
            activePage={page}
            onActivePageChange={pageChange}
            pages={5}
            doubleArrows={false} 
            align="center"
          />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Users
