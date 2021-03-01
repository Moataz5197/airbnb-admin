import React, { useState, useEffect } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { axiosInstance } from 'src/axiosinstance'
// import { useHistory } from 'react-router-dom'

// import placeData from './placeData.js'

const Place = ({match}) => {
    const [place,setPlace]= useState([])

//   const place = placeData.find( place => place.id.toString() === match.params.id)
  const placeDetails = place ? Object.entries(place) : 
  [['id', (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)]]
//   console.log(placeDetails);
//   const history = useHistory();
useEffect(() => {
    axiosInstance.get(`/places/${match.params.id}`)
 .then(function(response){
   console.log(response)
   setPlace(response.data)
   // setFormData(response.data);
 })
 .catch(function(err){
   console.log(err);
 })
}, [])

const objectRender=(value)=>{
    // console.log(value);

    let newVal=Object.entries(value);
    // console.log(newVal);
       return newVal= newVal.map(([key, values], index) => {
        
        //  if(key==='coordinates' || key==='other_imgs'){

        //      console.log(values);
        //  }
         if(typeof(values)==='object'){
             return objectRender(values);
           }
        else{
        return (
            <tr key={index.toString()}>
              <td>{`${key}:`}</td>
              <td><strong>{typeof(values)==='boolean'?(values===true)?'true':'false':values}</strong></td>
            </tr>
          )
    }})


}

  return (
    <CRow>
      <CCol lg={10}>
        <CCard>
          <CCardHeader>
            Place id: {match.params.id}
          </CCardHeader>
          <CCardBody>
              <table className="table table-striped table-hover">
                <tbody>
                  {
                    placeDetails.map(([key, value], index) => {
                        // console.log(key)
                        // let arr=[];
                        if(typeof(value)==='object'){
                         return objectRender(value);
                        }
                        else{
                            return (
                              <tr key={index.toString()}>
                                <td>{`${key}:`}</td>
                                <td><strong>{typeof(value)==='boolean'?(value===true)?'true':'false':value}</strong></td>
                              </tr>
                            )
                        }
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

export default Place
