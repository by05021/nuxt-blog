import Vue from 'vue'
import { Menu, Dropdown, Icon, message, Row, Col } from 'ant-design-vue';
Vue.use(Menu).use(Dropdown).use(Icon).use(Row).use(Col);
Vue.prototype.$message = message;
