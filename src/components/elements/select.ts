import { BaseElement } from '../element';
import { Option } from './option';

export class Select extends BaseElement {
  #title = this.shadowRoot!.querySelector('input')!;
  #button: HTMLDivElement = this.shadowRoot!.querySelector('.menu-button')!;
  #context = this.shadowRoot!.querySelector('ul')!;

  constructor() {
    super();

    const pointerup = (event: PointerEvent) => {
      if((event.target as HTMLElement).tagName !== 'SETTING-SELECT') click();
    };

    const click = () => {
      this.#context.classList.toggle('hidden');
      if(!this.#context.classList.contains('hidden')){
        window.addEventListener('pointerup', pointerup);
        this.#context.style.width = getComputedStyle(this).getPropertyValue('width');
      }
      else{
        window.removeEventListener('pointerup', pointerup);
        this.#context.style.width = '';
      }
    };

    this.#button.addEventListener('click', click);

    this.#context.addEventListener('click', event => {
      if((event.target as Option).tagName === 'SETTING-OPTION' && !(event.target as Option).getSelected()){
        for(const node of this.querySelectorAll<Option>('setting-option[is-selected]')){
          node.setSelected(!node.getSelected());
        }
        (event.target as Option).setSelected(!(event.target as Option).getSelected());
        this.#title.value = (event.target as Option).textContent!;
        this.dispatchEvent(new CustomEvent('selected', {
          bubbles: true,
          composed: true,
          detail: {
            name: (event.target as Option).textContent,
            value: (event.target as Option).getValue(),
          }
        }));
      }
    });
  };

  update(){
    this.#title.value = this.querySelector('setting-option[is-selected]')?.textContent ?? '';
  };

  getTemplate(){
    return /*html*/ `
      <div class='menu-button'>
        <input type='text' readonly placeholder='请选择'>
        <svg viewBox='0 0 16 16'>
          <use xlink:href="/_upper_/resource/icons/arrow_down_small_16.svg#arrow_down_small_16"></use>
        </svg>
      </div>
      <ul class='hidden'>
        <slot></slot>
      </ul>
    `;
  };

  getStyles(){
    return /*css*/ `
      :host {
        display: block;
        width: 100px;
        position: relative;
        color: var(--text_primary);
        font-size: 12px;
      }

      .menu-button {
        height: 24px;
        padding: 0px 8px;
        background-color: transparent;
        border-radius: 4px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border: 1px solid var(--border_dark);
      }

      .menu-button input {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
        color: var(--text_primary);
        flex: 1;
        margin-right: 8px;
        outline: none;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .menu-button svg {
        width: 16px;
        height: 16px;
        color: var(--icon_primary);
      }

      ul {
        position: absolute;
        top: calc(100% + 5px);
        backdrop-filter: blur(8px);
        display: flex;
        flex-direction: column;
        gap: 4px;
        list-style: none;
        background-color: var(--blur_middle_standard);
        border-radius: 4px;
        box-shadow: var(--shadow_bg_middle_secondary);
        padding: 4px;
        max-height: var(--q-contextmenu-max-height);
        overflow-y: auto;
        margin: 0;
        z-index: 999;
        border: var(--border_secondary);
      }
    `;
  };
};