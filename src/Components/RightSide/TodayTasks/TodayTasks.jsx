import React, { useEffect, useState } from "react";
import "./TodayTasks.css"      
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-datepicker/dist/react-datepicker.css';
import jquery from "jquery";
import  axios  from 'axios';
import { CircularProgressbar } from 'react-circular-progressbar';
import Clock from 'react-live-clock';
import 'react-circular-progressbar/dist/styles.css';
import ProgressBar from "@ramonak/react-progress-bar";
window.$ = window.jQuery = jquery;

const timeAndTasksQuotes = [
  { quote: "Time is money.", quoter: "Benjamin Franklin" },
  { quote: "Lost time is never found again.", quoter: "Benjamin Franklin" },
  { quote: "Time is a great teacher.", quoter: "Carl Sandburg" },
  { quote: "Time is the wisest counselor.", quoter: "Pericles" },
  { quote: "Time is the most valuable thing a man can spend.", quoter: "Theophrastus" },
  { quote: "Time flies over us, but leaves its shadow behind.", quoter: "Nathaniel Hawthorne" },
  { quote: "Time is the longest distance between two places.", quoter: "Tennessee Williams" },
  { quote: "They always say time changes things, but you actually have to change them yourself.", quoter: "Andy Warhol" },
  { quote: "The two most powerful warriors are patience and time.", quoter: "Leo Tolstoy" },
  { quote: "Time is what we want most, but what we use worst.", quoter: "William Penn" },
  { quote: "Time is a created thing. To say 'I don't have time' is like saying, 'I don't want to.'", quoter: "Lao Tzu" },
  { quote: "Time is a dressmaker specializing in alterations.", quoter: "Faith Baldwin" },
  { quote: "Time is a created thing. To say 'I don't have time' is like saying, 'I don't want to.'", quoter: "Lao Tzu" },
  { quote: "Time is a created thing. To say 'I don't have time' is like saying, 'I don't want to.'", quoter: "Lao Tzu" },
  { quote: "Time is a created thing. To say 'I don't have time' is like saying, 'I don't want to.'", quoter: "Lao Tzu" },
  { quote: "Time is a created thing. To say 'I don't have time' is like saying, 'I don't want to.'", quoter: "Lao Tzu" },
  { quote: "Time is a created thing. To say 'I don't have time' is like saying, 'I don't want to.'", quoter: "Lao Tzu" },
  { quote: "Time is a created thing. To say 'I don't have time' is like saying, 'I don't want to.'", quoter: "Lao Tzu" },
  { quote: "Time is a created thing. To say 'I don't have time' is like saying, 'I don't want to.'", quoter: "Lao Tzu" },
  { quote: "Time is a created thing. To say 'I don't have time' is like saying, 'I don't want to.'", quoter: "Lao Tzu" },
];
let x = Math.floor(Math.random() * timeAndTasksQuotes.length)

