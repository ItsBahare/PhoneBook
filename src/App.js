import EditContact from "./components/Form/EditContact/EditContact";
import FormContact from "./components/Form/FormContact"; 
import Home from './components/Home';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, createBrowserRouter, Route, RouterProvider, R } from 'react-router-dom';
import { Fragment } from "react";
import CheckingInfo from "./components/Form/CheckingInfo";




 function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home/>,
    },
    {
      path: "/FormContact",
      element: <FormContact/>,
    },
    {
      path: "/CheckingInfo/:id",
      element: <CheckingInfo />,
    },
    {
      path:"/EditContact",
      element:<EditContact/>
    }
  ]);
  return (

    <Fragment>
      <ToastContainer/>
    <RouterProvider router={router}/>
    </Fragment>


   );
 }

 export default App;