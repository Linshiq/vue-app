import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import Qurey from './views/nav1/Qurey.vue'
import user from './views/nav1/user.vue'
// bill 导航
import Upload from './views/bill/Upload.vue'
import BillDetails from './views/bill/BillDetails.vue'
import Review from './views/bill/Review.vue'

import Page4 from './views/nav2/Page4.vue'
import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
	
    {
        path: '/',
        component: Home,
        name: '导航一',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页', hidden: true },
            { path: '/table', component: Table, name: 'Table' },
            { path: '/form', component: Form, name: 'Form' },
            { path: '/user', component: user, name: '列表' },
			{ path: '/upload', component: Upload, name: '上传' },
			{ path: '/Qurey', component: Qurey, name: 'Qurey' },
			{ path: '/BillDetails', component: BillDetails, name: '账单明细' },
        ]
    },{
	    path: '/',
	    component: Home,
	    name: '账单信息',
	    iconCls: 'el-icon-message',//图标样式class
	    children: [
			{ path: '/upload', component: Upload, name: '上传' },
			{ path: '/BillDetails', component: BillDetails, name: '账单明细' },
			{ path: '/Review', component: Review, name: '审核' },
	    ]
	},
    {
        path: '/',
        component: Home,
        name: '导航二',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/page4', component: Page4, name: '页面4' },
            { path: '/page5', component: Page5, name: '页面5' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: 'echarts' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;