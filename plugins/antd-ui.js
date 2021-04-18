import Vue from 'vue'
import { Menu, Dropdown, Icon, message, Row, Col, BackTop } from 'ant-design-vue';
Vue.use(Menu).use(Dropdown).use(Icon).use(Row).use(Col).use(BackTop);
Vue.prototype.$message = message;
