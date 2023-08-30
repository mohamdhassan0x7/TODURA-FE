import React, {useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../LeftSide/nav.css";

export default function Nav(props) {

  const [user, setuser] = useState(null);
  useEffect(() => { 
  setuser(localStorage.getItem("userToken"))
  }, []);

  function logOut(){
    localStorage.removeItem('userToken')
    props.user=null
  }



function clicked(id){
  let click = document.getElementById(id)

  click.classList.add('clicked')

  let nextSibling = click.nextElementSibling;

while(nextSibling) {
    nextSibling.classList.remove('clicked')
    nextSibling = nextSibling.nextElementSibling;
}

let prevSibling = click.previousElementSibling;
while(prevSibling) {
    prevSibling.classList.remove('clicked')
    prevSibling = prevSibling.previousElementSibling;
}

}




  return (
    <>{
      props.user?
      <div className="col-2 pad-0 bg-danger">
          <div class="navii">
            <div class="row flex-nowrap bg-info w-100">
              <div class="col-auto col-md-3 col-xl-2 px-0 bg-dark w-100 mx-0">

                <div class="d-flex flex-column align-items-center  align-items-sm-start text-white min-vh-100 p-0">

                  <ul class="nav nav-pills flex-column mb-sm-auto mx-0 mb-0 p-0 align-items-center align-items-sm-start w-100 "id="menu">


                     <Link to="" id="logo" class="nav-link nav-item w-100 p-0 mb-3 rounded-0" onClick={()=>clicked('home')}>
                        <div className= "w-100 d-flex justify-content-center py-5 ">
                            <img src={require('../../imgs/icon.png')}  className=" w-mine pt-3  res-show" alt="Home" />
                            <img src={require('../../imgs/logoWhite.png')} className="w-75 pt-3 res-hide" alt="Home" />
                        </div>
                      </Link>

                      <Link to="" id="home" class="nav-link nav-item w-100 p-0 rounded-0" onClick={()=>clicked('home')}>
                        <div className= "w-100 d-flex justify-content-start hoover p-res-3 flex-res fs-5 ">
                            <div to="upcoming" className=" text-white  ">
                            <i class="fa-solid fa-house-chimney text-white me-3"></i>
                              <span className=" text-white res-hide res-med-text ">Home</span>  </div>
                        </div>
                      </Link>



                      <Link to="upcoming" id="upcoming" class="nav-link nav-item w-100 p-0 rounded-0" onClick={()=>clicked('upcoming')}>
                        <div className= "w-100 d-flex justify-content-start hoover p-res-3 flex-res fs-5 ">
                            <div to="upcoming" className=" align-middle text-white  ">
                            <i class="fa-solid fa-diagram-next text-white me-3"></i>
                              <span className=" text-white res-hide res-med-text">Pending</span>  </div>
                        </div>
                      </Link>

                      <Link to="delayed" id="delayed" class="nav-link nav-item w-100 p-0 rounded-0" onClick={()=>clicked('delayed')}> 
                        <div className= "w-100 d-flex justify-content-start hoover p-res-3 flex-res fs-5 ">
                            <div to="upcoming" className=" align-middle text-white  ">
                            <i class="fa-solid fa-triangle-exclamation text-white me-3"></i>
                            <span className=" text-white res-hide res-med-text">Delayed</span>  </div>
                        </div>
                      </Link>

                      <Link to="finished" id="finished" class="nav-link nav-item w-100 p-0 rounded-0" onClick={()=>clicked('finished')}>
                        <div className= "w-100 d-flex justify-content-start hoover p-res-3 flex-res fs-5  ">
                            <div to="upcoming" className=" text-white  ">
                            <i class="fa-solid fa-check-double text-white me-3 "></i>
                            <span className=" text-white res-hide res-med-text">Finished</span>  </div>
                        </div>
                      </Link>

                  </ul>

                    <Link to="register" onClick={logOut} class="nav-link nav-item  w-100">
                      <div className= "d-flex justify-content-start hoover p-res-3 flex-res fs-5 ">
                        <div  className=" align-middle text-white small ">
                          <i class="fa-solid fa-arrow-right-from-bracket me-3 text-white"></i>
                          <span className=" text-white res-hide res-med-text">Log Out</span>
                          </div>
                      </div>
                    </Link>

                </div>
              </div>
            </div>
          </div>
      </div>
      :
      ""

    }
      
    </>
  );
}
