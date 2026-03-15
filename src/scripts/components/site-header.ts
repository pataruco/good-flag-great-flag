export {};

const template = document.createElement("template");
// Static template — no user input, safe to use innerHTML
template.innerHTML = `
<style>
  :host {
    display: block;
  }

  .skip-link {
    position: absolute;
    top: -100%;
    left: 0;
    padding: 0.5em 1em;
    background: #000;
    color: #fff;
    z-index: 100;
    text-decoration: none;
    font-family: inherit;
  }

  .skip-link:focus {
    top: 0;
    outline: 3px solid #005fcc;
    outline-offset: 2px;
  }

  /* Focus indicators — WCAG 2.4.12 (AAA) */
  :focus-visible {
    outline: 3px solid #005fcc;
    outline-offset: 2px;
  }

  /* Mobile-first */
  header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 rgba(0, 0, 0, 0.08);
    text-align: center;
    z-index: 10;
    transition: box-shadow 300ms ease;
  }

  nav {
    text-align: center;
  }

  ul {
    /* Popover resets */
    border: none;
    padding: 0.5rem 0;
    margin: 0;

    list-style: none;
    background-color: rgba(255, 255, 255, 0.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    position: fixed;
    top: 3.2rem;
    left: 0;
    width: 100%;
  }

  li {
    display: block;
  }

  /* WCAG 2.5.5 Target Size Enhanced (AAA): min 44px */
  li a {
    font-size: 1.25em;
    font-weight: 500;
    display: block;
    min-height: 44px;
    line-height: 44px;
    transition: background-color 150ms ease, color 150ms ease;
    position: relative;
  }

  li a:hover {
    background-color: rgba(0, 0, 0, 0.04);
    text-decoration: none;
  }

  a {
    color: #1a1a1a;
    padding: 0 0.8em;
    vertical-align: middle;
    text-decoration: none;
    font-family: "Source Sans 3", system-ui, sans-serif;
    letter-spacing: 0.01em;
  }

  a:hover {
    text-decoration: none;
  }

  .brand {
    font-family: "Merriweather", Georgia, serif;
    font-weight: 800;
    font-size: 1rem;
    letter-spacing: -0.02em;
    color: #1a1a1a;
    padding: 0 0.8em;
    display: none;
    min-height: 44px;
    line-height: 44px;
  }

  .menu-icon {
    color: #1a1a1a;
    font-size: 1.6rem;
    display: block;
    text-align: right;
    padding: 0.4em 0.6em;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    min-width: 44px;
    min-height: 44px;
    transition: opacity 150ms ease;
  }

  .menu-icon:hover {
    opacity: 0.6;
  }

  /* Desktop (769px+) */
  @media (min-width: 769px) {
    header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: initial;
    }

    .brand {
      display: block;
    }

    nav {
      position: static;
      width: auto;
      background: none;
      box-shadow: none;
    }

    /* On desktop, always show nav inline — override popover display:none */
    ul {
      display: flex;
      position: static;
      text-align: right;
      margin-right: 0.8em;
      background: none;
      box-shadow: none;
      backdrop-filter: none;
      padding: 0;
      gap: 0.2rem;
    }

    li {
      display: inline-block;
    }

    li a {
      display: inline-flex;
      align-items: center;
      font-size: 1em;
      min-height: 44px;
      border-radius: 2px;
      padding: 0 0.8em;
    }

    .menu-icon {
      display: none;
    }
  }
</style>

<a href="#main-content" class="skip-link">Skip to main content</a>
<header>
  <a href="./index.html" class="brand" aria-label="Good Flag Great Flag — Home">Good Flag | Great Flag</a>
  <button
    class="menu-icon"
    aria-label="Toggle navigation"
    type="button"
    popovertarget="nav-list"
  >&#9776;</button>
  <nav aria-label="Main navigation">
    <ul id="nav-list" popover="auto" role="list">
      <li><a href="./index.html">Home</a></li>
      <li><a href="./quiz.html">Quiz</a></li>
      <li><a href="./watch.html">Watch & Listen</a></li>
      <li><a href="./about.html">About</a></li>
    </ul>
  </nav>
</header>
`;

class SiteHeader extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		shadow.appendChild(template.content.cloneNode(true));
	}
}

customElements.define("site-header", SiteHeader);
