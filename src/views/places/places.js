import React, { useState, useEffect } from 'react'
import { axiosInstance } from 'src/axiosinstance'
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

// import PlacesData from './PlacesData'

const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}

const Places = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [placesData,setPlacesData]= useState([])

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/Places?page=${newPage}`)
  }

  useEffect(() => {
       axiosInstance.get("/places/")
    .then(function(response){
      console.log(response)
      setPlacesData(response.data)
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
            Places
            <small className="text-muted"> example</small>
          </CCardHeader>
          <CCardBody>
          <CDataTable
            items={placesData}
            fields={[
              { key: 'title', _classes: 'font-weight-bold' },
              'summary','num_guests', 'total_bedrooms', '_id'
            ]}
            hover
            striped
            itemsPerPage={5}
            activePage={page}
            clickableRows
            onRowClick={(item) => history.push(`/places/${item._id}`)}
            // scopedSlots = {{
            //   'place_type':
            //     (item)=>(
            //       <td>
            //         {/* <CBadge color={getBadge(item.status)}> */}
            //           {item.place_type.appartment}
            //         {/* </CBadge> */}
            //       </td>
            //     )
            // }}
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

export default Places
