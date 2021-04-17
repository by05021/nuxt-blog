import Vue from 'vue'
import { Menu, Dropdown, Icon, message } from 'ant-design-vue';
Vue.use(Menu).use(Dropdown).use(Icon);
Vue.prototype.$message = message;
