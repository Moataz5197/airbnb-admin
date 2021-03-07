import React, { useEffect, useState } from 'react'
import {
  CWidgetDropdown,
  CRow,
  CCol,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import ChartLineSimple from '../charts/ChartLineSimple'
import ChartBarSimple from '../charts/ChartBarSimple'
import { axiosInstance } from 'src/axiosinstance'

const WidgetsDropdown = () => {
  const [usersNum,setUsersNum]= useState(0)
  const [hostsNum,setHostssNum]= useState(0)
  const [placesNum,setPlacesNum]= useState(0)
  const [reservationsNum,setReservationsNum]= useState(0)


  // render
 useEffect(()=>{
  axiosInstance.get("/users/")
  .then((users)=>{
    setUsersNum(users.data.length)
  })
  axiosInstance.get("/hosting/hosts")
  .then((hosts)=>{
    setHostssNum(hosts.data.length)
  })
  axiosInstance.get("/places/")
  .then((places)=>{
    setPlacesNum(places.data.length)
  })
  axiosInstance.get("/reservations/")
  .then((reservations)=>{
    // console.log(reservations);
    setReservationsNum(reservations.data.length)
  })
 })

  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-primary"
          header={usersNum}
          text="Users Number"
          footerSlot={
            <ChartLineSimple
              pointed
              className="c-chart-wrapper mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[65, 59, 84, 84, 51, 55, 40]}
              pointHoverBackgroundColor="primary"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-info"
          header={hostsNum}
          text="Hosts Number"
          footerSlot={
            <ChartLineSimple
              pointed
              className="mt-3 mx-3"
              style={{height: '70px'}}
              dataPoints={[1, 18, 9, 17, 34, 22, 11]}
              pointHoverBackgroundColor="info"
              options={{ elements: { line: { tension: 0.00001 }}}}
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-warning"
          header={placesNum}
          text="Hosting Places Number"
          footerSlot={
            <ChartLineSimple
              className="mt-3"
              style={{height: '70px'}}
              backgroundColor="rgba(255,255,255,.2)"
              dataPoints={[78, 81, 80, 45, 34, 12, 40]}
              options={{ elements: { line: { borderWidth: 2.5 }}}}
              pointHoverBackgroundColor="warning"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>

      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-danger"
          header={reservationsNum}
          text="Reservations Number"
          footerSlot={
            <ChartBarSimple
              className="mt-3 mx-3"
              style={{height: '70px'}}
              backgroundColor="rgb(250, 152, 152)"
              label="Members"
              labels="months"
            />
          }
        >
        </CWidgetDropdown>
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