export default function TodayTasks() {

  const [percentage, setPercentage] = useState(0);
  const [loading, setloading] = useState(true);

  const userToken = localStorage.getItem('userToken')
  const headerToken = "ZXCV___"+userToken

  const [Ttasks, setTtasks] = useState([]);

  const [date, setdate] = useState(new Date());

  const [task, setTask] = useState({
    title: "",
    date: date.toLocaleString().split(',')[0],
    note: "",
  });

  function taskCtrl(e){
      let newTask = {...task}
      newTask[e.target.name] = e.target.value
      setTask(newTask)
  }

  const [emptyTitle, setemptyTitle] = useState(0)

  async function submit(e) {

    e.preventDefault();
    if(task.title =="")
      {
        setemptyTitle(1)
        return;
      }

      if(task.note==""){
        task.note = "No note"
      }
    let result = await axios.post('https://todo-list-be-tau.vercel.app/api/v1/user/tasks/addTask', task ,{headers:{
      token:headerToken
    }})
    .catch(function(error){
      if(error?.response){
      }
    })
    
    if(result?.status === 201 ){
      getTodayTasks()
      setTask({
        title: "",
        date: date.toLocaleString().split(',')[0],
        note: "",
      })
      document.getElementById("floatingInput").value = "";
      document.getElementById("floatingInput2").value = "";
      setdate(new Date())
  
      jquery("#fade").removeClass("d-none");
      await delay(1500);
      jquery("#fade").addClass("d-none");

    }

  }

 async function getTodayTasks(){
    setloading(true)
      let response = await axios.get('https://todo-list-be-tau.vercel.app/api/v1/user/tasks/today' , {headers:{
        token:headerToken
      }})
    
    let data = response?.data  
    setTtasks(data)
    if(data?.today?.length){setPercentage(Math.ceil((data.finished.length/data.today.length)*100))}
    setloading(false) 
      
  }
  
  async function deleteTask(taskId){
    await axios.delete("https://todo-list-be-tau.vercel.app/api/v1/user/tasks/delete", { data: { taskId }, headers: { "token": headerToken } }).

    catch(function(error){
    if(error.response){
      }
    })
      getTodayTasks()
  }

  const [user, setuser] = useState("");

  async function getUser(){
    let {data} =await axios.get("https://todo-list-be-tau.vercel.app/api/v1/user/profile", {headers:{
      token:headerToken
    }}).
    catch(function(error){
    if(error.response){
      }
    })
      setuser(data?.user?.fName)
  }



  async function setFinished(taskId)  {
    await axios.patch('https://todo-list-be-tau.vercel.app/api/v1/user/tasks/setFinished' , {taskId} , {headers:{
    token:headerToken
  }})
  .catch(function(error){
    if(error.response){
    }
  }) 
     getTodayTasks()
  }

  useEffect(() => {
   getTodayTasks();
   getUser();
  }, []);

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));


  function toggleCaret(i){
    var drop = document.getElementById(`drop${i}`)
    if(drop.classList.contains('fa-caret-down')){
      drop.classList.remove('fa-caret-down')
      drop.classList.add('fa-caret-right')
    }else{
      drop.classList.remove('fa-caret-right')
      drop.classList.add('fa-caret-down')
    }
  }
 
  
  return (
    <>
      
    <div className="col-10 p-0">
    <div className="container-fluid ">
      
      <div className=" p-res-5 my-3 mb-0  d-felx justify-content-center align-items-center ">
        <div className="row">
          <div className="col-md-8">
              <div className="mb-3">
              <div className="p-res-3-rm fa-2x res-med-text res-md-smallS">HELLO, {user.toUpperCase()}</div>

                <div className="p-res-3-rm fa-2x res-md-smallS">
                  <Clock 
                  className="clock-text"
                  format={'h:mm A'} 
                  ticking={true} 
                  timezone={'Egypt'} 
                  
                  />
                </div>
                
              </div>
              <form class="form-control p-res-3-rm mb-5 rounded border-0" onSubmit={submit}>
              <div class="form-floating mb-3">
                <input
                  name="title"
                  onChange={taskCtrl}
                  type="text"
                  class="form-control"
                  id="floatingInput"
                />
                  {
                    emptyTitle?
                    <span className='small text-colRed ms-2'> <i class="fa-solid fa-exclamation text-Red"></i> Task title can't be empty</span>
                    :
                    ""
                  }
                <label for="floatingInput">Task Title</label>
              </div>
              <div class="form-floating mb-3">
                <input
                name="note"
                onChange={taskCtrl}
                  type="text"
                  class="form-control"
                  id="floatingInput2"
                />
                <label for="floatingInput2">Notes</label>
              </div>
              <div className="mb-3 d-flex justify-content-between align-items-center ">
                  <div className="mx-0  w-100">
                  <h6 className="fa-xs">DUE TO: </h6>
                  <div className="">
                    <DatePicker
                      wrapperClassName="w-100-small"
                      display
                      id="date"
                      className="form-control text-center rounded btnGrey "
                      selected={date}
                      dateFormat="MMMM d, yyyy"
                      onChange={(date) => { 
                        setdate(date)
                        task.date = date.toLocaleString().split(',')[0]}}
                    />
                  </div>
            
                  </div>
                  <div className="d-flex mt-2 justify-content-end ">
                    <div class="d-none d-flex align-items-center mx-2  bg-Green rounded border-0 p-1 mb-0 px-3 me-auto  "role="alert"id="fade">
                    <i class="fa-solid fa-check me-2 text-white"></i><div className="text-white res-hide">Task created</div>
                    </div>
                </div>
              </div>
                <button className="btn btnRed text-white w-100 " id="submit">
                  <i class="fa-solid fa-plus text-white fa-shake me-2"></i> Add Task
                </button>
            </form>
          </div>
          <div className="box-image text-muted col-md-4 d-flex align-items-center ">
            <img src={require('../../../imgs/note.jpg')} alt="Time quote"  className=' res-w-100 res-hide-small' />
            <div class="centered ms-1 res-small-text res-extra-p res-hide-small ">{timeAndTasksQuotes[x].quote}<br />{timeAndTasksQuotes[x].quoter}</div>
          </div>
        </div>
      </div>
                   
      <div className="p-res-3-rm  my-3 mt-0 d-felx justify-content-center align-items-center">
        
        <div className="Container  ">

          <div className="row ">


            <div className="col-md-8 mb-3">

                <div className="w-100 bg-Grey rounded-top d-flex justify-content-center align-items-center text-white">
                    <div className="p-2"><i class="fa-solid fa-cloud-sun clickable text-white fa-2x"></i></div>
                </div>

                <div className=" border border-2 border-top-0  p-res-3-rm rounded-bottom">
                  {
                    loading?
                    <div className="d-flex justify-content-center align-items-center m-5 p-5"><i class="fa-solid text-Grey fa-fan fa-spin  fa-2x"></i></div>
                    :
                    <>

                      <div className="d-flex justify-content-center">
                        {
                          !Ttasks?.upcoming?.length?
                          <img src={require('../../../imgs/no Tasks.jpg')} className="w-50" alt="" title="No upcoming tasks for today"/>:""

                        }
                        </div>
                        
                        <ul class="list-group list-group-flush ">
                          {
                            Ttasks?.upcoming?.map((t,i)=> 

                            {
                              if(t.finished === false)
                                  return  <li class="list-group-item list-hover rounded-0 fadeIn " id={`${t._id}`}>
                                  <div className="d-flex justify-content-between align-items-center ">
                                    <div><span className="lead">{t.title}</span></div>
                                    <div className="row align-items-center">
                                      <div className="col-md-6 d-flex justify-content-end"><i  onClick={()=>{setFinished(t._id)}} class="fa-solid fa-check-double clickable text-Green fa-2x my-3"></i></div>
                                      <div className="col-md-6 d-flex justify-content-end"><i  onClick={()=>deleteTask(t._id)} class="fa-regular fa-calendar-xmark clickable text-Red fa-2x"></i></div>
                                    </div>
                                  </div>
                                <div >
                                    <p class="d-inline-flex gap-1" onClick={()=>toggleCaret(i)}>
                                    <a class="rm-decoration text-Blue" type="button" data-bs-toggle="collapse" data-bs-target={`#collapseExample+${i}`} aria-expanded="false" aria-controls="collapseExample">
                                    <i  class="fa-solid fa-caret-down me-1 text-Blue" id={`drop${i}`} > </i> Details
                                    </a>
                                  </p>
                                  <div class="collapse " id={`collapseExample+${i}`}>
                                    <div class="card card-body ">
                                      <div className="row">
                                        <div className="col-md-8 text-muted mb-2">
                                          {
                                            t?.note
                                          
                                          }
                                        </div>

                                        <div className="col-md-4 res-s-test text-muted">
                                        {t.date.split('T')[0]} <i class="fa-solid fa-calendar-day ms-1" ></i>
                                        </div>

                                      </div>
                                    </div>
                                  </div>
                                </div>
                                </li>
                            }
                          )
                          }
                        
                      </ul>

                    </>
                  }   
                </div>
            </div>





            <div className="col-md-4  ">
                  <div className="w-100 bg-Green rounded-top d-flex justify-content-center align-items-center text-white">
                        <div className="p-2"><i title="Finished tasks" class="fa-solid fa-check-double clickable text-white fa-2x  "></i></div>
                  </div>

                  <div className="border border-2 border-top-0  p-res-3-rm rounded-bottom">
                  {
                    loading?
                    <div className="d-flex justify-content-center align-items-center m-5 p-5"><i class="fa-solid text-Grey fa-fan fa-spin  fa-2x"></i></div>
                    :
                    <>
                      <div className="d-flex justify-content-center ">
                        {
                          !Ttasks?.finished?.length?
                          <img src={require('../../../imgs/wind.png')} className="w-35" alt="No finished tasks today" />:""

                        }
                      </div>
                        
                      <div className="p-2 mb-2 d-felx justify-content-center align-items-center">
                        

                        <div className="">
                        {
                          Ttasks?.finished?.length>0? 

                          percentage===100?
                          <div className="d-flex justify-content-center">
                            <div className="w-50">
                              <div className="lead res-s-test">Work's all done!</div>
                          <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 123 94.09">
                               <defs>
                             
                               <mask id="squiggle-mask" maskunits="userSpaceOnUse"
                                           maskcontentunits="userSpaceOnUse">
                                 <path id="squiggle-mask-path" class="cls-5 mask" d="M56.26,90.4c-.7-3,10.21-7,10.4-11.46.63-3.89-11.14-7.69-9.57-11.62C59.22,62,67.43,60.8,66.86,55.4s-10-6.59-9.48-10.63c.3-2.59,5.8-5.38,9-8.33a5.79,5.79,0,0,0,1.91-3.54" transform="translate(-2.7 -2.61)"/>
                                 </mask>
                                 
                                 <mask id="left-line-mask" maskunits="userSpaceOnUse" maskcontentunits="userSpaceOnUse">
                                   <path id="left-line-mask-path" class="cls-6 mask" d="M25.78,62.5s18.38,14.73,15.9,30.91" transform="translate(-2.7 -2.61)"/>
                                 </mask>
                                 
                                 <mask id="right-line-mask" maskunits="userSpaceOnUse" maskcontentunits="userSpaceOnUse">
                                   <path id="right-line-mask-path" class="cls-6 mask" d="M95.12,64.5S78.32,73.83,76.8,94.2" transform="translate(-2.7 -2.61)"/>
                                 </mask>
                               </defs>
                               <path id="blue-star" class="cls-1" d="M33.3,51.8a2,2,0,0,0,2-.7l3-3.9,4.9.3a2.38,2.38,0,0,0,1.2-.3,1.34,1.34,0,0,0,.6-.7,2,2,0,0,0-.1-2.1l-2.8-4,1.8-4.6a2,2,0,0,0-.4-2.1,1.92,1.92,0,0,0-2-.6l-4.7,1.4L33,31.3a2,2,0,0,0-2.1-.3,2.15,2.15,0,0,0-1.2,1.8l-.1,4.9-4.1,2.7h0a2,2,0,0,0-.9,1.9A2.1,2.1,0,0,0,25.9,44l4.6,1.6,1.3,4.7A2.07,2.07,0,0,0,33.3,51.8Z" transform="translate(-2.7 -2.61)"/>
                               <path id="yellow-star" class="cls-2" d="M91,32.9l-1.7-4.6A2.1,2.1,0,0,0,87.6,27a2,2,0,0,0-1.9.9L83.2,32l-4.9.2h0a2,2,0,0,0-1.7,1.2,2,2,0,0,0,.3,2.1L80,39.3,78.7,44a1.92,1.92,0,0,0,.6,2,2,2,0,0,0,2.1.4L86,44.6l4.1,2.7a1.8,1.8,0,0,0,1.2.3,1.61,1.61,0,0,0,.9-.3,1.89,1.89,0,0,0,1-1.9l-.3-4.9,3.9-3a1.91,1.91,0,0,0,.7-2A2.07,2.07,0,0,0,96,34Z" transform="translate(-2.7 -2.61)"/>
                               <path id="yellow-burst" class="cls-2" d="M16.1,83.8a2,2,0,0,0,2.5-1.4l.7-2.4,1.8,1.8A2,2,0,1,0,24,79.1l-1.8-1.8,2.5-.6a2,2,0,1,0-.9-3.9l-2.5.6L22,71a2,2,0,1,0-3.9-1.1l-.7,2.4-1.8-1.8a2,2,0,0,0-2.9,2.7L14.5,75l-2.5.6a2,2,0,0,0,.9,3.9l2.5-.6-.7,2.4A2,2,0,0,0,16.1,83.8Z" transform="translate(-2.7 -2.61)"/>
                               <path id="red-burst" class="cls-3" d="M108.8,67.4a2,2,0,0,0-2.5,1.4l-.7,2.4-1.8-1.8a2,2,0,1,0-2.9,2.7l1.8,1.8-2.5.6a2,2,0,0,0,.9,3.9l2.5-.6-.7,2.4a2,2,0,0,0,3.9,1.1l.7-2.4,1.8,1.8a2,2,0,1,0,2.9-2.7l-1.8-1.8,2.5-.6a2,2,0,1,0-.9-3.9l-2.5.6.7-2.4A2.17,2.17,0,0,0,108.8,67.4Z" transform="translate(-2.7 -2.61)"/>
                               <path id="mint-burst" class="cls-4" d="M69.5,7,67,7.6l.7-2.4a2,2,0,0,0-1.4-2.5A1.84,1.84,0,0,0,63.9,4l-.7,2.4L61.4,4.6a2,2,0,0,0-2.8-.1,2,2,0,0,0-.1,2.8l1.8,1.8-2.5.6a2,2,0,0,0-1.5,2.4,2,2,0,0,0,2.4,1.5l2.5-.6-.7,2.4a2,2,0,0,0,3.9,1.1l.7-2.4,1.8,1.8a2,2,0,1,0,2.9-2.7L68,11.5l2.5-.6A2,2,0,0,0,72,8.5,2.06,2.06,0,0,0,69.5,7Z" transform="translate(-2.7 -2.61)"/>  
                               <g id="squiggle" mask="url(#squiggle-mask)">
                                 <path class="cls-1" d="M56.3,92.3a2.09,2.09,0,0,0,2.1-2c0-1.6,1.6-2.5,4.1-3.8a18.17,18.17,0,0,0,4.1-2.7,6.44,6.44,0,0,0,2.1-4.6c.1-4-3.2-6-5.8-7.6-2.4-1.5-3.9-2.4-3.9-4s1.6-2.5,4.1-3.8c2.7-1.5,6.1-3.3,6.2-7.3s-3.2-6-5.8-7.6c-2.4-1.5-3.9-2.4-3.9-4s1.6-2.5,4.1-3.8c2.7-1.5,6.1-3.3,6.2-7.3a2.05,2.05,0,0,0-4.1-.1c0,1.6-1.6,2.5-4.1,3.8-2.7,1.5-6.1,3.3-6.2,7.3s3.2,6,5.8,7.6c2.4,1.5,3.9,2.4,3.9,4s-1.6,2.5-4.1,3.8c-2.7,1.5-6.1,3.3-6.2,7.3s3.2,6,5.8,7.6c2.4,1.5,3.9,2.4,3.9,4s-1.6,2.5-4.1,3.8c-2.7,1.5-6.1,3.3-6.2,7.3A2,2,0,0,0,56.3,92.3Z" transform="translate(-2.7 -2.61)"/>
                               </g>
                               <g id="right-line" mask="url(#right-line-mask)">
                                 <path class="cls-1" d="M94.7,64.5a2,2,0,0,0-2.8-.4c-15.9,11.6-17,27.4-17,28a2,2,0,0,0,1.9,2.1,2.46,2.46,0,0,0,1.5-.5,1.61,1.61,0,0,0,.6-1.3c0-.1,1-14.6,15.4-25A2.07,2.07,0,0,0,94.7,64.5Z" transform="translate(-2.7 -2.61)"/>
                               </g>
                               <g id="left-line" mask="url(#left-line-mask)">
                                 <path class="cls-1" d="M35.8,73.3l.2-.2a2,2,0,0,0,.2-2.6A43.54,43.54,0,0,0,29.4,63a1.94,1.94,0,0,0-2.8.2,2,2,0,0,0,.2,2.8A44.29,44.29,0,0,1,33,72.8,2,2,0,0,0,35.8,73.3Z" transform="translate(-2.7 -2.61)"/>
                                 <path class="cls-4" d="M41.8,94.4a2.05,2.05,0,0,0,2-2,35.88,35.88,0,0,0-3.3-14.5,2,2,0,0,0-3.6,1.6,32.83,32.83,0,0,1,3,12.7A1.93,1.93,0,0,0,41.8,94.4Z" transform="translate(-2.7 -2.61)"/>
                               </g>
                               
                               <circle id="blue-dot-3" class="cls-1 dot left-side" cx="2" cy="89.29" r="2"/>
                               <circle id="red-dot-4" class="cls-3 dot left-side" cx="24.6" cy="89.79" r="2"/>
                               <circle id="blue-dot-4" class="cls-1 dot" cx="121" cy="86.49" r="2"/>
                               <circle id="blue-dot-5" class="cls-1 dot left-side" cx="42.3" cy="61.89" r="2"/>
                               <circle id="yellow-dot" class="cls-2 dot left-side" cx="31.1" cy="55.99" r="2"/>
                               <circle id="red-dot-1" class="cls-3 dot" cx="63" cy="25.59" r="2"/>
                               <circle id="mint-dot-1" class="cls-4 dot left-side" cx="43.2" cy="22.29" r="2"/>
                               <circle id="mint-dot-2" class="cls-4 dot" cx="96.3" cy="54.69" r="2"/>
                               <circle id="blue-dot-1" class="cls-1 dot" cx="84.3" cy="82.79" r="2"/>
                               <circle id="red-dot-2" class="cls-3 dot left-side" cx="17" cy="52.79" r="2"/>
                               <circle id="red-dot-3" class="cls-3 dot" cx="70.3" cy="73.89" r="2"/>
                               <circle id="blue-dot-2" class="cls-1 dot" cx="79.3" cy="54.29" r="2"/>
                               
                           </svg>
                         </div>
                          </div>
                         :
                          <>
                            <ProgressBar 
                              maxCompleted={100}
                              className="w-100"
                              bgColor="#258d8c"
                              labelAlignment="outside"
                              labelColor= "#258d8c"
                              baseBgColor="#d5d5d5"
                            completed={percentage}
                            />

                            <div className="bar mx-auto rounded mt-2 "></div>
                          </>
                  
                  
                  :""
                  }
                  </div>
                  
                </div>
                  <ul class="list-group list-group-flush ">
                    {
                      Ttasks?.finished?.map((t,i)=> 

                      {
                        if(t.finished === true)
                            return  <li class="list-group-item list-hover rounded-0 fadeIn " id={`${t._id}`}>
                            <div className="d-flex justify-content-between align-items-center ">
                              <div><span className="lead"><del>{t.title}</del></span></div>
                              <div className="d-flex justify-content-center align-items-center ">
                              <div><i  onClick={()=>deleteTask(t._id)} class="fa-solid fa-xmark clickable text-Red fa-2x"></i></div>
                              </div>
                            </div>
                          </li>
                      }
                    )
                    }
                  
                </ul>

                    </>
                  }

                



                </div>

            </div>

          </div>

        </div>
          
      </div>

    </div>


    </div>

    </>
  )
}
