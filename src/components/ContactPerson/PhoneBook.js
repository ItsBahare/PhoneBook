import './PhoneBook.css'
import ButtonMailto from './ButtonMailto';
import ButtonTel from './ButtonTel';
import { BsSuitHeart } from 'react-icons/bs';



const PhoneBook = ({allusers,DeletePerson,setForUpdate,search,addFav}) => {
    return allusers.filter((value)=>
    
    { if(search === ""){
     return value
    }else if(value.name.toLowerCase().includes(search.toLowerCase())){
     return value

    }else if(value.lastName.toLowerCase().includes(search.toLowerCase())){
     return value
    }else if(value.phone.toLowerCase().includes(search.toLowerCase())){
     return value
     }else if(value.email.toLowerCase().includes(search.toLowerCase())){
      return value
      }
    }).map((add)=>(
        <div className="card" key={add.id}>
        <div className="container-card-phoneBook">
          <h4 className='card-fullName-phoneBook'><b className='phoneBook'>{add.name  }  {  add.lastName}</b></h4> 
        
          <p><ButtonTel  label= {add.phone} tel="tel:09197083431" /></p> 
        
          <div>
            {add.otherPhone.map((number,i)=>(
             <p className='card-otherPhone-phoneBook' key={i}> {number.value}</p>
            ))}
            </div>
          
          <p className='card-age-phoneBook'>{add.age}</p>
        
          <p className='card-gender-phoneBook'>{add.gender}</p>
        
          <p><ButtonMailto  label= {add.email} mailto="mailto:bahare.am78@gmail.com" /></p>
        
          <div className='card-address'>
          <p className='card-address-phoneBook'>{add.address}</p>
          </div>
        
            <div className='card-btn-phoneBook'>
              <h1><button id="button" onClick={() => DeletePerson(add.id)}>حذف</button></h1>
              <h1><button id='button-edit' onClick={()=> setForUpdate(add)}>ویرایش</button></h1>
              <h2><BsSuitHeart style={{cursor:"pointer",color:"red"}}  onClick={()=> addFav(add.id)}>fav</BsSuitHeart></h2>
            </div>
    </div>
  </div>
    ))
     
    
  }
  
  export default PhoneBook;