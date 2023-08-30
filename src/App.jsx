import logo from "./logo.svg";
import "./App.css";
import Nav from "./Components/LeftSide/Nav";
import { Navigate, Route, Routes } from "react-router-dom";
import TodayTasks from './Components/RightSide/TodayTasks/TodayTasks';
import Register from './Components/Register/Register';
import { useState,useEffect } from "react";
import Login from "./Components/Register/Login";
import UpcomingTasks from './Components/RightSide/UpcomingTasks/UpcomingTasks';
import DelayedTasks from "./Components/RightSide/DelayedTasks/DelayedTasks";
import FinishedTasks from './Components/RightSide/FinishedTasks/FinishedTasks';
import NotFound from "./Components/RightSide/404NotFound/NotFound";


function App() {

  const [user, setuser] = useState(null); 

  function rerender(){
    setuser(localStorage.getItem('userToken'))
  }

  useEffect(() => {
    setuser(localStorage.getItem('userToken'))
  }, [user]);

  function ProtectedRoute(props)
  {
    if(localStorage.getItem("userToken")===null)
    {
      return <Navigate to="/register"/>
    }
    else
    {
      //setnavy(2)
      return props.children;
    }
  }

  function UnProtectedRoute(props)
  {
    if(localStorage.getItem("userToken"))
    {
      return <Navigate to="/"/>
    }
    else
    {
      //setnavy(2)
      return props.children;
    }
  }

  return (
    <div className="container-fluid">
      <div className="row ">
          <Nav  user={user}/>
          <Routes>
            <Route path="register" element={ <UnProtectedRoute><Register/></UnProtectedRoute> }/>
            <Route path="login" element={ <UnProtectedRoute><Login rerender={rerender} /></UnProtectedRoute> }/>
            <Route path="" element={ <ProtectedRoute> <TodayTasks /> </ProtectedRoute> } />
            
            <Route path="upcoming" element={ <ProtectedRoute> <UpcomingTasks /> </ProtectedRoute> } />
            <Route path="delayed" element={ <ProtectedRoute> <DelayedTasks /> </ProtectedRoute> } />
            <Route path="finished" element={ <ProtectedRoute> <FinishedTasks /> </ProtectedRoute> } />

            <Route path="404" element={<ProtectedRoute> <NotFound /> </ProtectedRoute>} />
            <Route path="*" element={<ProtectedRoute> <Navigate to={"/404"} /> </ProtectedRoute>} />
          </Routes>
        {/* </div> */}
      </div>
    </div>
  );
}

export default App;
