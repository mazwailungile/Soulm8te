const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const GROQ_KEY = process.env.GROQ_KEY;
const ELEVEN_KEY = process.env.ELEVEN_KEY;
app.get('/', (req,res)=>res.send('SOULM8TE $5M Backend LIVE - LUNGILE'));
app.post('/chat', async (req,res)=>{
  try{
    const {messages} = req.body;
    const r = await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',
      headers:{'Authorization':`Bearer ${GROQ_KEY}`,'Content-Type':'application/json'},
      body:JSON.stringify({model:'llama-3.3-70b-versatile',messages:messages.slice(-10),max_tokens:250})
    });
    const data = await r.json(); res.json(data);
  }catch(e){res.status(500).json({error:e.message})}
});
app.post('/tts', async (req,res)=>{
  try{
    const {text, voice_id} = req.body;
    const vid = voice_id || "EXAVITQu4vr4xnSDxMaL";
    const r = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${vid}`,{
      method:'POST', headers:{'xi-api-key':ELEVEN_KEY,'Content-Type':'application/json'},
      body:JSON.stringify({text,model_id:"eleven_multilingual_v2"})
    });
    const buf = await r.arrayBuffer();
    res.set('Content-Type','audio/mpeg'); res.send(Buffer.from(buf));
  }catch(e){res.status(500).json({error:e.message})}
});
const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=>console.log(`Live on ${PORT}`));
