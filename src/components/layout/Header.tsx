"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { contact, navigation } from "@/data/navigation";

export function Header() {
  const pathname = usePathname();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const isActive = (href: string) => href === "/" ? pathname === "/" : pathname.startsWith(href);

  function closeMenu() {
    dialogRef.current?.close();
  }

  useEffect(() => {
    function openContextMenu(event: MouseEvent) {
      if (event.shiftKey || (event.target instanceof Element && event.target.closest("a, button, input, textarea, select, [contenteditable]"))) return;
      event.preventDefault();
      returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : triggerRef.current;
      dialogRef.current?.showModal();
    }
    document.addEventListener("contextmenu", openContextMenu);
    return () => document.removeEventListener("contextmenu", openContextMenu);
  }, []);

  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header slab">
      <div className="header-top"><Link className="wordmark" href="/">EMMANUEL GEMEGAH</Link><button ref={triggerRef} className="menu-trigger inline-action" aria-haspopup="dialog" aria-controls="site-menu" onClick={() => { returnFocusRef.current = triggerRef.current; dialogRef.current?.showModal(); }}><span aria-hidden="true">☰</span> MENU</button></div>
      <p className="header-positioning">AI AUTOMATION ENGINEER <span aria-hidden="true">·</span> APPLIED AI</p>
      <nav className="primary-nav" aria-label="Main navigation">{navigation.map(item => <Link key={item.href} href={item.href} data-tone={item.tone} aria-current={isActive(item.href) ? "page" : undefined}><span className="nav-swatch" aria-hidden="true" />{item.label}</Link>)}</nav>
    </header>
    <dialog id="site-menu" className="context-menu" ref={dialogRef} onClose={() => returnFocusRef.current?.focus()} onClick={event => { if (event.target === event.currentTarget) closeMenu(); }} onKeyDown={event => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      const links = Array.from(event.currentTarget.querySelectorAll<HTMLAnchorElement>("nav a"));
      const current = links.findIndex(link => link === document.activeElement);
      const next = event.key === "Home" ? 0 : event.key === "End" ? links.length - 1 : current === -1 ? (event.key === "ArrowDown" ? 0 : links.length - 1) : (current + (event.key === "ArrowDown" ? 1 : -1) + links.length) % links.length;
      event.preventDefault(); links[next]?.focus();
    }} aria-labelledby="menu-title">
      <div className="menu-content"><div className="menu-heading"><h2 id="menu-title">NAVIGATION / INDEX</h2><button aria-label="Close menu" onClick={closeMenu}>×</button></div>
        <nav aria-label="Menu navigation">{navigation.map(item => <Link key={item.href} href={item.href} data-tone={item.tone} aria-current={isActive(item.href) ? "page" : undefined} onClick={closeMenu}><span className="nav-swatch" aria-hidden="true" />{item.label}<span className="current-marker" aria-hidden="true">{isActive(item.href) ? "●" : "↗"}</span></Link>)}</nav>
        <a className="menu-email" href={`mailto:${contact.email}`}><span aria-hidden="true">✉</span> Contact via email</a><p className="menu-hint">Shift + right-click for browser menu</p>
      </div>
    </dialog>
  </>;
}
