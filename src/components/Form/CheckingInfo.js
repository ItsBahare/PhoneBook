import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './CheckingInfo.css';

 //getting value of local storage:
 const getValueFromLS=()=>{
  const user= localStorage.getItem('users');
  if(user){
      return JSON.parse(user)
  }else{
    return []
  }
}


const CheckingInfo = () => {
   const [allusers, setAllusers] = useState(getValueFromLS());

  const navigate = useNavigate();

  const {id} = useParams()
  let contacts =allusers.find(contact=>contact.id== id);

  function handleHomePage(){

    toast.success("((: مخاطب با موفقیت افزوده شد");
    navigate("/")
  }

  return (
    <div className='check-person-info'>
      <h1 className='check-info'>مشاهده مخاطب</h1>
      <div className="checking-info">
      <p className='check-person'>{contacts.name} {contacts.lastName}</p>
      <p className='check-person'>{contacts.phone}</p>
      {contacts.otherPhone.map((findNumber,i)=>(
        <p key={i} className='check-person'>{findNumber.value}</p>
      ))}
      <p className='check-person'>{contacts.age}</p>
      <p className='check-person'>{contacts.gender}</p>
      <p className='check-person'>{contacts.email}</p>
        <div className='check-person-address'>
        <p className='check-person'>{contacts.address}</p>
        </div>
    <button className='home-btn' onClick={()=>handleHomePage()}>صحفه اصلی</button>
      </div>
    </div>
  )
}

export default CheckingInfo;