"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Activity, Bell, CalendarDays, ChevronDown, CircleHelp, Clapperboard, DollarSign,
  Download, Eye, Gauge, Heart, LayoutDashboard, LogOut, Menu, MessageCircle,
  MonitorSmartphone, MoreHorizontal, Play, Search, Send, Settings, Share2,
  Smartphone, TrendingUp, Wifi, X, Zap, ChevronsUpDown, Plus, Pencil
  , Music2, SlidersHorizontal, Globe2, ShieldCheck, Fingerprint
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
  [LayoutDashboard,"Visão geral"], [MonitorSmartphone,"Dispositivos"], [ShieldCheck,"Perfis"],
  [Clapperboard,"Publicações"], [SlidersHorizontal,"Editor"], [Music2,"Músicas"],
  [CalendarDays,"Calendário"], [Fingerprint,"Ambientes"], [Globe2,"Integrações"], [Gauge,"Desempenho"],
  [DollarSign,"Ganhos"], [Activity,"Relatórios"]
] as const;

export default function Dashboard() {
  const [period, setPeriod] = useState<Period>("30 dias");
  const [query, setQuery] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [active, setActive] = useState("Visão geral");
  const [dialog, setDialog] = useState<"content"|"profile"|"period"|"plan"|null>(null);
  const [profile, setProfile] = useState({name:"Joab Silva",email:"joab@tk2pharmpro.com"});
  const [created, setCreated] = useState<Record<string,string[][]>>({});
  const data = periodData[period];
  const filtered = useMemo(() => accounts.filter(a => `${a.name} ${a.handle} ${a.device}`.toLowerCase().includes(query.toLowerCase())), [query]);

  useEffect(()=>{
    const savedProfile=localStorage.getItem("tk2-profile");
    const savedRows=localStorage.getItem("tk2-created");
    if(savedProfile) setProfile(JSON.parse(savedProfile));
    if(savedRows) setCreated(JSON.parse(savedRows));
  },[]);
  function saveProfile(next:{name:string;email:string}){setProfile(next);localStorage.setItem("tk2-profile",JSON.stringify(next));setDialog(null)}
  function addRow(module:string,row:string[]){const next={...created,[module]:[...(created[module]||[]),row]};setCreated(next);localStorage.setItem("tk2-created",JSON.stringify(next));setDialog(null)}
  function exportCsv(){
    const rows = [["Conta","Usuário","Dispositivo","Status","Visualizações","Engajamento","Ganhos"], ...filtered.map(a=>[a.name,a.handle,a.device,a.status,a.views,a.engagement,a.revenue])];
    const blob = new Blob([rows.map(r=>r.join(";")).join("\n")],{type:"text/csv;charset=utf-8"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download="tk2pharmpro-relatorio.csv"; a.click(); URL.revokeObjectURL(url);
  }

  return (
    <main className="app-shell">
      {dialog&&<DashboardDialog kind={dialog} module={active} profile={profile} onClose={()=>setDialog(null)} onProfile={saveProfile} onCreate={addRow}/>} 
      {sidebar && <button className="overlay" aria-label="Fechar menu" onClick={()=>setSidebar(false)} />}
      <aside className={`sidebar ${sidebar ? "open" : ""}`}>
        <div className="brand-row"><Logo /><button className="icon-button mobile-close" onClick={()=>setSidebar(false)}><X size={18}/></button></div>
        <p className="section-label"><span>Menu principal</span><ChevronDown size={12}/></p>
        <nav>{nav.map(([Icon,label])=><button key={label} className={active===label?"active":""} onClick={()=>{setActive(label);setSidebar(false)}}><Icon size={17}/><span>{label}</span>{label==="Dispositivos"&&<small>24</small>}</button>)}</nav>
        <p className="section-label general"><span>Geral</span><ChevronDown size={12}/></p>
        <nav><button className={active==="Configurações"?"active":""} onClick={()=>{setActive("Configurações");setSidebar(false)}}><Settings size={17}/>Configurações</button><button className={active==="Central de ajuda"?"active":""} onClick={()=>{setActive("Central de ajuda");setSidebar(false)}}><CircleHelp size={17}/>Central de ajuda</button></nav>
        <div className="sidebar-footer"><div className="system-card"><Zap size={26}/><b>Plano Profissional</b><div className="progress"><i/></div><p>20 de 24 dispositivos em uso.<br/>Faça upgrade para ampliar sua operação.</p><button onClick={()=>setDialog("plan")}>GERENCIAR PLANO <span>›</span></button></div>
        <div className="profile" onClick={()=>setDialog("profile")} role="button" tabIndex={0}><div className="avatar">{profile.name.split(" ").map(v=>v[0]).slice(0,2).join("").toUpperCase()}</div><div><b>{profile.name}</b><span>{profile.email}</span></div><button title="Editar perfil"><Pencil size={14}/></button></div></div>
      </aside>

      <section className="workspace">
        <header><button className="icon-button menu-button" onClick={()=>setSidebar(true)}><Menu size={20}/></button><div><h1>{active}</h1><p>Acompanhe os resultados da sua operação em tempo real.</p></div><div className="header-actions"><label className="global-search"><Search size={16}/><input placeholder="Buscar contas, aparelhos..." value={query} onChange={e=>setQuery(e.target.value)}/><kbd>⌘ K</kbd></label><button className="icon-button notify" aria-label="Notificações"><Bell size={18}/><i/></button><button className="primary" onClick={()=>setDialog("content")}><Plus size={16}/>NOVO CONTEÚDO</button></div></header>

        <div className="content">
          {active !== "Visão geral" ? <ModuleView module={active} query={query} setQuery={setQuery} created={created[active]||[]} onAction={()=>setDialog("content")}/> : <>
          <div className="toolbar"><div className="periods">{(Object.keys(periodData) as Period[]).map(p=><button key={p} className={period===p?"selected":""} onClick={()=>setPeriod(p)}>{p}</button>)}</div><div className="toolbar-actions"><button onClick={exportCsv}><Download size={15}/>EXPORTAR</button><button onClick={()=>setDialog("period")}><CalendarDays size={15}/>PERÍODO<ChevronDown size={14}/></button></div></div>

          <section className="stats-grid">
            <Stat icon={Eye} label="Visualizações totais" value={data.views} detail={`${data.growth} vs. período anterior`} tone="blue"/>
            <Stat icon={Heart} label="Taxa de engajamento" value={data.engagement} detail="Curtidas, comentários e compartilhamentos" tone="violet"/>
            <Stat icon={DollarSign} label="Ganhos totais" value={data.revenue} detail="Receita atribuída aos conteúdos" tone="green"/>
            <Stat icon={Clapperboard} label="Conteúdos publicados" value={data.posts} detail="20 contas ativas no período" tone="orange"/>
          </section>

          <section className="charts-grid">
            <article className="panel chart-panel"><div className="panel-title"><div><h2><TrendingUp size={18}/>Desempenho da operação</h2><p>Visualizações consolidadas no período</p></div><button className="icon-button"><MoreHorizontal size={18}/></button></div><div className="chart-number"><strong>{data.views}</strong><span>{data.growth}</span></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={data.chart}><defs><linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b7cff" stopOpacity={.32}/><stop offset="100%" stopColor="#8b7cff" stopOpacity={0}/></linearGradient></defs><CartesianGrid vertical={false} stroke="#34343a"/><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:"#777b84",fontSize:11}}/><YAxis hide/><Tooltip contentStyle={{background:"#29292d",border:"1px solid #424249",borderRadius:8}}/><Area type="monotone" dataKey="value" stroke="#8b7cff" strokeWidth={2} fill="url(#chartFill)"/></AreaChart></ResponsiveContainer></div></article>
            <article className="panel devices"><div className="panel-title"><div><h2><Smartphone size={18}/>Saúde dos aparelhos</h2><p>Status dos 24 dispositivos cadastrados</p></div><button className="icon-button"><MoreHorizontal size={18}/></button></div><div className="device-donut"><div className="ring"><div><b>20</b><span>online</span></div></div><div className="legend"><p><i className="online"/>Online <b>20</b></p><p><i className="publishing"/>Publicando <b>2</b></p><p><i className="paused"/>Pausados <b>2</b></p></div></div><div className="quick-metrics"><div><Wifi size={16}/><span>Conexão média<b>98,6%</b></span></div><div><Activity size={16}/><span>Temperatura<b>34°C</b></span></div></div><button className="details" onClick={()=>setActive("Dispositivos")}>VER TODOS OS DISPOSITIVOS <span>→</span></button></article>
          </section>

          <section className="panel table-panel"><div className="table-header"><div><h2>Contas com melhor desempenho</h2><p>Resultados individuais das contas conectadas</p></div><div className="table-actions"><label><Search size={15}/><input placeholder="Buscar conta..." value={query} onChange={e=>setQuery(e.target.value)}/></label><button onClick={exportCsv}><Download size={15}/>EXPORTAR</button></div></div><div className="table-scroll"><table><thead><tr><th>Conta</th><th>Dispositivo</th><th>Status</th><th>Visualizações</th><th>Engajamento</th><th>Ganhos</th><th/></tr></thead><tbody>{filtered.map((a,i)=><tr key={a.id}><td><div className={`account-avatar av${i}`}>{a.name.slice(0,1)}</div><div><b>{a.name}</b><span>{a.handle}</span></div></td><td><span className="device-cell"><Smartphone size={14}/>{a.device}</span></td><td><span className={`badge ${a.status.toLowerCase()}`}><i/>{a.status}</span></td><td>{a.views}</td><td><b>{a.engagement}</b></td><td className="revenue">{a.revenue}</td><td><button className="icon-button" aria-label={`Detalhes de ${a.name}`} onClick={()=>{setQuery(a.handle);setActive("Desempenho")}}><MoreHorizontal size={17}/></button></td></tr>)}</tbody></table>{filtered.length===0&&<div className="empty">Nenhuma conta encontrada.</div>}</div></section>

          <section className="mini-grid"><Mini icon={Play} value="386" label="Vídeos publicados"/><Mini icon={Heart} value="126,8 mil" label="Curtidas"/><Mini icon={MessageCircle} value="18,4 mil" label="Comentários"/><Mini icon={Share2} value="32,1 mil" label="Compartilhamentos"/><Mini icon={Send} value="R$ 89,58" label="Receita por conteúdo"/></section>
          </>}
        </div>
      </section>
    </main>
  );
}

function Stat({icon:Icon,label,value,detail,tone}:{icon:typeof Eye;label:string;value:string;detail:string;tone:string}){return <article className="stat-card"><div className={`stat-icon ${tone}`}><Icon size={18}/></div><div className="stat-top"><span>{label}</span><MoreHorizontal size={17}/></div><strong>{value}</strong><p>{detail}</p></article>}
function Mini({icon:Icon,value,label}:{icon:typeof Eye;value:string;label:string}){return <article className="mini"><Icon size={17}/><div><b>{value}</b><span>{label}</span></div></article>}

const moduleConfig: Record<string, { title:string; description:string; action:string; columns:string[]; rows:string[][] }> = {
  Dispositivos: { title:"Gerenciamento de dispositivos", description:"Acompanhe conexão, bateria, temperatura e conta vinculada.", action:"Adicionar dispositivo", columns:["Dispositivo","Conta vinculada","Conexão","Bateria","Status"], rows:[["Galaxy S21 · TTK-012","@cleanhome.br","4G · São Paulo","87%","Online"],["iPhone 12 · TTK-009","@rotinapro.app","Wi-Fi · São Paulo","64%","Online"],["Redmi Note 11 · TTK-018","@fitem15","4G · Rio de Janeiro","92%","Publicando"],["Galaxy A54 · TTK-006","@casaorganizada","Wi-Fi · Curitiba","73%","Online"],["Moto G84 · TTK-021","@techresolve","Sem conexão","41%","Pausado"]] },
  Perfis: { title:"Perfis e sessões isoladas", description:"Organize cookies, cache, credenciais e redes autorizadas separadamente por conta.", action:"Criar perfil", columns:["Perfil","Plataformas","Dispositivo","Rede autorizada","Status"], rows:[["Clean Home","TikTok · Reels","Galaxy S21","São Paulo · Dedicada","Conectado"],["Rotina Pro","TikTok · Shorts","iPhone 12","São Paulo · Corporativa","Conectado"],["Fit em 15","Reels · Shorts","Redmi Note 11","Rio de Janeiro · Dedicada","Sincronizando"],["Casa Organizada","TikTok · Reels","Galaxy A54","Curitiba · Corporativa","Pausado"]] },
  Publicações: { title:"Central de publicações", description:"Programe conteúdos em várias contas, páginas e plataformas.", action:"Nova publicação", columns:["Conteúdo","Destinos","Horário","Formato","Status"], rows:[["5 dicas para limpar o sofá","TikTok · Reels","Hoje, 18:30","9:16 · 1080p","Agendado"],["Organize sua semana","TikTok · Shorts","Hoje, 20:00","9:16 · 1080p","Em revisão"],["Treino rápido","Reels · Shorts","Amanhã, 09:15","9:16 · 4K","Aprovado"],["Antes e depois da sala","3 plataformas","Amanhã, 14:00","Variações automáticas","Rascunho"]] },
  Editor: { title:"Editor de variações", description:"Crie versões autorizadas com cortes, proporções, filtros, velocidade, cor e overlays.", action:"Novo projeto", columns:["Projeto","Variações","Proporções","Legenda","Status"], rows:[["Campanha Clean Home","4 versões","9:16 · 1:1","Automática","Pronto"],["Rotina Produtiva","3 versões","9:16 · 16:9","Revisada","Processando"],["Treino de 15 minutos","6 versões","9:16 · 4:5","Automática","Pronto"],["Casa organizada","2 versões","9:16","Pendente","Rascunho"]] },
  Músicas: { title:"Biblioteca musical", description:"Encontre trilhas licenciadas ou livres de direitos para seus conteúdos.", action:"Importar música", columns:["Faixa","Estilo","Duração","Licença","Uso"], rows:[["Digital Horizon","Eletrônica","02:14","Royalty-free","12 vídeos"],["Morning Routine","Lo-fi","01:48","Uso comercial","8 vídeos"],["Fast Motion","Pop energético","02:31","Royalty-free","21 vídeos"],["Clean Space","Ambient","03:05","Uso comercial","6 vídeos"]] },
  Integrações: { title:"Integrações e canais", description:"Conecte contas autorizadas e acompanhe a sincronização das plataformas.", action:"Conectar canal", columns:["Plataforma","Contas","Publicação","Analytics","Status"], rows:[["TikTok","12 contas","Disponível","Sincronizado","Conectado"],["Instagram Reels","8 contas","Disponível","Sincronizado","Conectado"],["YouTube Shorts","6 canais","Disponível","Sincronizado","Conectado"],["Armazenamento","1 workspace","Upload","—","Conectado"]] },
  Ambientes: { title:"Ambientes de navegação — protótipo", description:"Demonstração visual de perfis isolados. Nenhuma ação automatizada é executada.", action:"Novo ambiente demo", columns:["Ambiente","Sessão","Rede","Identidade do navegador","Status"], rows:[["Perfil US-01","Cookies isolados","Proxy dedicado (demo)","Configuração fixa (demo)","Protótipo"],["Perfil BR-02","Cache isolado","IP corporativo (demo)","Resolução fixa (demo)","Protótipo"],["Importar perfil","Backup local","Não configurada","Dados de sessão (demo)","Disponível"],["Fila de preparação","Login em lote (demo)","Não configurada","Warm-up visual (demo)","Desativado"]] },
  Contas: { title:"Contas conectadas", description:"Organize contas, responsáveis e desempenho individual.", action:"Adicionar conta", columns:["Conta","Dispositivo","Seguidores","Engajamento","Status"], rows:[["@cleanhome.br","Galaxy S21","82,4 mil","12,8%","Ativa"],["@rotinapro.app","iPhone 12","61,7 mil","10,4%","Ativa"],["@fitem15","Redmi Note 11","48,9 mil","9,7%","Publicando"],["@casaorganizada","Galaxy A54","35,1 mil","8,9%","Ativa"]] },
  Conteúdos: { title:"Biblioteca de conteúdos", description:"Revise vídeos, legendas e o estado de cada publicação.", action:"Novo conteúdo", columns:["Conteúdo","Conta","Agendamento","Visualizações","Status"], rows:[["5 dicas para limpar o sofá","@cleanhome.br","Hoje, 18:30","184,2 mil","Publicado"],["Organize sua semana em 3 passos","@rotinapro.app","Hoje, 20:00","—","Agendado"],["Treino rápido de 15 minutos","@fitem15","Amanhã, 09:15","98,4 mil","Publicado"],["Antes e depois da sala","@casaorganizada","Amanhã, 14:00","—","Em revisão"]] },
  Calendário: { title:"Calendário de publicação", description:"Visualize e organize a fila de conteúdo das contas.", action:"Agendar conteúdo", columns:["Data","Horário","Conteúdo","Conta","Status"], rows:[["16 set. 2026","18:30","5 dicas para limpar o sofá","@cleanhome.br","Confirmado"],["16 set. 2026","20:00","Organize sua semana","@rotinapro.app","Confirmado"],["17 set. 2026","09:15","Treino rápido","@fitem15","Aguardando"],["17 set. 2026","14:00","Antes e depois da sala","@casaorganizada","Revisão"]] },
  Desempenho: { title:"Desempenho consolidado", description:"Compare alcance e engajamento entre contas e conteúdos.", action:"Gerar relatório", columns:["Conta","Visualizações","Curtidas","Comentários","Engajamento"], rows:[["@cleanhome.br","184,2 mil","21,4 mil","2.108","12,8%"],["@rotinapro.app","142,7 mil","16,8 mil","1.437","10,4%"],["@fitem15","98,4 mil","10,2 mil","897","9,7%"],["@casaorganizada","76,9 mil","7,8 mil","612","8,9%"]] },
  Ganhos: { title:"Ganhos e atribuição", description:"Acompanhe a receita relacionada a cada conta e campanha.", action:"Exportar financeiro", columns:["Conta","Receita bruta","Conversões","Custo","Resultado"], rows:[["@cleanhome.br","R$ 4.820","143","R$ 680","R$ 4.140"],["@rotinapro.app","R$ 3.760","118","R$ 510","R$ 3.250"],["@fitem15","R$ 2.940","84","R$ 390","R$ 2.550"],["@casaorganizada","R$ 1.880","59","R$ 275","R$ 1.605"]] },
  Relatórios: { title:"Central de relatórios", description:"Consulte os relatórios gerados e exporte os dados da operação.", action:"Criar relatório", columns:["Relatório","Período","Criado em","Formato","Status"], rows:[["Resumo mensal de desempenho","30 dias","16/09/2026","CSV","Pronto"],["Receita por conta","3 meses","15/09/2026","PDF","Pronto"],["Saúde dos dispositivos","7 dias","14/09/2026","CSV","Pronto"],["Calendário editorial","30 dias","12/09/2026","PDF","Pronto"]] },
  Configurações: { title:"Configurações", description:"Gerencie preferências, integrações e dados da operação.", action:"Salvar alterações", columns:["Configuração","Valor atual","Categoria","Última alteração","Status"], rows:[["Fuso horário","América/São_Paulo","Regional","Hoje","Ativo"],["Idioma do painel","Português (Brasil)","Interface","Hoje","Ativo"],["Notificações","E-mail e painel","Alertas","Ontem","Ativo"],["Retenção de dados","12 meses","Privacidade","10/09/2026","Ativo"]] },
  "Central de ajuda": { title:"Central de ajuda", description:"Encontre orientações para configurar e utilizar o TTKFARMPRO.", action:"Abrir chamado", columns:["Assunto","Categoria","Atualizado","Leitura","Status"], rows:[["Como cadastrar um dispositivo","Primeiros passos","Hoje","4 min","Disponível"],["Como vincular uma conta","Contas","Ontem","3 min","Disponível"],["Entendendo os relatórios","Analytics","12/09/2026","6 min","Disponível"],["Configuração de notificações","Configurações","10/09/2026","2 min","Disponível"]] }
};

function downloadRows(name:string, columns:string[], rows:string[][]){
  const blob=new Blob([[columns,...rows].map(row=>row.join(";")).join("\n")],{type:"text/csv;charset=utf-8"});
  const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download=`tk2pharmpro-${name.toLowerCase().replaceAll(" ","-")}.csv`;link.click();URL.revokeObjectURL(url);
}

function ModuleView({module,query,setQuery,created,onAction}:{module:string;query:string;setQuery:(v:string)=>void;created:string[][];onAction:()=>void}){
  const config=moduleConfig[module] ?? moduleConfig.Relatórios;
  const allRows=[...created,...config.rows];
  const rows=allRows.filter(row=>row.join(" ").toLowerCase().includes(query.toLowerCase()));
  return <section className="module-page"><div className="module-heading"><div><span className="eyebrow">TK2PHARMPRO / {module}</span><h2>{config.title}</h2><p>{config.description}</p></div><button className="primary" onClick={onAction}><Plus size={15}/>{config.action.toUpperCase()}</button></div><div className="module-stats"><Mini icon={Activity} value={String(allRows.length)} label="Itens cadastrados"/><Mini icon={TrendingUp} value="+18,2%" label="Variação no período"/><Mini icon={Gauge} value="98,6%" label="Disponibilidade"/></div><article className="panel module-table"><div className="table-header"><div><h2>{config.title}</h2><p>Registros da operação. Novos itens ficam salvos neste navegador.</p></div><div className="table-actions"><label><Search size={15}/><input placeholder="Buscar..." value={query} onChange={e=>setQuery(e.target.value)}/></label><button onClick={()=>downloadRows(module,config.columns,rows)}><Download size={15}/>EXPORTAR</button></div></div><div className="table-scroll"><table><thead><tr>{config.columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{rows.map((row,i)=><tr key={i}>{row.map((cell,j)=><td key={j} className={j===row.length-1?"module-status":""}>{cell}</td>)}</tr>)}</tbody></table>{rows.length===0&&<div className="empty">Nenhum resultado encontrado.</div>}</div></article></section>
}

function DashboardDialog({kind,module,profile,onClose,onProfile,onCreate}:{kind:"content"|"profile"|"period"|"plan";module:string;profile:{name:string;email:string};onClose:()=>void;onProfile:(v:{name:string;email:string})=>void;onCreate:(m:string,r:string[])=>void}){
  const config=moduleConfig[module] ?? moduleConfig.Publicações;
  function submit(e:FormEvent<HTMLFormElement>){e.preventDefault();const form=new FormData(e.currentTarget);
    if(kind==="profile") return onProfile({name:String(form.get("name")),email:String(form.get("email"))});
    if(kind==="period") return onClose();
    const target=module==="Visão geral"?"Publicações":module;const targetConfig=moduleConfig[target]??moduleConfig.Publicações;const title=String(form.get("title"));const detail=String(form.get("detail"));const row=targetConfig.columns.map((_,i)=>i===0?title:i===1?detail:i===targetConfig.columns.length-1?"Novo":"—");onCreate(target,row);
  }
  if(kind==="plan") return <div className="dialog-backdrop" onMouseDown={onClose}><section className="dialog" onMouseDown={e=>e.stopPropagation()}><button className="dialog-close" onClick={onClose}><X/></button><span className="eyebrow">PLANO ATUAL</span><h2>Profissional</h2><p>Você usa 20 de 24 perfis disponíveis. Para alterar capacidade e cobrança, escolha um plano.</p><div className="plan-options"><button onClick={onClose}>INICIAL · R$ 297</button><button className="selected-plan" onClick={onClose}>PROFISSIONAL · R$ 697</button><button onClick={onClose}>AGÊNCIA · R$ 1.497</button></div></section></div>;
  return <div className="dialog-backdrop" onMouseDown={onClose}><section className="dialog" onMouseDown={e=>e.stopPropagation()}><button className="dialog-close" onClick={onClose}><X/></button><span className="eyebrow">{kind==="profile"?"CONTA":kind==="period"?"FILTRO":`TK2PHARMPRO / ${module}`}</span><h2>{kind==="profile"?"Editar perfil":kind==="period"?"Período personalizado":config.action}</h2><form onSubmit={submit}>{kind==="profile"?<><label>Nome<input name="name" defaultValue={profile.name} required/></label><label>E-mail<input name="email" type="email" defaultValue={profile.email} required/></label></>:kind==="period"?<><label>Data inicial<input name="from" type="date" required/></label><label>Data final<input name="to" type="date" required/></label></>:<><label>Nome ou título<input name="title" placeholder="Digite um título" required/></label><label>Conta, destino ou detalhe<input name="detail" placeholder="Ex.: @minhaconta" required/></label></>}<div className="dialog-actions"><button type="button" onClick={onClose}>CANCELAR</button><button className="primary" type="submit">SALVAR</button></div></form></section></div>
}
