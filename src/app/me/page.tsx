"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {createClient} from "@/lib/supabase/client";

type Participant={
  id:string;
  confirmed_at:string|null;
  attended:boolean|null;
  room_perspectives:{label:string}|null;
  rooms:{
    slug:string;
    status:string;
    scheduled_at:string|null;
    public_place:string|null;
    mode:string;
    questions:{title:string;objective:string}|null;
  }|null;
};

function statusLabel(p:Participant){
  if(p.attended)return "Present in the room";
  if(p.confirmed_at)return "Participation confirmed";
  return "Selected — confirmation pending";
}

export default function Me(){
  const[items,setItems]=useState<Participant[]>([]),[loading,setLoading]=useState(true),[msg,setMsg]=useState("");
  async function load(){
    const s=createClient();
    const{data:{user}}=await s.auth.getUser();
    if(!user){location.href="/login";return}
    const{data,error}=await s.from("participants").select("id,confirmed_at,attended,room_perspectives(label),rooms(slug,status,scheduled_at,public_place,mode,questions(title,objective))").eq("user_id",user.id).order("confirmed_at",{ascending:false,nullsFirst:true});
    if(error)setMsg(error.message);else setItems((data||[]) as unknown as Participant[]);
    setLoading(false);
  }
  useEffect(()=>{load()},[]);
  async function act(id:string,fn:"confirm_participation"|"mark_room_presence"){
    const{error}=await createClient().rpc(fn,{p_participant_id:id});
    setMsg(error?error.message:fn==="confirm_participation"?"Participation confirmed.":"Presence registered. Welcome to the room.");
    if(!error)load();
  }
  return <main className="wrap">
    <nav className="nav"><div className="brand">HUMAN ROOM</div><Link href="/rooms">ROOMS</Link></nav>
    <div className="hero"><div className="eyebrow">MY HUMAN ROOMS</div><h1>Your selected rooms.</h1><p>Confirm your seat, then enter the room when you are ready to be present.</p></div>
    {msg&&<p role="status">{msg}</p>}
    {loading?<p>Loading your rooms…</p>:items.length?<div className="grid">{items.map(p=><article className="card" key={p.id}>
      <div className="eyebrow">{p.room_perspectives?.label||"Perspective"} · {statusLabel(p)}</div>
      <h2>{p.rooms?.questions?.title||"Human Room"}</h2>
      <p>{p.rooms?.mode==="online"?"Online room":p.rooms?.public_place||"Public place to be confirmed"}</p>
      {p.rooms?.scheduled_at&&<p>{new Date(p.rooms.scheduled_at).toLocaleString()}</p>}
      {!p.confirmed_at&&<button className="cta" onClick={()=>act(p.id,"confirm_participation")}>CONFIRM MY SEAT</button>}
      {p.confirmed_at&&!p.attended&&<button className="cta" onClick={()=>act(p.id,"mark_room_presence")}>I AM PRESENT</button>}
      {p.attended&&<p>Presence is saved. Feedback and Human Brief can come after the conversation.</p>}
      {p.rooms?.slug&&<p><Link href={`/rooms/${p.rooms.slug}`}>Open public room page</Link></p>}
    </article>)}</div>:<section className="card"><p>You have not been selected for a room yet.</p><Link className="cta" href="/rooms">EXPLORE OPEN ROOMS</Link></section>}
  </main>
}
