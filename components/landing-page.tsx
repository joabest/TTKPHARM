"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, BarChart3, CalendarClock, Check, ChevronDown, Menu, MonitorSmartphone, Play, ShieldCheck, Wand2, X } from "lucide-react";
import { Logo } from "./logo";
import styles from "./landing.module.css";

const features = [
  { icon: CalendarClock, title: "Publicação multicanal", text: "Organize calendários e conteúdos de TikTok, Instagram Reels e YouTube Shorts em uma única fila." },
  { icon: Wand2, title: "Editor de variações", text: "Prepare formatos, cortes, legendas, cores e overlays diferentes sem sair da plataforma." },
  { icon: MonitorSmartphone, title: "Perfis e dispositivos", text: "Acompanhe contas, sessões autorizadas e a saúde dos aparelhos em uma visão operacional." },
  { icon: BarChart3, title: "Analytics que orienta", text: "Compare alcance, engajamento, receita e conteúdos com melhor desempenho por período." },
];

const plans = [
  { name: "Inicial", price: "297", description: "Para começar a organizar sua operação.", items: ["Até 5 perfis", "Calendário editorial", "Analytics essenciais", "Publicação multicanal"] },
  { name: "Profissional", price: "697", description: "Para operações que precisam crescer.", popular: true, items: ["Até 24 perfis", "Editor de variações", "Relatórios completos", "Suporte prioritário"] },
  { name: "Agência", price: "1.497", description: "Para times e múltiplos projetos.", items: ["Até 60 perfis", "Múltiplos usuários", "Exportações avançadas", "Onboarding dedicado"] },
];

const faqs = [
  ["O TK2PHARMPRO publica em quais plataformas?", "O painel foi desenhado para centralizar fluxos de TikTok, Instagram Reels e YouTube Shorts."],
  ["Preciso instalar alguma coisa?", "A gestão acontece pelo navegador. Integrações com plataformas e dispositivos dependem da configuração de cada conta."],
  ["Posso cancelar quando quiser?", "Sim. Os planos são mensais e podem ser alterados ou cancelados antes da próxima renovação."],
  ["Meus dados ficam separados?", "O produto organiza perfis, sessões e permissões de forma independente para facilitar a operação e o controle de acesso."],
];

