export {};

const template = document.createElement("template");
// Static template — no user input, safe to use innerHTML
template.innerHTML = `
<style>
  :host {
    display: flex;
    min-height: 100vh;
    min-height: 100svh;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: var(--bg-color);
    color: var(--text-color, white);
    font-family: "Source Sans 3", system-ui, sans-serif;
    padding: clamp(3rem, 1.8rem + 4vw, 5rem) clamp(1.5rem, 0.6rem + 3vw, 3rem);
  }

  article {
    width: min(90%, 48rem);
    margin: 0 auto;
    padding: clamp(1.5rem, 0.6rem + 3vw, 3rem);
    box-shadow: 0.6rem 0.6rem rgba(0, 0, 0, 0.55);
    background-color: var(--card-color);
    border-radius: 2px;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto 1fr;
    gap: 0 1.2rem;
    align-items: start;
  }

  .order {
    font-family: "Merriweather", Georgia, serif;
    font-size: clamp(5rem, 12vw, 10rem);
    font-weight: 800;
    line-height: 0.85;
    grid-row: 1 / -1;
    align-self: center;
    opacity: 0.3;
  }

  h3 {
    font-family: "Merriweather", Georgia, serif;
    font-size: clamp(1.5rem, 1.2rem + 1vw, 2rem);
    font-weight: 700;
    line-height: 1.1;
    letter-spacing: -0.01em;
    margin-bottom: 0.3em;
  }

  h4 {
    font-family: "Merriweather", Georgia, serif;
    font-size: clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem);
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: 0.6em;
  }

  p {
    font-size: clamp(1rem, 0.925rem + 0.25vw, 1.125rem);
    font-weight: 400;
    line-height: 1.5;
    letter-spacing: 0.02em;
    max-width: 55ch;
  }

  /* Focus indicators — WCAG 2.4.12 (AAA) */
  :focus-visible {
    outline: 3px solid #005fcc;
    outline-offset: 2px;
  }

  /* Stack on small screens */
  @media (max-width: 480px) {
    article {
      grid-template-columns: 1fr;
    }

    .order {
      grid-row: auto;
      font-size: 4rem;
      margin-bottom: 0.2em;
    }
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
