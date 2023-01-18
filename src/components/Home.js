import React, { useEffect, useState } from "react";
import PhoneBook from "./ContactPerson/PhoneBook";
import PopUp from './PopUp/popup';
import Btn from './shared/button/button';
import './Home.css';
import EditContact from './Form/EditContact/EditContact';
import { Link } from "react-router-dom";
import { AiOutlineContacts } from 'react-icons/ai';
import FavoriteContact from "./favorites/FavoriteContact";
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
//getting fav in LS :
const getFaveFromLs=()=>{
  const fav =localStorage.getItem('favorites');
  if(fav){
    return JSON.parse(fav)
  }else{
    return[]
  }
}


const App = () => {
  //main State:
  
  const [allusers, setAllusers] = useState(getValueFromLS());
  const [name, setName] = useState('');
  const [lastName,setLastName] =useState('');
  const [phone,setPhone] =useState('');
  const [age,setAge] =useState('');
  const [gender, setGender] =useState('');
  const [email,setEmail] =useState('');
  const[address,setAddress]=useState('');
  const [id, setId] = useState(null);


  const [search,setSearch]=useState('');
  const [sortNormal,setSortNormal] =useState([]);

  
  //show popup form :
  
  const [editFormPopUp,setEditFormPopUp] =useState(false);
  const[favorites,setFavorites]=useState(getFaveFromLs())

  let findfavorite = allusers.filter(user => favorites.includes(user.id));
  

  //saving data :
  
  useEffect(()=>{
    localStorage.setItem('users',JSON.stringify(allusers));
  },[allusers])

  useEffect(()=>{
    localStorage.setItem('favorites',JSON.stringify(favorites));
  },[favorites])
      
  //edit btn:
  const setForUpdate = user => {
    
    setName(user.name);
    setLastName(user.lastName);
    setPhone(user.phone);
    setAge(user.age);
    setGender(user.gender)
    setEmail(user.email);
    setAddress(user.address)
    setId(user.id);
    toast.warning("برای ویرایش دیگر شمارها مخاطب را حذف کرده و اطلاعات رو مجدد وارد کنید")
    setEditFormPopUp(true) 
    
  };
  
  
  const addFav=(id)=>{
    if(!findfavorite.includes(id)) {
      setFavorites(favorites.concat(id));
      console.log("this is id in fav func:",id);
      console.log("this is favorites",favorites);
      
  
    }
    
  }
  const removeFavorites =(id)=>{
  
    let index = favorites.indexOf(id);
    console.log("this is index in remove fav func",index);
    let list =[...favorites.slice(0,index)];
    setFavorites(list);
    console.log("this is list fav",list);
  }
  




    //delete btn:
    function DeletePerson(id){
      const filterPhone = allusers.filter((element,index)=>{
          return element.id!== id
       })
   
       setAllusers(filterPhone)
   }
      /// Sort data:

      function handleSort (){
        const sortAtoZ = allusers.sort((a, b) => a.lastName.localeCompare(b.lastName));
        setSortNormal(Contact => Contact.slice(sortAtoZ));
    
      console.log("sortAtoZ");
      
    };
    
    
      function handleSortReverse (){
       const sortZtoA = allusers.sort((a, b) =>b.lastName.localeCompare(a.lastName));
       setSortNormal(Contact => Contact.slice(sortZtoA));
      
        console.log("sortZtoA");
        
    };
console.log(allusers);
    

  return (
    <>
    <header>
     <div className="container">
      <Link to={`/FormContact`}> <Btn>افزودن مخاطب</Btn></Link>
       <h3 className="text-header" >دفترچه تلفن <AiOutlineContacts size="29px" color="#fff"/></h3>
     
     </div>
     </header>

      <div>
     <nav className='hi'>
          <ul className='nav'>
            <li>
            <button id="btn-sort-reverse" onClick={handleSort}>بر اساس حروف الفبا </button>
            </li>
            <input 
                 id="SearchBox" 
                 type="text" 
                 placeholder="جستجو ..." 
                 value={search}
                 onChange={e => {setSearch(e.target.value)}}
                 />
            <li>
            <button id="btn-sort"  onClick={handleSortReverse}>بر اساس عکس حروف الفبا</button>
            </li>
          </ul>
     </nav>
</div> 

<div>
  {findfavorite.length>0&&
    <div  className="fav-list">
    <>
            <FavoriteContact
            findfavorite={findfavorite}
            removeFavorites={removeFavorites}
            />

        </>
        </div>
  }
  {findfavorite.length<1&&<div className="No-Contact">لیست مورد علاقه خالی است</div>}


  <hr/>
</div>


<PopUp trigger={editFormPopUp} setTrigger={setEditFormPopUp} >

      <EditContact
       setId={setId}
       setAge={setAge}
       setName={setName}
       setEmail={setEmail}
       setPhone={setPhone}
       setGender={setGender}
       setAddress={setAddress}
       setLastName={setLastName}
       setAllusers={setAllusers}
       setEditFormPopUp={setEditFormPopUp}
       id={id}
       age={age}
       name={name}
       email={email}
       phone={phone}
       gender={gender}
       address={address}
       lastName={lastName}
       allusers={allusers} 

      />

  </PopUp>  


     
<div className="card-style">
{allusers.length>0&&<>

 <PhoneBook 
  search={search}
  allusers={allusers} 
  favorites={favorites}
  sortNormal={sortNormal}
  addFav={addFav}
  setSearch={setSearch}
  handleSort={handleSort}
  setForUpdate={setForUpdate}
  DeletePerson={DeletePerson}
  handleSortReverse={handleSortReverse}
   /> 

</>}
{allusers.length<1 && <div className='No-Contact'>مخاطبی وارد نشده است .</div>}
</div>
    </>
  );
};

export default App;