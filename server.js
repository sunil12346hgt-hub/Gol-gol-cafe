const express = require("express");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "set-a-strong-password-in-host-secrets";
const DB = path.join(__dirname, "orders.json");
if (!fs.existsSync(DB)) fs.writeFileSync(DB, "[]");
app.use(express.json({limit:"100kb"}));
app.get("/", (req,res) => {
  res.sendFile(path.join(__dirname,"index.html"));
});app.get("/style.css", (req,res) => {
  res.sendFile(path.join(__dirname,"style.css"));
});

app.get("/app.js", (req,res) => {
  res.sendFile(path.join(__dirname,"app.js"));
});

app.get("/admin.html", (req,res) => {
  res.sendFile(path.join(__dirname,"admin.html"));
});

app.get("/admin.js", (req,res) => {
  res.sendFile(path.join(__dirname,"admin.js"));
});
const read = () => JSON.parse(fs.readFileSync(DB,"utf8"));
const write = x => fs.writeFileSync(DB, JSON.stringify(x,null,2));
function admin(req,res,next){if(req.get("x-admin-password") !== ADMIN_PASSWORD) return res.status(401).json({error:"Wrong admin password"});next();}
app.post("/api/orders",(req,res)=>{
 const {name,phone,items,note=""}=req.body||{};
 if(!name||!phone||!Array.isArray(items)||!items.length) return res.status(400).json({error:"Please enter name, phone and select items."});
 const safe=items.map(i=>({name:String(i.name).slice(0,80),qty:Math.max(1,Math.min(30,Number(i.qty)||1)),price:Math.max(0,Number(i.price)||0)}));
 const order={id:crypto.randomUUID().slice(0,8).toUpperCase(),name:String(name).slice(0,80),phone:String(phone).slice(0,20),items:safe,note:String(note).slice(0,250),total:safe.reduce((s,i)=>s+i.qty*i.price,0),status:"Pending",createdAt:new Date().toISOString()};
 const all=read();all.unshift(order);write(all);res.status(201).json({ok:true,order});
});
app.get("/api/orders",admin,(req,res)=>res.json(read()));
app.patch("/api/orders/:id",admin,(req,res)=>{
 const statuses=["Pending","Accepted","Preparing","Ready","Delivered","Cancelled"];
 if(!statuses.includes(req.body.status))return res.status(400).json({error:"Invalid status"});
 const all=read(), o=all.find(x=>x.id===req.params.id);
 if(!o)return res.status(404).json({error:"Order not found"});
 o.status=req.body.status;write(all);res.json(o);
});
app.get("/api/health",(req,res)=>res.json({ok:true}));
app.listen(PORT,"0.0.0.0",()=>console.log("GOL GOL CAFE running on "+PORT));
