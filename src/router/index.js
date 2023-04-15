import VueRouter from "vue-router";

import Login from '../pages/Login.vue'

import UserRegister from '../pages/UserRegister.vue'

import SystemLoginInterface from '../pages/SystemLoginInterface.vue'

import UserMainInterface from '../pages/UserMainInterface.vue'

import UserFirstPage from '../UserComponents/UserFirstPage.vue'

import PersonalInfo from '../UserPages/PersonalInfo.vue'

import TicketPurchase from '../UserPages/TicketPurchase.vue'

import TicketInfo from '../UserPages/TicketInfo.vue'

import PassengerInfo from '../UserPages/PassengerInfo.vue'

import ManagerMainInterface from '../pages/ManagerMainInterface.vue'

import ManagerFirstPage from '../ManagerComponents/ManagerFirstPage.vue'

import StationManagement from '../ManagerPages/StationManagement'

import TrainManagement from '../ManagerPages/TrainManagement'

import TrainTypeMessage from '@/ManagerPages/TrainTypeMessage.vue'


export default new VueRouter({
    routes: [
        {
            path: '/systemLoginInterface',
            component: SystemLoginInterface,
            // children: [
            //     {
            //         name: 'denglu',
            //         path: 'login',
            //         component: Login
            //     },
            //     {
            //         name: 'zhuce',
            //         path: 'userRegister',
            //         component: UserRegister
            //     }
            // ]
        },
        {
            path: '/',
            component: SystemLoginInterface,
            redirect: 'login',
            children: [
                {
                    name: 'denglu',
                    path: 'login',
                    component: Login
                },
                {
                    name: 'zhuce',
                    path: 'userRegister',
                    component: UserRegister
                }
            ]
        },
        {
            path: '/userMainInterface',
            component: UserMainInterface,
            children: [
                {
                    name: '首页',
                    path: 'userFirstPage',
                    component: UserFirstPage
                },
                {
                    name: '个人中心',
                    path: 'personalInfo',
                    component: PersonalInfo
                },
                {
                    name: '车票查询和购买',
                    path: 'ticketPurchase',
                    component: TicketPurchase
                },
                {
                    name: '订单信息',
                    path: 'ticketInfo',
                    component: TicketInfo
                },
                {
                    name: '乘车人信息',
                    path: 'passengerInfo',
                    component: PassengerInfo
                }
            ]
        },
        {
            path: '/managerMainInterface',
            component: ManagerMainInterface,
            children: [
                {
                    name: '管理员首页',
                    path: 'managerFirstPage',
                    component: ManagerFirstPage
                },
                {
                    name: '车站信息',
                    path: 'stationManagement',
                    component: StationManagement
                },
                {
                    name: '车次管理',
                    path: 'trainmanagement',
                    component: TrainManagement
                },
                {
                    name: '列车座位管理',
                    path: 'seatTypeManagement',
                    component: () => import('../ManagerPages/SeatTypeManagement.vue')
                },
                {
                    name: '动车类型',
                    path: 'traintypemessage',
                    component: TrainTypeMessage
                },
            ]
        }
    ]
})