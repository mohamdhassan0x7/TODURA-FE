import React, { useEffect, useState } from "react";    
import jquery from "jquery";
import  axios  from 'axios';
import {  CircularProgressbar,CircularProgressbarWithChildren,buildStyles } from 'react-circular-progressbar';
window.$ = window.jQuery = jquery;


export default function DelayedTasks() {

  const userToken = localStorage.getItem('userToken')
  const headerToken = "ZXCV___"+userToken

  const [Ttasks, setTtasks] = useState([]);
  const [loading, setloading] = useState(true);

  const [percentage, setpercentage] = useState(0);
  const [mostWorkingDay, setmostWorkingDay] = useState("N/A");
  const [MostCount, setMostCount] = useState(0);




  function compare( a, b ) {
    if ( a.date > b.date ){
      return -1;
    }
    if ( a.date < b.date ){
      return 1;
    }
    return 0;
  }

 async function getDelayedTasks(){
    setloading(true)
      let {data} = await axios.get('https://todo-list-be-tau.vercel.app/api/v1/user/tasks/delayed' , {headers:{
        token:headerToken
      }})

     data.delayed = data?.delayed?.filter((t)=>t.finished == false) 
     data.delayed = data?.delayed?.sort(compare)
     if(data.delayed.length) setpercentage(Math.ceil((data.delayed.length/data.AlltasksNum)*100))
     else  setpercentage(0)
     const sorted = structuredClone(data.delayed)
     let workCount = 1 
     let lastWorkCount = 1
     setmostWorkingDay(sorted[0]?.date?.toString())
     for (let i = 1; i <= sorted?.length; i++) {
        if(i<sorted.length && sorted[i].date == sorted[i-1].date){
            workCount++;
        }else{
            if(workCount > lastWorkCount){
                setmostWorkingDay(sorted[i-1].date.toString())
                lastWorkCount = workCount
                workCount=1
            }
        } 
     }

     if(sorted?.length) setMostCount(lastWorkCount)
     else setMostCount(0)

     setTtasks(data) 
     setloading(false) 
  }
  
  async function deleteTask(taskId){
    setloading(true)
    const x = await axios.delete("https://todo-list-be-tau.vercel.app/api/v1/user/tasks/delete", { data: { taskId }, headers: { "token": headerToken } }).
    catch(function(error){
    if(error.response){
      }
    })
      getDelayedTasks()
  }

  async function setFinished(taskId)  {
    setloading(true)
    await axios.patch('https://todo-list-be-tau.vercel.app/api/v1/user/tasks/setFinished' , {taskId} , {headers:{
    token:headerToken
  }})
  .catch(function(error){
    if(error.response){
    }
  }) 
     getDelayedTasks()
  }

  useEffect(() => {
   getDelayedTasks();
  }, []);

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
      
    <div className="col-10">
    <div className="container">    
                <div className="row pt-5  p-res-5 ">
                    <div className="col-md-6  mb-2 ">
                        <div className="lead mb-5 text-muted ">
                        Total Delayed Tasks: 
                        {
                            loading?
                            <i class="ms-2 fa-solid fa-ellipsis fa-beat text-muted"></i>
                            :
                          <>
                                <span className="ms-2 lead text-muted">{Ttasks?.delayed?.length}</span><br />
                                <span className="fa-xs text-Grey"> Total Number of Tasks <b className="ms-1 text-Grey-bold">{Ttasks?.AlltasksNum}</b></span>
                          </>
                        }
                        </div>

                        <div className="lead text-muted ">
                        Most Delayed Day: 
                        {
                            loading?
                            <i class="ms-2 fa-solid fa-ellipsis fa-beat text-muted"></i>
                            :
                            <>
                                <span className="ms-2 lead text-muted">{mostWorkingDay?.split('T')[0]}</span><br />
                                <span className="fa-xs text-Grey">Task Overdued That Day <b className="ms-1 text-Grey-bold">{MostCount}</b></span>
                            </>
                        }
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center ">
                        <CircularProgressbar 
                        value={percentage} 
                        text={`${percentage}%`}
                        className="res-w-50 "
                        styles={buildStyles({
                            textColor: "#f59e4f",
                            pathColor: "#f59e4f",
                            trailColor: "#d5d5d5"
                        })}
                        />
                    </div>
                </div>
      </div>  



      <div className="p-res-3-rm  my-3 d-felx justify-content-center align-items-center">
        <div className="Container  ">
                <div className="w-100 bg-Yellow rounded-top d-flex justify-content-center align-items-center text-white">
                    <div className="p-2"><i class="fa-solid fa-triangle-exclamation text-white me-3 clickable text-white fa-2x"></i></div>
                </div>
                <div className=" border border-2 border-top-0 p-res-3-rm rounded-bottom ">
               {
                loading?
                <div className="d-flex justify-content-center align-items-center m-5 p-5"><i class="fa-solid text-Grey fa-fan fa-spin  fa-2x"></i></div>
                :     
                 <>
                 <div className="d-flex justify-content-center">
                    {
                        !Ttasks?.delayed?.length?
                        <img src={require('../../../imgs/no Tasks.jpg')} className="w-50" alt="" title="No delayed tasks"/>:""

                    }
                    </div>
                    
                    <ul class="list-group list-group-flush ">
                        {
                        Ttasks?.delayed?.map((t,i)=> 
                        

                        {
                            if(t.finished === false)
                            return<li class="list-group-item list-hover rounded-0 fadeIn " id={`${t._id}`}>
                              {
                                    i===0?
                                    <div className="d-flex justify-content-center align-items-center">
                                      <div className="bar-time rounded mb-2 me-2"></div>
                                      <div className="d-flex"><i class="fa-solid fa-calendar-day me-1" ></i><h6>{t.date.split('T')[0]}</h6></div>
                                      <div className="bar-time rounded mb-2 ms-2"></div>
                                    </div>
                                  :
                                  t.date != Ttasks.delayed[i-1].date?
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="bar-time rounded mb-2 me-2"></div>
                                        <div className="d-flex"><i class="fa-solid fa-calendar-day me-1" ></i><h6>{t.date.split('T')[0]}</h6></div>
                                        <div className="bar-time rounded mb-2 ms-2"></div>
                                      </div>
                                    :
                                    ""
                                  }
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
    </div>
    </div>

    </>
  )
}
