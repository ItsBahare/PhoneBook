import React, { Fragment, useState } from "react";
import Input from '../shared/input/input';
import { useNavigate} from 'react-router-dom';
import '../Form/FormContact.css';
import { toast } from "react-toastify";

 //getting value of local storage:
 const getValueFromLS=()=>{
  const user= localStorage.getItem('users');
  if(user){
      return JSON.parse(user)
  }else{
    return []
  }
}
const FormContact = () => {

  const [name, setName] = useState('');
  const [lastName,setLastName] =useState('');
  const [phone,setPhone] =useState('');
  const [age,setAge] =useState('');
  const [gender, setGender] =useState('');
  const [email,setEmail] =useState('');
  const[address,setAddress]=useState('');
  const [id,setId]=useState(Math.floor(Math.random() * 100000));
  
  const [allusers, setAllusers] = useState(getValueFromLS());
  const [checkName , setCheckName] = useState('');
  const [checkLastName , setCheckLastName] = useState('');
  const [checkPhone , setCheckPhone] = useState('');
  const [submitted,setSubmitted] = useState(false);


  const navigate = useNavigate();

  const inputArr = [
    {
      type:"number",
      id:1,
      value:""
    }
  ];
  const [otherPhone,setOtherPhone]=useState(inputArr);
  const addInput=()=>{
    setOtherPhone(s=>{
      return[
        ...s,
        {
          type:"number",
          value:""
        }
      ]
    })
  }

const handleChange = e =>{
  e.preventDefault();
  const index = e.target.id;
  setOtherPhone(s=>{
    const newArr = s.slice();
    newArr[index].value = e.target.value;
    return newArr;
  });
};


  
    
    function handleName(e) {
      const fName = new RegExp("^[ا-ی]+$").test(e.target.value)
      if(fName){
          setName(e.target.value)
      }else{
          toast.error("نام را به فارسی وارد کنید")
          
      }  
   }
   
   function handleLastName(e) {
    const lName = new RegExp("^[ا-ی]+$").test(e.target.value)
    if(lName){
       setLastName(e.target.value)
    }else{
      toast.error("نام خانوادگی را به فارسی وارد کنید")
    }
   }
   
   
   function handleAge(e){
       if(Number(e.target.value >=1)&& Number(e.target.value)<100){
               setAge(e.target.value)
       }else{
        toast.error("سن اشتباه وارد شده است")
       }
   }


  function OnSubmitted(event){
    event.preventDefault()
  }
  


     // set gender
  const genderList = [
    { value: "مرد", label: "مرد" },
    { value: "زن", label: "زن" },
  
  ];

   const save = e => {
     e.preventDefault();
     
     const Email = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim ;
    const isDuplicatedPhone =  allusers.find(users=>users.phone===phone);
    
    if (!name){
      setCheckName("وارد کرد نام الزامی است ")
      setSubmitted(false);
    }
    
    if (!lastName){
      setCheckLastName("وارد کرد نام خانوادگی الزامی است ");
      setSubmitted(false);
    }
    
    if (!phone){
      setCheckPhone("وارد کردشماره تلفن الزامی است ");
      setSubmitted(false);
    }
    if(isDuplicatedPhone){
      {
          return toast.error("!شماره تلفن تکراری است")
      }
    }
    if(!Email.test(email)){
      {
     return toast.error("فرمت ایمیل رعایت شود")
    }
  }

    if(name&&lastName&&phone.trim().length !== 0){
      console.log('input value is NOT empty');
      setSubmitted(true)
      var newUsers = {
        id: id,
        name: name,
        lastName:lastName,
        phone:phone,
        otherPhone:otherPhone,
        age:age,
        gender:gender,
        email: email,
        address:address
      };
      navigate(`/CheckingInfo${id}`)
      localStorage.setItem("users", JSON.stringify([...allusers, newUsers]));
      setAllusers(allusers.concat("this is new user",newUsers)); 
      navigate(`/CheckingInfo/${id}`);
    }
    
  };

  return (
    <Fragment>
    <div>

        <form id="info-form" onSubmit={OnSubmitted}>
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

          <button id="plus-button" onClick={addInput}>اضافه کردن دیگر شماره</button>
          {otherPhone.map((item,i)=>{
            return(
              
              <Input
              onChange={handleChange}
              value={item.value}
              id={i}
              key={i}
              type={item.type}
              size="40"
              />
            )
          })}
        <label htmlFor="age">سن</label>
        <Input 
        type="number" 
        name="age" 
        id="age" 
        value={age}
        required
        onChange={handleAge}  />
        
        <div className="gender-list">
        {genderList.map((x, i) => <label key={i}>
          <input
          type="radio"
          name="gender"
          id="gender"
          value={x.value}
          onChange={e => {setGender(e.target.value)}}
          /> {x.label}
         </label>)}
        </div>
      <br/>


        <label htmlFor="email">ایمیل</label>
        <Input
        type="email" 
        name="email" 
        id="email"
        value={email} 
        onChange={e=>{setEmail(e.target.value)}}/>

        <label htmlFor="address">آدرس</label>

        <textarea 
        type="text" 
        name="address" 
        id="address"
        value={address} 
        onChange={e=>{setAddress(e.target.value)}} />
        <button className="add" value={submitted} onClick={save}> افزودن</button>
        </form>
    </div>
    </Fragment>
  )
}

export default FormContact;
