import React, { useState } from 'react'
import joi from 'joi';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Login() {

let navigate = useNavigate();

const [user, setUser] = useState({

    fName: "",
    lName: "",
    email: "",
    password: "",
    cPassword:"",
    age: 0,
    gender: "male"

});

const [loading, setLoading] = useState(false)
const [ValidateErrors, setValidateErrors] = useState([])
const [Eexist, setEexist] = useState(0);

function getUser(e){
    const Cuser = {...user}
    Cuser[e.target.name] = e.target.value 
    setUser(Cuser)
}

function validation()
{
  let scheme = joi.object({
    fName: joi.string().pattern(new RegExp (/^[A-Za-z]{2,}$/)).required(),
    lName: joi.string().pattern(new RegExp (/^[A-Za-z]{2,}$/)).required(),
    email : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
    cPassword: joi.string().valid(joi.ref('password')).required(),
    age: joi.number().integer().min(16).max(60),
    gender : joi.string().pattern(new RegExp ('^(male|female)$'))
  })
  return scheme.validate(user , {abortEarly:false})
}


async function submitForm(e)
{
    setValidateErrors([])
    setLoading(true);
    e.preventDefault();
    let validateResponse = validation();
    if(validateResponse.error)
    {
      setLoading(false);
      setValidateErrors(validateResponse.error.details);
    }
    else
    {
      let result = await axios.post("https://todo-list-be-tau.vercel.app/api/v1/auth/signUp", user)
      .catch(function (error) {
          if (error.response) {
            setEexist(1)
            setLoading(false);
          }
        });
    

      if (result?.status == 201) {
        setLoading(false);
        navigate('/login')
      }else{
        setLoading(false);
      }
  }
   
    
}



  return (
    <div className='p-res-5P d-flex justify-content-center align-items-center my-3'>
      <div className='row w-100 align-items-center '>
          <div className='d-flex align-items-center justify-content-center res-show mb-5 mt-3  p-0  '>
              <img src={require('../../imgs/logo.png')} className='w-75 res-show' alt="" />
          </div>

          <div className='col-md-6 d-flex justify-content-center'>
              <form className='form-control p-3 rounded w-75-2h  ' onSubmit={submitForm}>

                  <div class="form-row mb-3 " >

                      <div class=" form-group  mb-3 form-floating w-100">
                          <input onChange={getUser} type="text" class="form-control" name='fName' id="fName" placeholder="First Name"/>
                          <label for="fName">First Name</label>
                            {ValidateErrors.map((e, index) => {
                              if (e.context.key === "fName") {
                                return <span className='small text-colRed ms-2'> Invalid First Name <i class="fa-solid fa-exclamation  text-colRed"></i></span>;
                              }

                              return "";
                            })}
                          
                      </div>

                      <div class=" form-group  mb-3 form-floating w-100">
                          <input onChange={getUser} type="text" class="form-control" name='lName' id="lName" placeholder="Last Name"/>
                          <label for="lName">Last Name</label>
                          {ValidateErrors.map((e, index) => {
                              if (e.context.key === "lName") {
                                return <span className='small text-colRed ms-2'> Invalid Last Name <i class="fa-solid fa-exclamation  text-colRed"></i></span>;
                              }

                              return "";
                            })}
                      </div>

                      <div class="form-group mb-3 form-floating">
                          <input onChange={getUser} type="email" name='email' class="form-control" id="email" placeholder="Email"/>
                          <label for="email">Email</label>
                          {ValidateErrors.map((e, index) => {
                              if (e.context.key === "email") {
                                return <span className='small text-colRed ms-2'> Invalid Email <i class="fa-solid fa-exclamation  text-colRed"></i></span>;
                              }

                              return "";
                            })}
                      </div>

                      <div class="form-group mb-3  form-floating">
                          <input onChange={getUser} type="password" class="form-control" name='password' id="password" placeholder="Password"/>
                          <label for="password">Password</label>
                             {ValidateErrors.map((e, index) => {
                              if (e.context.key === "password") {
                                return <span className='small text-colRed ms-2'> Password: 1 digit, 1 lowercase, 1 uppercase, 8+ characters. <i class="fa-solid fa-exclamation  text-colRed"></i></span>;
                              }

                              return "";
                            })}
                      </div>

                      <div class="form-group mb-3   form-floating">
                          <input onChange={getUser} type="password" class="form-control" id="cPassword" name='cPassword' placeholder="Confirm password"/>
                          <label for="cPassword">Confirm Password</label>
                          {ValidateErrors.map((e, index) => {
                              if (e.context.key === "cPassword") {
                                return <span className='small text-colRed ms-2'> Password mismatch <i class="fa-solid fa-exclamation  text-colRed"></i></span>;
                              }

                              return "";
                            })}
                      </div>

                      <div class="form-group  form-floating">
                          <input onChange={getUser} type="number" class="form-control" name='age' id="age" placeholder="age"/>
                          <label for="age">Age</label>
                            {ValidateErrors.map((e, index) => {
                              if (e.context.key === "age") {
                                return <span className='small text-colRed ms-2'> Registration open to individuals aged 16-60. <i class="fa-solid fa-exclamation  text-colRed"></i></span>;
                              }

                              return "";
                            })}
                      </div>

                  </div>

                  <div>
                      {
                        Eexist?
                        <div class=" rounded p-1 text-center bg-Red text-muted " role="alert">
                       Email already registered. Please log in or use a different email.
                      </div>  
                      :""
                      }   
                      <button type="submit" class="w-100 btn btn-primary btnBlue my-2 text-white">
                        
                        {
                          loading?
                          <i class="fa-solid fa-fan fa-spin text-white"></i>
                          :
                          <span className='text-white'>Sign Up</span>
                        }

                        
                        
                        </button>
                  </div>
                 
                  <div className='d-flex justify-content-center'><span>already have account? <Link to="/login"> Sign in </Link></span></div>
              
              </form>
          </div>


          <div className='col-md-6 align-items-center res-hide '>
             <div className=' d-flex justify-content-center'><img src={require('../../imgs/logo.png')} className='res-w-50-2h' alt="" /></div>
              <img src={require('../../imgs/Sign.jpg')} className='w-100' alt="" />
          </div>
      </div>


    </div>
  )
}
