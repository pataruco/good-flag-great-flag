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

  /* Mobile-first (320px+) */
  header {
    position: fixed;
    top: 0;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.97);
    box-shadow: 0.5em 0.5em rgba(0, 0, 0, 0.65);
    text-align: center;
    z-index: 1;
  }

  nav {
    text-align: center;
  }

  ul {
    /* Popover resets */
    border: none;
    padding: 0;
    margin: 0;

    list-style: none;
    background-color: rgba(255, 255, 255, 0.97);
    box-shadow: 0.5em 0.5em rgba(0, 0, 0, 0.65);

    /* Position below header */
    position: fixed;
    top: 3.5rem;
    left: 0;
    width: 100%;
  }

  li {
    display: block;
    margin-top: 0.2rem;
  }

  /* WCAG 2.5.5 Target Size Enhanced (AAA): min 44px */
  li a {
    font-size: 1.2rem;
    display: block;
    min-height: 44px;
    line-height: 44px;
  }

  a {
    color: #3b3b3b;
    padding: 0 0.6em;
    vertical-align: middle;
    text-decoration: none;
    font-family: inherit;
  }

  a:hover {
    text-decoration: underline;
  }

  .menu-icon {
    color: #3b3b3b;
    font-size: 3rem;
    display: block;
    text-align: right;
    padding: 0 0.3em;
    background: none;
    border: none;
    cursor: pointer;
    font-family: inherit;
    min-width: 44px;
    min-height: 44px;
  }

  /* Desktop (769px+) */
  @media (min-width: 769px) {
    header {
      text-align: initial;
    }

    nav {
      position: fixed;
      top: 0;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.97);
      box-shadow: 0.5em 0.5em rgba(0, 0, 0, 0.65);
    }

    /* On desktop, always show nav inline — override popover display:none */
    ul {
      display: block;
      position: static;
      text-align: right;
      margin-right: 1.2em;
      background: none;
      box-shadow: none;
    }

    li {
      display: inline-block;
      margin-top: 0;
    }

    li a {
      display: inline-block;
      min-height: 44px;
      line-height: 44px;
    }

    .menu-icon {
      display: none;
    }
  }
</style>

<a href="#main-content" class="skip-link">Skip to main content</a>
<header>
  <button
    class="menu-icon"
    aria-label="Toggle navigation"
    type="button"
    popovertarget="nav-list"
  >&#9776;</button>
  <nav aria-label="Main navigation">
    <ul id="nav-list" popover="auto" role="list">
      <li><a href="./index.html">Good Flag | Bad Flag</a></li>
      <li><a href="./quiz.html">Quiz</a></li>
      <li><a href="./watch.html">Watch &amp; Listen</a></li>
      <li><a href="./about.html">Credits &amp; About</a></li>
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
