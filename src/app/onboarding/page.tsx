"use client";
import { FormEvent,useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
export default function Onboarding(){
 const router=useRouter(); const [msg,setMsg]=useState("");
 async function submit(e:FormEvent<HTMLFormElement>){
  e.preventDefault(); const f=new FormData(e.currentTarget); const adult=f.get("adult")==="yes";
  if(!adult){setMsg("Human Room is currently for adults 18+.");return}
  const supabase=createClient(); const {data:{user}}=await supabase.auth.getUser();
  if(!user){router.push("/login");return}
  const display_name=String(f.get("display_name")||"").trim()||"Participante";
  const city=String(f.get("city")||"").trim()||"Brussels";
  const language=String(f.get("language")||"en");
  const {error}=await supabase.from("profiles").update({display_name,city,languages:[language],is_adult:true}).eq("id",user.id);
  if(error){setMsg(error.message);return} router.push("/rooms");
 }
 return <main className="wrap"><div className="hero"><div className="eyebrow">WELCOME</div><h1>Your perspective starts here.</h1><p>Complete the minimum profile needed to participate. No popularity score.</p></div><form className="card" onSubmit={submit}>
 <label>Name or public name<input name="display_name" required minLength={2} style={{display:"block",width:"100%",padding:14,margin:"8px 0 18px"}}/></label>
 <label>City<input name="city" defaultValue="Brussels" style={{display:"block",width:"100%",padding:14,margin:"8px 0 18px"}}/></label>
 <label>Language<select name="language" defaultValue="en" style={{display:"block",width:"100%",padding:14,margin:"8px 0 18px"}}><option value="en">English</option><option value="fr">Français</option><option value="pt">Português</option><option value="es">Español</option></select></label>
 <label><input name="adult" value="yes" type="checkbox" required/> I confirm I am 18 or older.</label><br/><button className="cta">CONTINUE</button>{msg&&<p role="status">{msg}</p>}
 </form></main>
}