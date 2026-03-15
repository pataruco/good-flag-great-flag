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
    color: white;
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

  h1 {
    font-size: 2rem;
    line-height: 0;
    font-family: inherit;
  }

  h2 {
    font-size: 1.5rem;
    font-family: inherit;
  }

  p {
    font-size: 1.2rem;
    font-weight: 300;
    font-family: inherit;
  }
</style>

<article>
  <span class="order"></span>
  <h1></h1>
  <h2></h2>
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
		const h1 = shadow.querySelector("h1") as HTMLElement;
		const h2 = shadow.querySelector("h2") as HTMLElement;
		const p = shadow.querySelector("p") as HTMLElement;

		order.textContent = this.getAttribute("order") || "";
		h1.textContent = this.getAttribute("card-title") || "";
		h2.textContent = this.getAttribute("subtitle") || "";
		p.textContent = this.getAttribute("explanation") || "";

		this.style.setProperty("--bg-color", this.getAttribute("bg-color") || "");
		this.style.setProperty(
			"--card-color",
			this.getAttribute("card-color") || "",
		);
	}
}

customElements.define("principle-card", PrincipleCard);
