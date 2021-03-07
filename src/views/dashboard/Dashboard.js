import React, { lazy, useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
} from '@coreui/react'
import { axiosInstance } from 'src/axiosinstance.js'
import DocsLink from 'src/reusable/DocsLink.js'
import { CChartBar } from '@coreui/react-chartjs'

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))

const Dashboard = () => {
const [reservedDays,setReservedDays] = useState([])
const [reservedMonths,setReservedMonths] = useState([])


useEffect(()=>{
  axiosInstance.get("/reservations/")
  .then((reservations)=>{
    console.log(reservations.data)
    const resDates = reservations.data.map((ele)=>{
      let date = new Date(ele.start_date) .getDay()
      let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[date] })

      let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
      const resMonths = reservations.data.map((ele)=>{
        let date = new Date(ele.start_date).getMonth()
        return months[date] })
        
        let counter = 0, monthsAvg = []
        for (let index = 0; index < months.length; index++) {
          for (let i = 0; i < resMonths.length; i++) {
            if (resMonths[i]==months[index]) {
              counter++
            }
          }
          monthsAvg.push(counter)
            counter=0;
        }
      setReservedDays(resDates)
      setReservedMonths(monthsAvg)
    })

},[])

  
  const setReserveAvg = (day)=>{
    let days = reservedDays.filter((ele)=>ele==day)
    let count = days.length
    let avg =(count/reservedDays.length)*100
    return avg
  }

  return (
    <>
      <WidgetsDropdown />
      <CCard>
      <CCard>
        <CCardHeader>
            Reservations In Months
          <DocsLink href="http://www.chartjs.org"/>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: 'Reservations',
                backgroundColor: '#f87979',
                data: reservedMonths
              }
            ]}
            labels="months"
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>
      </CCard>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
               Resrvations In Week 
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12">
                <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Saturday ({setReserveAvg("Saturday")}%)
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value={setReserveAvg("Saturday")} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Sunday ({setReserveAvg("Saturday")}%)
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value={setReserveAvg("Sunday")} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                        Monday ({setReserveAvg("Monday")}%)
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value={setReserveAvg("Monday")} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Tuesday ({setReserveAvg("Tuesday")}%)
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value={setReserveAvg("Tuesday")} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Wednesday ({setReserveAvg("Wednesday")}%)
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value={setReserveAvg("Wednesday")} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Thursday ({setReserveAvg("Thursday")}%)
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value={setReserveAvg("Thursday")} />
                    </div>
                  </div>
                  <div className="progress-group mb-4">
                    <div className="progress-group-prepend">
                      <span className="progress-group-text">
                      Friday ({setReserveAvg("Friday")}%)
                      </span>
                    </div>
                    <div className="progress-group-bars">
                      <CProgress className="progress-xs" color="info" value={setReserveAvg("Friday")} />
                   </div>
                  </div>
                </CCol>
              </CRow>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
