export {};

const template = document.createElement("template");
// Static template — no user input, safe to use innerHTML
template.innerHTML = `
<style>
  :host {
    display: flex;
    height: 100vh;
    width: 100%;
    justify-content: center;
    flex-direction: column;
    background-color: var(--bg-color);
    color: var(--text-color, white);
    font-family: inherit;
  }

  article {
    width: 90%;
    margin: 0 auto;
    padding: 2em;
    box-shadow: 1em 1em rgba(0, 0, 0, 0.65);
    background-color: var(--card-color);
  }

  .order {
    font-size: 10rem;
    font-weight: bold;
    float: left;
    line-height: 1em;
    padding-right: 0.2em;
    text-shadow: 0.12em 0.12em rgba(0, 0, 0, 0.65);
  }

  h3 {
    font-size: 2rem;
    font-family: inherit;
  }

  h4 {
    font-size: 1.5rem;
    font-family: inherit;
  }

  p {
    font-size: 1.2rem;
    font-weight: 300;
    font-family: inherit;
  }

  /* Focus indicators — WCAG 2.4.12 (AAA) */
  :focus-visible {
    outline: 3px solid #005fcc;
    outline-offset: 2px;
  }
</style>

<article>
  <span class="order" aria-hidden="true"></span>
  <h3></h3>
  <h4></h4>
  <p></p>
</article>
`;

class PrincipleCard extends HTMLElement {
	static get observedAttributes() {
		return [
			"order",
			"card-title",
			"subtitle",
			"explanation",
			"bg-color",
			"card-color",
			"text-color",
		];
	}

	constructor() {
		super();
		const shadow = this.attachShadow({ mode: "open" });
		shadow.appendChild(template.content.cloneNode(true));
	}

	connectedCallback() {
		this.render();
	}

	attributeChangedCallback() {
		if (this.shadowRoot) {
			this.render();
		}
	}

	private render() {
		const shadow = this.shadowRoot;
		if (!shadow) return;

		const order = shadow.querySelector(".order") as HTMLElement;
		const h3 = shadow.querySelector("h3") as HTMLElement;
		const h4 = shadow.querySelector("h4") as HTMLElement;
		const p = shadow.querySelector("p") as HTMLElement;

		const orderVal = this.getAttribute("order") || "";
		order.textContent = orderVal;
		h3.textContent = this.getAttribute("card-title") || "";
		h4.textContent = this.getAttribute("subtitle") || "";
		p.textContent = this.getAttribute("explanation") || "";

		this.style.setProperty("--bg-color", this.getAttribute("bg-color") || "");
		this.style.setProperty(
			"--card-color",
			this.getAttribute("card-color") || "",
		);
		this.style.setProperty(
			"--text-color",
			this.getAttribute("text-color") || "white",
		);

		// WCAG 4.1.2: Provide accessible name for the region
		this.setAttribute("role", "region");
		this.setAttribute(
			"aria-label",
			`Principle ${orderVal}: ${this.getAttribute("card-title") || ""}`,
		);
	}
}

customElements.define("principle-card", PrincipleCard);
