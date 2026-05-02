const BASE = import.meta.env.BASE_URL;
const imgs = [
  'dl-hero-model-s.jpg','dl-hero-model-3.jpg','dl-hero-model-y.jpg','dl-hero-model-x.jpg',
  'real-model-3.jpg','real-cybertruck.jpg',
  'ct5.jpg','ct6.jpg',
];
export default function ImgCheck() {
  return (
    <div style={{background:'#111',minHeight:'100vh',padding:'80px 16px 32px',display:'flex',flexWrap:'wrap',gap:'12px'}}>
      {imgs.map(f => (
        <div key={f} style={{textAlign:'center',color:'#fff',fontFamily:'monospace',fontSize:'10px'}}>
          <img src={`${BASE}${f}`} style={{width:'200px',height:'130px',objectFit:'cover',border:'1px solid #333',display:'block'}} alt={f} />
          <div style={{marginTop:'4px',maxWidth:'200px',wordBreak:'break-all'}}>{f}</div>
        </div>
      ))}
    </div>
  );
}
