import axios from "axios";
import { useState } from 'react';
export default function Urlshortner(){
    let id = 1;
    let [url,setUrl] = useState('')
    let [urlData,setData] = useState([])
    let postUrl = async event =>{
        event.preventDefault();
        const longUrl = {url}
        axios.post(`/api/url/shorten`,longUrl).then( res => {
          
          if(res.data.message === "Url Shorten"){
                axios.post(`/urllist`).then(
                res => {
                  const url_data = res.data
                  setData(url_data)
                }
              )
          }})
    }

    let updateClicks = event =>{
      event.preventDefault();
      let shortUrl = event.currentTarget.textContent;
      let url = {shortUrl}
      axios.post(`/api/url/click`,url)
      .then(res=>{
        setData(res.data.allData)
      })
    }

    return<>
    <div className="container">
        <h1 className="text-center">Url Shortner</h1>
        <div>
        <div className="input-group mb-3">
        <div className="input-group-prepend">
        <span className="input-group-text" id="basic-addon3">Enter your URL Here:</span>
        </div>
        <input type="text" className="form-control" id="basic-url" aria-describedby="basic-addon3" value={url} onChange={e=>setUrl(e.target.value)} />
        <button type="button" className="btn btn-success" onClick={postUrl}>Shorten</button>
        </div>
        </div>
        <table className="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Original URL</th>
      <th scope="col">Shorten URL</th>
      <th scope="col">Clicks</th>
    </tr>
  </thead>
  <tbody>
 
 { 

urlData.map((obj)=>{
 
 return   <tr>
    <td>{id++}</td>
    <td><a href={obj.longUrl} target="blank">{obj.longUrl}</a></td>
    <td onClick={(e)=>{ 
      window.open(obj.shortUrl, "_blank")
      updateClicks(e)}
      } value={obj.shortUrl}><a href={obj.shortUrl} target="blank" >{obj.shortUrl}</a></td>
    <td>{obj.clicks}</td>
  </tr>
 })
 }
  </tbody>
</table>

    </div>
    </>
}