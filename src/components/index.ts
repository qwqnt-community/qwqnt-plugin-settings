// 导入组件
import { Section } from './elements/section';
import { Panel } from './elements/panel';
import { List } from './elements/list';
import { Item } from './elements/item';
import { Select } from './elements/select';
import { Option } from './elements/option';
import { Switch } from './elements/switch';
import { Button } from './elements/button';
import { Text } from './elements/text';
import { Link } from './elements/link';
import { Divider } from './elements/divider';
import { Modal } from './elements/modal';


/**
 * 组件注册表
 */
const COMPONENTS = [
  { tag: "setting-section", element: Section },
  { tag: "setting-panel", element: Panel },
  { tag: "setting-list", element: List },
  { tag: "setting-item", element: Item },
  { tag: "setting-select", element: Select },
  { tag: "setting-option", element: Option },
  { tag: "setting-switch", element: Switch },
  { tag: "setting-button", element: Button },
  { tag: "setting-text", element: Text },
  { tag: "setting-link", element: Link },
  { tag: "setting-divider", element: Divider },
  { tag: "setting-modal", element: Modal },
];

/**
 * 注册所有自定义元素
 */
COMPONENTS.forEach(({ tag, element }) => {
  if(!customElements.get(tag)) customElements.define(tag, element);
});