import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login=()=>import("../components/pages/login.vue")
const index=()=>import("../components/pages/index.vue")
const manage=()=>import("../components/pages/manage.vue")
const user=()=>import("../components/pages/user.vue")
const managecreate=()=>import("../components/pages/managecreate.vue")
const managelist=()=>import("../components/pages/managelist.vue")
const usercreate=()=>import("../components/pages/usercreate.vue")
const userlist=()=>import("../components/pages/userlist.vue")

const tell=()=>import("../components/pages/tell.vue")
const telllist=()=>import("../components/pages/telllist.vue")
const tellcreate=()=>import("../components/pages/tellcreate.vue")

const device=()=>import("../components/pages/device.vue")
const devicelist=()=>import("../components/pages/devicelist.vue")
const devicecreate=()=>import("../components/pages/devicecreate.vue")

const welcom=()=>import("../components/pages/welcom.vue")

export default new Router({
  routes: [
    {
      path:"/login",
      component:login,
      
    },
    {
      path:"/index",
      component:index,
      children:[
        {
          path:"",
          component:welcom
        },
        {
          path:"manage",
          component:manage,
          children:[
            {
              path:'managelist',
              component:managelist,
              name:"管理员列表"
            },
            {
              path:'managecreate',
              component:managecreate,
              name:"新建/修改管理员"
            },
            
            {
              path:"",
              redirect:"managelist",
              name:"管理员列表"
            }
          ]
        },
        {
          path:"user",
          component:user,
          children:[
            {
              path:"userlist",
              component:userlist,
              name:"用户管理列表"
            },
            {
              path:"usercreate",
              component:usercreate,
              name:"新建/修改用户"
            },
            {
              path:"",
              redirect:"userlist"
            }
          ]

        },
        {
          path:"tell",
          component:tell,
          children:[
            {
              path:"telllist",
              component:telllist,
              name:"通知列表"
            },
            {
              path:"tellcreate",
              component:tellcreate,
              name:"新建/修改用户"
            },
            {
              path:"",
              redirect:"telllist"
            }
          ]
        },
        {
          path:"device",
          component:device,
          children:[
            {
              path:"devicelist",
              component:devicelist,
              name:"设备列表"
            },
            {
              path:"devicecreate",
              component:devicecreate,
              name:"新建/修改设备"
            },
            {
              path:"",
              redirect:"devicelist"
            }
          ]
        }
      ]
    },
    
    {
      path:"*",
      redirect:"/login"
    }

  ]
})
