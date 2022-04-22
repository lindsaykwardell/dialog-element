import "./style.css";
import { Elm } from "./src/Main.elm";

const root = document.querySelector("#app div");
const app = Elm.Main.init({ node: root });

class DialogWrapper extends HTMLElement {
  dialog;

  static get observedAttributes() {
    return ["open"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(name, oldValue, newValue);
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
    const slot = document.createElement("slot");
    const dialog = document.createElement("dialog");
    slot.name = "content";
    dialog.appendChild(slot);
    template.appendChild(dialog);

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    console.log(this.shadowRoot.innerHTML)

    this.dialog = this.shadowRoot.querySelector("dialog");
  }
}

window.customElements.define("dialog-wrapper", DialogWrapper);
