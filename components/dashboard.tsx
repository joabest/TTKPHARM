"use client";

import { useMemo, useState } from "react";
import {
  Activity, Bell, CalendarDays, ChevronDown, CircleHelp, Clapperboard, DollarSign,
  Download, Eye, Gauge, Heart, LayoutDashboard, LogOut, Menu, MessageCircle,
  MonitorSmartphone, MoreHorizontal, Play, Search, Send, Settings, Share2,
  Smartphone, Sparkles, TrendingUp, Users, Wifi, X
} from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Logo } from "./logo";

type Period = "Hoje" | "7 dias" | "30 dias" | "3 meses";

const periodData: Record<Period, { views: string; engagement: string; revenue: string; posts: string; growth: string; chart: {name:string; value:number}[] }> = {
  Hoje: { views: "48,2 mil", engagement: "8,7%", revenue: "R$ 1.284", posts: "18", growth: "+12,4%", chart: [8,12,10,18,16,26,31,28,39,46,42,58].map((value,i)=>({name:`${i+8}h`,value})) },
  "7 dias": { views: "326 mil", engagement: "9,2%", revenue: "R$ 8.790", posts: "92", growth: "+18,2%", chart: [25,32,29,44,48,55,67].map((value,i)=>({name:["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"][i],value})) },
  "30 dias": { views: "1,4 mi", engagement: "9,8%", revenue: "R$ 34.580", posts: "386", growth: "+24,8%", chart: [20,27,25,38,34,49,55,51,63,70,66,82].map((value,i)=>({name:`${i*3+1}`,value})) },
  "3 meses": { views: "4,9 mi", engagement: "10,4%", revenue: "R$ 112.430", posts: "1.142", growth: "+41,5%", chart: [18,23,31,29,42,48,53,65,61,73,81,94].map((value,i)=>({name:`S${i+1}`,value})) },
};

const accounts = [
  { id:"TTK-012", name:"Clean Home Brasil", handle:"@cleanhome.br", device:"Galaxy S21", status:"Online", views:"184,2 mil", engagement:"12,8%", revenue:"R$ 4.820" },
  { id:"TTK-009", name:"Rotina Produtiva", handle:"@rotinapro.app", device:"iPhone 12", status:"Online", views:"142,7 mil", engagement:"10,4%", revenue:"R$ 3.760" },
  { id:"TTK-018", name:"Fit em 15", handle:"@fitem15", device:"Redmi Note 11", status:"Publicando", views:"98,4 mil", engagement:"9,7%", revenue:"R$ 2.940" },
  { id:"TTK-006", name:"Casa Organizada", handle:"@casaorganizada", device:"Galaxy A54", status:"Online", views:"76,9 mil", engagement:"8,9%", revenue:"R$ 1.880" },
  { id:"TTK-021", name:"Tech Resolve", handle:"@techresolve", device:"Moto G84", status:"Pausado", views:"51,3 mil", engagement:"7,2%", revenue:"R$ 1.120" },
];

