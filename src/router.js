import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/personal',
      name: 'personal',
      component: () => import('./views/userinfo/Index.vue'),
      meta: { 
        title: '溯证签 - 个人中心'
      },
      children: [
        {
          path: '/personal',
          name: 'personal',
          component: () => import('./views/userinfo/personal/Personal.vue'),
          meta: { 
            title: '溯证签 - 个人中心',
            requiresAuth: true
          }
        },
        {
          path: '/document',
          name: 'document',
          component: () => import('./views/userinfo/document/Document.vue'),
          meta: { 
            title: '溯证签 - 文件管理',
            requiresAuth: true
          }
        },
        {
          path: '/evidence',
          name: 'evidence',
          component: () => import('./views/userinfo/evidence/Evidence.vue'),
          meta: { 
            title: '溯证签 - 证据保全',
            requiresAuth: true
          }
        },
        {
          path: '/account',
          name: 'account',
          component: () => import('./views/userinfo/account/Account.vue'),
          meta: { 
            title: '溯证签 - 账号管理',
            requiresAuth: true
          },
          children: [
            {
              path: '/account',
              name: 'setting',
              component: () => import('./views/userinfo/account/pages/Setting.vue'),
              meta: { 
                title: '溯证签 - 账号管理-设置',
                requiresAuth: true
              }
            },
            {
              path: '/account/mycombo',
              name: 'mycombo',
              component: () => import('./views/userinfo/account/pages/Mycombo.vue'),
              meta: { 
                title: '溯证签 - 账号管理-我的套餐',
                requiresAuth: true
              }
            },
            {
              path: '/account/mysignature',
              name: 'mysignature',
              component: () => import('./views/userinfo/account/pages/Mysignature.vue'),
              meta: { 
                title: '溯证签 - 账号管理-我的签章',
                requiresAuth: true
              }
            },
            {
              path: '/account/contact',
              name: 'contact',
              component: () => import('./views/userinfo/account/pages/Contact.vue'),
              meta: { 
                title: '溯证签 - 账号管理-联系人',
                requiresAuth: true
              }
            },
            {
              path: '/account/feedback',
              name: 'feedback',
              component: () => import('./views/userinfo/account/pages/Feedback.vue'),
              meta: { 
                title: '溯证签 - 账号管理-问题反馈',
                requiresAuth: true
              }
            }
          ]
        },
        {
          path: '/model',
          name: 'model',
          component: () => import('./views/userinfo/model/Model.vue'),
          meta: { 
            title: '溯证签 - 模板管理',
            requiresAuth: true
          },
          children: [
            {
              path: '/model',
              name: 'modelindex',
              component: () => import('./views/userinfo/model/ModelIndex.vue'),
              meta: { 
                title: '溯证签 - 模板管理',
                requiresAuth: true
              }
            },
            {
              path: '/model/modeldetail',
              name: 'modeldetail',
              component: () => import('./views/userinfo/model/ModelDetail.vue'),
              meta: { 
                title: '溯证签 - 模板管理详情页',
                requiresAuth: true
              }
            },
          ]
        },
        {
          path: '/company',
          name: 'company',
          component: () => import('./views/userinfo/company/Company.vue'),
          meta: { 
            title: '溯证签 - 企业管理',
            requiresAuth: true
          },
        },
        {
          path: '/company/ukey',
          name: 'ukey',
          component: () => import('./views/userinfo/company/Comukey.vue'),
          meta: { 
            title: '溯证签 - 企业盾(Ukey)管理',
            requiresAuth: true
          },
        },
        {
          path: '/company/employee',
          name: 'ukey',
          component: () => import('./views/userinfo/company/Comemployee.vue'),
          meta: { 
            title: '溯证签 - 企业员工授权',
            requiresAuth: true
          },
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Home.vue'),
      meta: { 
        title: '溯证签 - 登录'
      },
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import('./views/auth/Login.vue'),
          meta: { 
            title: '溯证签 - 公平公正权威在线公证平台'
          }
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('./views/auth/Register.vue'),
          meta: { 
            title: '溯证签 - 公平公正权威在线公证平台'
          }
        },
        {
          path: '/reset',
          name: 'reset',
          component: () => import('./views/auth/Reset.vue'),
          meta: { 
            title: '溯证签 - 公平公正权威在线公证平台'
          }
        },
        {
          path: '/verify',
          name: 'verify',
          component: () => import('./views/auth/Verify.vue'),
          meta: { 
            title: '溯证签 - 公平公正权威在线公证平台'
          }
        },
        {
          path: '/openplate',
          name: 'openplate',
          component: () => import('./views/auth/Openplate.vue'),
          meta: { 
            title: '溯证签 - 公平公正权威在线公证平台'
          }
        },
        {
          path: '/index',
          name: 'index',
          component: () => import('./views/infopage/Index.vue'),
          meta: { 
            title: '溯证签 - 公平公正权威在线公证平台'
          },
        },
        {
          path: '/product',
          name: 'product',
          component: () => import('./views/infopage/Product.vue'),
          meta: { 
            title: '溯证签 - 产品服务'
          },
        },
        {
          path: '/solvecase',
          name: 'solvecase',
          component: () => import('./views/infopage/Solvecase.vue'),
          meta: { 
            title: '溯证签 - 解决方案'
          },
        },
        {
          path: '/law',
          name: 'law',
          component: () => import('./views/infopage/Law.vue'),
          meta: { 
            title: '溯证签 - 法律保障'
          },
        },
        {
          path: '/aboutus',
          name: 'aboutus',
          component: () => import('./views/infopage/Aboutus.vue'),
          meta: { 
            title: '溯证签 - 关于我们'
          },
        },
      ]
    },
    {
      path: '/model/contractmodel',
      name: 'contractmodel',
      component: () => import('./views/conmodel/Index.vue'),
      meta: { 
        title: '溯证签 - 合同模板',
        requiresAuth: true
      }
    },
    {
      path: '/model/modelpriview',
      name: 'modelpriview',
      component: () => import('./views/userinfo/model/ModelPriview.vue'),
      meta: { 
        title: '溯证签 - 合同预览',
        requiresAuth: true
      }
    }
  ]
})
