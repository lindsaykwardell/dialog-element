import "./style.css";
import { Elm } from "./src/Main.elm";

const root = document.querySelector("#app div");
const app = Elm.Main.init({ node: root });

class DialogWrapper extends HTMLElement {
  CloseDialog = new CustomEvent("close");
  dialog;

  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "open":
        let isOpen = newValue === "true";
        if (isOpen) {
          this.dialog.showModal();
        } else {
          this.dialog.close();
        }
    }
  }

  constructor() {
    super();
    const template = document.createElement("template");
    template.innerHTML = `
      <dialog>
        <slot name="content"></slot>
      </dialog>`;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    console.log(this.shadowRoot.innerHTML);

    this.dialog = this.shadowRoot.querySelector("dialog");
  }

  connectedCallback() {
    this.dialog.addEventListener("close", () => {
      this.dispatchEvent(this.CloseDialog);
    });
  }

  disconnectedCallback() {
    this.dialog.removeEventListener("close", () => {
      this.dispatchEvent(this.CloseDialog);
    });
  }
}

window.customElements.define("dialog-wrapper", DialogWrapper);