const nav = [
  [LayoutDashboard,"Visão geral"], [MonitorSmartphone,"Dispositivos"], [Users,"Contas"],
  [Clapperboard,"Conteúdos"], [CalendarDays,"Calendário"], [Gauge,"Desempenho"],
  [DollarSign,"Ganhos"], [Activity,"Relatórios"]
] as const;

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>("30 dias");
  const [query, setQuery] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [active, setActive] = useState("Visão geral");
  const [toast, setToast] = useState("");
  const data = periodData[period];
  const filtered = useMemo(() => accounts.filter(a => `${a.name} ${a.handle} ${a.device}`.toLowerCase().includes(query.toLowerCase())), [query]);

  function flash(message:string){ setToast(message); window.setTimeout(()=>setToast(""),2400); }
  function exportCsv(){
    const rows = [["Conta","Usuário","Dispositivo","Status","Visualizações","Engajamento","Ganhos"], ...filtered.map(a=>[a.name,a.handle,a.device,a.status,a.views,a.engagement,a.revenue])];
    const blob = new Blob([rows.map(r=>r.join(";")).join("\n")],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="ttkfarmpro-relatorio.csv"; a.click(); URL.revokeObjectURL(url); flash("Relatório exportado com sucesso");
  }

  return (
    <main className="app-shell">
      {toast && <div className="toast">{toast}</div>}
      {sidebar && <button className="overlay" aria-label="Fechar menu" onClick={()=>setSidebar(false)} />}
      <aside className={`sidebar ${sidebar ? "open" : ""}`}>
        <div className="brand-row"><Logo /><button className="icon-button mobile-close" onClick={()=>setSidebar(false)}><X size={18}/></button></div>
        <p className="section-label">PAINEL PRINCIPAL</p>
        <nav>{nav.map(([Icon,label])=><button key={label} className={active===label?"active":""} onClick={()=>{setActive(label);setSidebar(false); if(label!=="Visão geral") flash(`${label}: módulo preparado para integração`)}}><Icon size={17}/><span>{label}</span>{label==="Dispositivos"&&<small>24</small>}</button>)}</nav>
        <p className="section-label general">GERAL</p>
        <nav><button onClick={()=>flash("Configurações abertas em breve")}><Settings size={17}/>Configurações</button><button onClick={()=>flash("Central de ajuda aberta em breve")}><CircleHelp size={17}/>Central de ajuda</button></nav>
        <div className="system-card"><div className="system-head"><span className="pulse"/><b>Sistema operacional</b></div><div className="system-row"><span>20 de 24 aparelhos</span><b>83%</b></div><div className="progress"><i/></div><p>Todos os serviços funcionando normalmente.</p></div>
        <div className="profile"><div className="avatar">JS</div><div><b>Joab Silva</b><span>Administrador</span></div><button title="Sair" onClick={()=>flash("Sessão encerrada (demonstração)")}><LogOut size={17}/></button></div>
      </aside>

      <section className="workspace">
        <header><button className="icon-button menu-button" onClick={()=>setSidebar(true)}><Menu size={20}/></button><div><h1>{active}</h1><p>Acompanhe os resultados da sua operação em tempo real.</p></div><div className="header-actions"><label className="global-search"><Search size={16}/><input placeholder="Buscar contas, aparelhos..." value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></label><button className="icon-button notify"><Bell size={18}/><i/></button><button className="primary" onClick={()=>flash("Fluxo de novo conteúdo iniciado")}><Sparkles size={16}/>Novo conteúdo</button></div></header>

        <div className="content">
          <div className="toolbar"><div className="periods">{(Object.keys(periodData) as Period[]).map(p=><button key={p} className={period===p?"selected":""} onClick={()=>setPeriod(p)}>{p}</button>)}</div><div className="toolbar-actions"><button onClick={exportCsv}><Download size={15}/>Exportar</button><button onClick={()=>flash("Filtro personalizado selecionado")}><CalendarDays size={15}/>Período personalizado<ChevronDown size={14}/></button></div></div>

          <section className="stats-grid">
            <Stat icon={Eye} label="Visualizações totais" value={data.views} detail={`${data.growth} vs. período anterior`} tone="lime"/>
            <Stat icon={Heart} label="Taxa de engajamento" value={data.engagement} detail="Curtidas, comentários e compartilhamentos" tone="violet"/>
            <Stat icon={DollarSign} label="Ganhos totais" value={data.revenue} detail="Receita atribuída aos conteúdos" tone="cyan"/>
            <Stat icon={Clapperboard} label="Conteúdos publicados" value={data.posts} detail="20 contas ativas no período" tone="orange"/>
          </section>

          <section className="charts-grid">
            <article className="panel chart-panel"><div className="panel-title"><div><h2><TrendingUp size={18}/>Desempenho da operação</h2><p>Visualizações consolidadas no período</p></div><button className="icon-button"><MoreHorizontal size={18}/></button></div><div className="chart-number"><strong>{data.views}</strong><span>{data.growth}</span></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.chart}><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a7ff3f" stopOpacity={.26}/><stop offset="100%" stopColor="#a7ff3f" stopOpacity={0}/></linearGradient></defs><CartesianGrid vertical={false} stroke="#292b30"/><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"#777b84",fontSize:11}}/><YAxis hide/><Tooltip contentStyle={{background:"#1d1e22",border:"1px solid #34363d",borderRadius:10}}/><Area type="monotone" dataKey="value" stroke="#a7ff3f" strokeWidth={2.5} fill="url(#chartFill)"/></AreaChart></ResponsiveContainer></div></article>
            <article className="panel devices"><div className="panel-title"><div><h2><Smartphone size={18}/>Saúde dos aparelhos</h2><p>Status dos 24 dispositivos cadastrados</p></div><button className="icon-button"><MoreHorizontal size={18}/></button></div><div className="device-donut"><div className="ring"><div><b>20</b><span>online</span></div></div><div className="legend"><p><i className="online"/>Online <b>20</b></p><p><i className="publishing"/>Publicando <b>2</b></p><p><i className="paused"/>Pausados <b>2</b></p></div></div><div className="quick-metrics"><div><Wifi size={16}/><span>Conexão média<b>98,6%</b></span></div><div><Activity size={16}/><span>Temperatura<b>34°C</b></span></div></div><button className="details" onClick={()=>{setActive("Dispositivos");flash("Exibindo gestão dos dispositivos")}}>Ver todos os dispositivos <span>→</span></button></article>
          </section>

          <section className="panel table-panel"><div className="table-header"><div><h2>Contas com melhor desempenho</h2><p>Resultados individuais das contas conectadas</p></div><div className="table-actions"><label><Search size={15}/><input placeholder="Buscar conta..." value={query} onChange={e=>setQuery(e.target.value)}/></label><button onClick={exportCsv}><Download size={15}/>Exportar</button></div></div><div className="table-scroll"><table><thead><tr><th>Conta</th><th>Dispositivo</th><th>Status</th><th>Visualizações</th><th>Engajamento</th><th>Ganhos</th><th/></tr></thead><tbody>{filtered.map((a,i)=><tr key={a.id}><td><div className={`account-avatar av${i}`}>{a.name.slice(0,1)}</div><div><b>{a.name}</b><span>{a.handle}</span></div></td><td><span className="device-cell"><Smartphone size={14}/>{a.device}</span></td><td><span className={`badge ${a.status.toLowerCase()}`}><i/>{a.status}</span></td><td>{a.views}</td><td><b>{a.engagement}</b></td><td className="revenue">{a.revenue}</td><td><button className="icon-button" onClick={()=>flash(`Abrindo detalhes de ${a.name}`)}><MoreHorizontal size={17}/></button></td></tr>)}</tbody></table>{filtered.length===0&&<div className="empty">Nenhuma conta encontrada.</div>}</div></section>

          <section className="mini-grid"><Mini icon={Play} value="386" label="Vídeos publicados"/><Mini icon={Heart} value="126,8 mil" label="Curtidas"/><Mini icon={MessageCircle} value="18,4 mil" label="Comentários"/><Mini icon={Share2} value="32,1 mil" label="Compartilhamentos"/><Mini icon={Send} value="R$ 89,58" label="Receita por conteúdo"/></section>
        </div>
      </section>
    </main>
  );
}

function Stat({icon:Icon,label,value,detail,tone}:{icon:typeof Eye;label:string;value:string;detail:string;tone:string}){return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={18}/></div><div className="stat-top"><span>{label}</span><MoreHorizontal size={17}/></div><strong>{value}</strong><p>{detail}</p></article>}
function Mini({icon:Icon,value,label}:{icon:typeof Eye;value:string;label:string}){return <article className="mini"><Icon size={17}/><div><b>{value}</b><span>{label}</span></div></article>}
