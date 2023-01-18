import React, {  useState } from "react";
import { toast } from "react-toastify";
import Input from '../../shared/input/input';
import './EditContact.css';

const EditContact = ({allusers,setAllusers,setName,name,setLastName,lastName,setAddress,address,setAge,age,setPhone,phone,setEmail,email,id,setId,gender,setGender,setEditFormPopUp}) => {
  const [checkName , setCheckName] = useState('');
  const [checkLastName , setCheckLastName] = useState('');
  const [checkPhone , setCheckPhone] = useState('');
  const [submitted,setSubmitted] = useState(false);

    function handleName(e) {
      const fName = new RegExp("^[ا-ی]+$").test(e.target.value)
      if(fName){
          setName(e.target.value)
      }else{
          alert("نام را به فارسی وارد کنید")
          
      }  
   }
   
   function handleLastName(e) {
    const lName = new RegExp("^[ا-ی]+$").test(e.target.value)
    if(lName){
       setLastName(e.target.value)
    }else{
       alert("نام خانوادگی را به فارسی وارد کنید")
    }
   }
   
   
   function handleAge(e){
       if(Number(e.target.value >=1)&& Number(e.target.value)<100){
               setAge(e.target.value)
       }else{
          alert("سن اشتباه وارد شده است")
       }
   }


   const update = e => {
    
    e.preventDefault();
    const Email = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim ;



    let modifiedData = allusers.map(user => {
      if (user.id === id) {
        return { ...user, 
          name: name,
          lastName:lastName,
          phone:phone,
          age:age,
          gender:gender, 
          email: email,
          address:address 
        };
      }

      return user;
      
    });
    if (!name){
      setCheckName("وارد کردن نام الزامی است ")
      setSubmitted(false);
    }
    
    if (!lastName){
      setCheckLastName("وارد کردن نام خانوادگی الزامی است ");
      setSubmitted(false);
    }
    
    if (!phone){
      setCheckPhone("وارد کردن شماره تلفن الزامی است ");
      setSubmitted(false);
    }
    if(!Email.test(email)){
      {
     return toast.error("فرمت ایمیل رعایت شود")
    }
  }
    if(name&&lastName&&phone.trim().length !== 0){
      console.log('input value is NOT empty');
      setSubmitted(true)
    }

    setAllusers(modifiedData);
    setEditFormPopUp(false);
    localStorage.setItem("users", JSON.stringify(modifiedData));
    setId(null);
    

  };
  
  // set gender
  const genderList = [
    { value: "مرد", label: "مرد" },
    { value: "زن", label: "زن" },
  
  ];


  return (
    <div>
        <form id="info-editForm">
         <label htmlFor="name">نام</label>
        <Input 
        type="text" 
        name="name" 
        id="name" 
        value={name} 
        required
        onChange={handleName} />
        {checkName &&(
        <p className="checkError">{checkName}</p>
        )}

        <label htmlFor="lastName">نام خانوادگی</label>
        <Input 
        type="text" 
        name="lastName" 
        id="lastName" 
        value={lastName} 
        required
        onChange={handleLastName} />
        {checkLastName &&(
        <p className="checkError">{checkLastName}</p>
        )}

        <label htmlFor="phone">شماره تلفن</label>
        <Input 
        type="number" 
        name="phone" 
        id="phone" 
        value={phone} 
        required
        onChange={e=>{setPhone(e.target.value)}}/>
        {checkPhone &&(
          <p className="checkError">{checkPhone}</p>
          )}

        <label htmlFor="age">سن</label>
        <Input 
        type="number" 
        name="age" 
        id="age" 
        value={age}
        required
        onChange={handleAge}  />

      <div className="gender-list">
        {genderList.map((x,i)=> <label key={i}>
        <input
          type="radio"
          name="gender"
          id="gender"
          value={x.value}
          onChange={e=>{setGender(e.target.value)}}
        />{x.label}
        </label>)}
      </div>
      <br/>

        <label htmlFor="email">ایمیل</label>
        <Input
        type="email" 
        name="email" 
        id="email"
        value={email} 
        onChange={e=>{setEmail(e.target.value)}} />

        <label htmlFor="address">آدرس</label>

        <textarea 
        type="text" 
        name="address" 
        id="address-edit"
        value={address}
        onChange={e=>{setAddress(e.target.value)}} />

          <button className="upload"value={submitted} onClick={update}>بروزرسانی</button>
        </form>
    </div>
  )
}

export default EditContact;

