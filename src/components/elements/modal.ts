import { BaseElement } from '../element';

export class Modal extends BaseElement {
  #title = this.shadowRoot!.querySelector('.title')!;
  #close = this.shadowRoot!.querySelector('.close')!;
  #modal = this.shadowRoot!.querySelector('.modal')!;
  #toggleActiveBound = this.#toggleActive.bind(this);

  #toggleActive(){
    this.setActive(!this.getActive());
  };

  connectedCallback(){
    super.connectedCallback();
    this.#close.addEventListener("click", this.#toggleActiveBound);
    this.#modal.addEventListener("click", this.#toggleActiveBound);
  };

  disconnectedCallback(){
    super.disconnectedCallback();
    this.#close.removeEventListener("click", this.#toggleActiveBound);
    this.#modal.removeEventListener("click", this.#toggleActiveBound);
  };

  getTemplate(){
    return /*html*/ `
      <div class='modal'></div>
      <div class='main'>
        <div class='header'>
          <div class='title'></div>
          <svg class='close' viewBox='0 0 24 24'>
            <use xlink:href='/_upper_/resource/icons/close_24.svg#close_24'></use>
          </svg>
        </div>
        <div class='body'>
          <slot></slot>
        </div>
      </div>
    `;
  };

  getStyles(){
    return /*css*/ `
      :host {
        display: none;
      }

      :host([is-active]) {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        inset: 0;
        z-index: 5000;
        animation: fadeIn .2s ease;
      }

      .modal {
        position: fixed;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.5);
        animation: fadeIn .2s ease;
      }

      .main {
        width: 480px;
        position: relative;
        background-color: var(--bg_top_light);
        box-shadow: var(--shadow_bg_middle_primary);
        border: var(--border_primary);
        border-radius: 8px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        z-index: 1;
        animation: slideDown .3s cubic-bezier(.38, 0, .24, 1);
      }

      .header {
        height: 28px;
        border-bottom: 1px solid rgba(255, 255, 255, .06);
        position: relative;
        flex-shrink: 0;
        background-color: var(--bg_bottom_standard);
      }

      .title {
        font-size: 12px;
        line-height: 28px;
        text-align: center;
      }

      .close {
        width: 16px;
        height: 16px;
        position: absolute;
        right: 4px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--icon-primary);
        cursor: pointer;
      }

      .body {
        background-color: var(--bg_bottom_standard);
        padding: 20px;
        flex: 1;
        overflow-y: auto;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes slideDown {
        from {
          opacity: 0;
          transform: translateY(-50px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
  };

  update(){
    this.#title.textContent = this.getTitle();
  };
};