export default function LandingPage() {
  const [menu, setMenu] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  return <main className={styles.site}>
    <header className={styles.header}>
      <Link href="/" className={styles.brand}><Logo /></Link>
      <nav className={menu ? styles.navOpen : styles.nav} aria-label="Navegação principal">
        <a href="#recursos" onClick={()=>setMenu(false)}>RECURSOS</a><a href="#processo" onClick={()=>setMenu(false)}>COMO FUNCIONA</a><a href="#precos" onClick={()=>setMenu(false)}>PREÇOS</a><a href="#faq" onClick={()=>setMenu(false)}>DÚVIDAS</a>
        <Link href="/admin" className={styles.navCta}>ABRIR PAINEL <ArrowRight size={15}/></Link>
      </nav>
      <button className={styles.menuButton} onClick={()=>setMenu(!menu)} aria-label="Abrir menu">{menu ? <X/> : <Menu/>}</button>
    </header>

    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <span className={styles.kicker}><i/> CONTEÚDO EM ESCALA. CONTROLE EM UM SÓ LUGAR.</span>
        <h1>Transforme sua operação de vídeos curtos.</h1>
        <p>Planeje, adapte, publique e acompanhe conteúdos para TikTok, Reels e Shorts com uma central feita para equipes que querem crescer.</p>
        <div className={styles.heroActions}><a href="#precos" className={styles.primary}>CONHECER PLANOS <ArrowRight size={17}/></a><Link href="/admin" className={styles.secondary}><Play size={16}/> VER O PAINEL</Link></div>
        <div className={styles.trust}><span><Check/> Sem fidelidade</span><span><Check/> Configuração guiada</span><span><Check/> Dados exportáveis</span></div>
      </div>
      <div className={styles.productCard}>
        <div className={styles.cardTop}><span>VISÃO DA OPERAÇÃO</span><span className={styles.live}><i/> AO VIVO</span></div>
        <strong>4,9 mi</strong><small>VISUALIZAÇÕES CONSOLIDADAS</small>
        <div className={styles.chart}>{[25,32,30,43,48,54,51,68,63,75,82,96].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div>
        <div className={styles.metrics}><div><b>10,4%</b><span>ENGAJAMENTO</span></div><div><b>R$ 112 mil</b><span>RECEITA</span></div><div><b>1.142</b><span>PUBLICAÇÕES</span></div></div>
      </div>
    </section>

    <section className={styles.strip}><span>PLANEJAR</span><i/> <span>ADAPTAR</span><i/> <span>PUBLICAR</span><i/> <span>ANALISAR</span></section>

    <section id="recursos" className={styles.section}>
      <div className={styles.sectionHead}><span>01 — A PLATAFORMA</span><h2>Tudo que sua operação precisa para sair do improviso.</h2><p>Menos abas, planilhas e processos soltos. Mais clareza para decidir o próximo conteúdo.</p></div>
      <div className={styles.featureGrid}>{features.map(({icon:Icon,title,text},i)=><article key={title}><span>0{i+1}</span><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div>
    </section>

    <section id="processo" className={styles.process}>
      <div><span>02 — COMO FUNCIONA</span><h2>Da ideia ao relatório em três etapas.</h2></div>
      <ol><li><b>01</b><div><h3>Conecte e organize</h3><p>Cadastre seus canais, perfis, dispositivos e responsáveis.</p></div></li><li><b>02</b><div><h3>Produza e programe</h3><p>Prepare variações e distribua o calendário entre as plataformas.</p></div></li><li><b>03</b><div><h3>Meça e melhore</h3><p>Compare resultados e replique o que realmente performa.</p></div></li></ol>
    </section>

    <section id="precos" className={styles.section}>
      <div className={styles.sectionHead}><span>03 — PLANOS</span><h2>Escolha o tamanho da sua operação.</h2><p>Comece agora e aumente a capacidade quando precisar.</p></div>
      <div className={styles.pricing}>{plans.map(plan=><article key={plan.name} className={plan.popular ? styles.popular : ""}>{plan.popular&&<em>MAIS ESCOLHIDO</em>}<h3>{plan.name}</h3><p>{plan.description}</p><div className={styles.price}><span>R$</span><b>{plan.price}</b><small>/mês</small></div><a href="mailto:contato@tk2pharmpro.com?subject=Quero conhecer o plano TK2PHARMPRO">COMEÇAR AGORA <ArrowRight size={16}/></a><ul>{plan.items.map(item=><li key={item}><Check size={15}/>{item}</li>)}</ul></article>)}</div>
    </section>

    <section id="faq" className={styles.faq}><div><span>04 — PERGUNTAS</span><h2>O que você precisa saber.</h2><p>Ainda ficou alguma dúvida? Fale com nosso time.</p><a href="mailto:contato@tk2pharmpro.com">FALAR COM ESPECIALISTA <ArrowRight size={15}/></a></div><div>{faqs.map(([q,a],i)=><article key={q}><button onClick={()=>setOpenFaq(openFaq===i?null:i)}><span>{q}</span><ChevronDown className={openFaq===i?styles.rotate:""}/></button>{openFaq===i&&<p>{a}</p>}</article>)}</div></section>

    <section className={styles.cta}><Logo/><h2>Pronto para operar com mais controle?</h2><p>Conheça o painel e veja como centralizar sua rotina de vídeos curtos.</p><Link href="/admin">ABRIR PAINEL DEMONSTRATIVO <ArrowRight/></Link></section>
    <footer className={styles.footer}><Logo compact/><p>© 2026 TK2PHARMPRO. TODOS OS DIREITOS RESERVADOS.</p><div><a href="#recursos">RECURSOS</a><a href="#precos">PREÇOS</a><a href="mailto:contato@tk2pharmpro.com">CONTATO</a></div></footer>
  </main>;
}
