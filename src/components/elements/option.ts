import { BaseElement } from '../element';

export class Option extends BaseElement {
  getTemplate(){
    return /*html*/ `
      <li>
        <span>
          <slot></slot>
        </span>
        <svg viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M2 7L6.00001 11L14 3' stroke='currentColor' stroke-linejoin='round'></path>
        </svg>
      </li>
    `;
  };

  getStyles(){
    return /*css*/ `
      :host {
        display: block;
      }

      :host([is-selected]) li {
        background-color: var(--overlay_active);
      }

      :host([is-selected]) svg {
        display: block;
      }

      li {
        display: flex;
        justify-content: space-between;
        border-radius: 4px;
        padding: 0px 8px;
        line-height: 24px;
        color: var(--text_primary);
        font-size: 12px;
        padding: 0px 8px;
        cursor: pointer;
      }
      li:hover {
        background-color: var(--overlay_hover);
      }
      li:active {
        background-color: var(--overlay_pressed);
      }

      span {
        margin-right: 8px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      svg {
        flex-shrink: 0;
        display: none;
        width: 1em;
        height: 1em;
        color: var(--icon_primary);
        margin: 7px -4px 0px 0px;
      }
    `;
  };
};