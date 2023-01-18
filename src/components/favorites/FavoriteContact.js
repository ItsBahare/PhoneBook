import React from 'react';
import ButtonMailto from '../ContactPerson/ButtonMailto';
import ButtonTel from '../ContactPerson/ButtonTel';
import { BsSuitHeartFill } from 'react-icons/bs';
import "./FavoriteContact.css"

const FavoriteContact = ({findfavorite,removeFavorites}) => {
  return (
    findfavorite.map((add)=>(
      <div className="card" key={add.id}>
      <div className="container-card-fav">
        <h4 className='card-fullName-fav'><b className='fav'>{add.name}  {add.lastName}</b></h4> 
      
        <p><ButtonTel  label= {add.phone} tel="tel:09197083431" /></p> 
      
        <div>
          {add.otherPhone.map((number,i)=>(
           <p className='card-otherPhone-fav' key={i}> {number.value}</p>
          ))}
          </div>
        
        <p className='card-age-fav'>{add.age}</p>
      
        <p className='card-gender-fav'>{add.gender}</p>
      
        <p><ButtonMailto  label= {add.email} mailto="mailto:bahare.am78@gmail.com" /></p>
      
        <div className='card-address-fav'>
        <p>{add.address}</p>
        </div>
          <div className='card-btn'>
            <h2><BsSuitHeartFill style={{cursor:"pointer",color:"red"}}  onClick={()=> removeFavorites(add.id)}>fav</BsSuitHeartFill></h2>
          </div>
  </div>
</div>
  ))
  )
}

export default FavoriteContact;