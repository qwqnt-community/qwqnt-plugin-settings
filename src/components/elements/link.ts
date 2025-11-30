import { BaseElement } from '../element';

export class Link extends BaseElement {
  #openExternalBound = this.#openExternal.bind(this);

  connectedCallback(){
    super.connectedCallback();
    this.addEventListener("click", this.#openExternalBound);
  };

  disconnectedCallback(){
    super.disconnectedCallback();
    this.removeEventListener("click", this.#openExternalBound);
  };

  #openExternal(){
    const value = this.getValue()!;
    try {
      new URL(value);
      PluginSettings.renderer.openExternal(value);
    } catch {
      PluginSettings.renderer.openPath(value);
    }

  };

  update(){
    this.textContent ||= this.getValue();
  };

  getTemplate(){
    return /*html*/ `
      <slot></slot>
    `;
  };

  getStyles(){
    return /*css*/ `
      :host {
        color: var(--text_link);
        cursor: pointer;
      }
    `;
  };
};