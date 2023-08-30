import React, { useState } from 'react'
import joi from 'joi';
import  axios  from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
export default function Login(props) {


let navigate = useNavigate();

const [user, setUser] = useState({
    email: "",
    password: "",
});

const [loading, setLoading] = useState(false)
const [ValidateErrors, setValidateErrors] = useState([])
const [NotExist, setNotExist] = useState(0);
const [NotConfirmed, setNotConfirmed] = useState(0);



function getUser(e){
    const Cuser = {...user}
    Cuser[e.target.name] = e.target.value 
    setUser(Cuser)
}

function validation()
{
  let scheme = joi.object({
    email : joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/)).required(),
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
      let result = await axios.post("https://todo-list-be-tau.vercel.app/api/v1/auth/signIn", user)
      .catch(function (error) {
         if(error?.response?.status == 403){
            setNotConfirmed(1)
            setLoading(false); 
          }
          else{
            setNotExist(1);
          }
        });
    

      if (result?.status == 200) {
        localStorage.setItem( 'userToken', result.data.token)
        props.rerender()
        setLoading(false);
        navigate('/')
      }else{
        setLoading(false);
      }
  }
   
    
}



  return (
    <div className='p-res-5P d-flex justify-content-center align-items-center '>
      <div className='row w-100 d-flex align-items-center  '>

      <div className='d-flex align-items-center justify-content-center res-show my-5  p-0   '>
              <img src={require('../../imgs/logo.png')} className='w-75 res-show' alt="" />
          </div>

          <div className='col-md-6 d-flex justify-content-center'>
              <form className='form-control p-3 rounded w-75-2h' onSubmit={submitForm}>
                  <div class="form-row mb-3 " >

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

                  </div>

                  {/* Errors */}
                  <div>
                      {
                        NotExist?
                        <div class=" rounded p-1 text-center bg-Red text-muted " role="alert">
                           Invalid Email or Password
                        </div>  
                      :
                      NotConfirmed?
                      <div class=" rounded p-1 text-center bg-Red text-muted " role="alert">
                        Please confirm your email first.
                      </div>
                      :""
                      
                      }   
                      <button  type="submit" class="w-100 btn btn-primary btnGreen my-2 text-white">
                        
                        {
                          loading?
                          <i class="fa-solid fa-fan fa-spin text-white"></i>
                          :
                          <span className='text-white'>Sign In</span>
                        }

                        
                        
                        </button>
                  </div>
                 
                  <div className='d-flex justify-content-center'><span>Don't have account? <Link to="/register"> Register new account </Link></span></div>
              
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
