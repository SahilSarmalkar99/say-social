import React,{useEffect,useState} from 'react';
import {getCarousel,getMainVideo} from '../api/videoApi';

export default function LandingPage(){
 const [main,setMain]=useState(null),[items,setItems]=useState([]),[active,setActive]=useState(0);
 useEffect(()=>{Promise.all([getMainVideo(),getCarousel()]).then(([m,c])=>{setMain(m.video);setItems(c.videos)})},[]);
 useEffect(()=>{if(items.length>1){const id=setInterval(()=>setActive(x=>(x+1)%items.length),5000);return()=>clearInterval(id)}},[items.length]);
 const current=items[active];
 return <div className="landing"><section className="hero">{main?<video src={main.videoUrl} autoPlay muted loop playsInline/>:<div className="hero-empty">Main video coming soon</div>}<div className="hero-overlay"><span>WELCOME</span><h1>Experience the story.</h1></div></section><section className="landing-carousel"><div className="carousel-heading"><span>FEATURED VIDEOS</span><h2>Explore our latest</h2></div>{current&&<div className="carousel-item"><video src={current.videoUrl} controls playsInline/><div><h3>{current.title}</h3><p>{current.description}</p></div></div>}<div className="dots">{items.map((_,i)=><button key={i} onClick={()=>setActive(i)} className={i===active?'dot selected':'dot'} aria-label={`Video ${i+1}`}/>)}</div></section></div>
}
