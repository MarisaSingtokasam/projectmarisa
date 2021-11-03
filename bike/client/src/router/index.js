import Vue from 'vue'
import Router from 'vue-router'

// Admin

import AdminCreate from '@/components/Admin/CreateBlog'
import AdminEdit from '@/components/Admin/EditBlog'

// Upload Testing
import Upload from '@/components/Utils/Upload'

// Front
import FrontIndex from '@/components/Fronts/Index'
import FrontInventory from '@/components/Fronts/Inventory'
import FrontShow from '@/components/Fronts/ShowBlog'

// Borrow
import BorrowCreate from '@/components/Fronts/Borrow'
import BorrowStatus from '@/components/Fronts/Status'
import ShowStatus from '@/components/Fronts/ShowStatus'
import EditBorrow from '@/components/Fronts/EditBorrow'
import BorrowProfile from '@/components/Fronts/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [    
    
    // blogs
    
    {
      path: '/blog/create',
      name: 'blogs-create',
      component: AdminCreate
    },
    {
      path: '/blog/edit/:blogId',
      name: 'blog-edit',
      component: AdminEdit
    },
    
    
    
    
    // upload testing
    {
      path: '/upload',
      name: 'upload',
      component: Upload
    },
    // front
    {
      path: '/home',
      name: 'front',
      component: FrontIndex
    },
    {
      path: '/home/read/:blogId',
      name: 'front-read',
      component: FrontShow
    },
    {
      path: '/inventory',
      name: 'inventory',
      component: FrontInventory
    },
    {
      path: '/borrow/create',
      name: 'borrow-create',
      component: BorrowCreate
    },
    {
      path: '/borrow/status',
      name: 'borrow-status',
      component: BorrowStatus
    },
    {
      path: '/borrow/status/detail/:borrowId',
      name: 'show-status',
      component: ShowStatus
    },
    {
      path: '/borrow/edit/:borrowId',
      name: 'borrow-edit',
      component: EditBorrow
    },
    {
      path: '/borrow/profile/:userId',
      name: 'borrow-profile',
      component: BorrowProfile
    },
  ]
})
