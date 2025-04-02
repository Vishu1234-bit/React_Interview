import { useState,useEffect } from 'react';
export default function App() {
  const [jobs, setJobs] = useState([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [count,setCount] = useState(6);
  useEffect(()=>{
    const fetchJobs= async()=>{
      try{
        setLoading(true);
        const jobPostingId = await fetch("https://hacker-news.firebaseio.com/v0/jobstories.json");
        const responseids = await jobPostingId.json();
        const jobPostings = await Promise.all(
          responseids.slice(0,count).map(async(id)=>{
            const jobpostingResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
            return jobpostingResponse.json();
          })
        )
      setJobs(jobPostings);
      }catch(error){
        setError("Error fetching data");
      }finally{
        setLoading(false);
      }
  }
  fetchJobs();
  },[count])

  return (<div className = "job-board">
           {error && <p>{error}</p>}
           {loading && <p>Loading...</p>}
           <h2 className="header">Hacker news job board</h2>
           <div>
           {jobs.map((post)=>{
            return(
            <div className="container" key={post.id}>
            <a className="link" key={post.id} href={post.url} target="_blank" rel="noopener noreferrer">
            {post.title} <p>By {post.by}</p>
            <p>{post.time}</p>
            </a>
            </div>
            )
           })}
           </div>
           <button onClick={()=>setCount((prevCount)=>prevCount+6)}>Load More</button>
          </div>);
}  
