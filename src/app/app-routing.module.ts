import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { CartComponent } from './page/cart/cart.component';
import { MenuComponent } from './page/menu/menu.component';
import { MenuDetailComponent } from './page/menu/menu-detail/menu-detail.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { BlogComponent } from './page/blog/blog.component';
import { SigninComponent } from './page/signin/signin.component';
import { SignupComponent } from './page/signup/signup.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NavSidebarComponent } from './admin/nav-sidebar/nav-sidebar.component';
import { RecipeComponent } from './admin/recipe/recipe.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PromotionManagementComponent } from './admin/promotion-management/promotion-management.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { NotificationComponent } from './admin/notification/notification.component';
import { ModItemComponent } from './admin/mod-item/mod-item.component';
import { IngredientComponent } from './admin/ingredient/ingredient.component';
import { AgencyComponent } from './admin/agency/agency.component';
import { HomeAgencyComponent } from './page-1/home-agency/home-agency.component';
import { HeaderAgencyComponent } from './page-1/header-agency/header-agency.component';
import { MenuAgencyComponent } from './page-1/menu-agency/menu-agency.component';
import { BlogAdminComponent } from './admin/blog-admin/blog-admin.component';
import { VoucherPageComponent } from './page/voucher-page/voucher-page.component';



import { DashboardAgencyComponent } from './page-1/admin-agency/dashboard-agency/dashboard-agency.component';
import { IngredientAgencyComponent } from './page-1/admin-agency/ingredient-agency/ingredient-agency.component';
import { ModAgencyComponent } from './page-1/admin-agency/mod-agency/mod-agency.component';
import { ModBlogComponent } from './page-1/admin-agency/mod-blog/mod-blog.component';
import { NavComponent } from './page-1/admin-agency/nav/nav.component';
import { OrderComponent } from './page-1/admin-agency/order/order.component';
import { VoucherComponent } from './page-1/admin-agency/voucher/voucher.component';
import { BlogAgencyComponent } from './page-1/blog-agency/blog-agency.component';
import { VoucherAgencyComponent } from './page-1/voucher-agency/voucher-agency.component';
import { CartAgencyComponent } from './page-1/cart-agency/cart-agency.component';
import { RecipeAgencyComponent } from './page-1/admin-agency/recipe-agency/recipe-agency.component';
import { ShowCouponComponent } from './page/show-coupon/show-coupon.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  {path: 'blog', component:BlogComponent},
  {path:'menu',component:MenuComponent},
  {path:'detail/:id',component:MenuDetailComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'cart',component:CartComponent},
  {path:'signin',component:SigninComponent},
  {path:'signup',component:SignupComponent},
  {path:'forgot',component:ForgotPasswordComponent},
  {path:'admin',component:AdminDashboardComponent},
  {path:'recipe',component:RecipeComponent},
  {path:'mod-item',component:ModItemComponent},
  {path:'notification',component:NotificationComponent},
  {path:'ingredient',component:IngredientComponent},
  {path:'order',component:OrderListComponent},
  {path:'promotion',component:PromotionManagementComponent},
  {path:'user-management',component:UserManagementComponent},
  {path:'agency',component:AgencyComponent},
  {path:'store',component:HomeAgencyComponent},
  {path:'header-store',component:HeaderAgencyComponent},
  {path:'menu-agency',component:MenuAgencyComponent},

  {path:'admin-blog',component:BlogAdminComponent},
  {path:'voucher-page',component:VoucherPageComponent},
  {path:'admin-agency',component:DashboardAgencyComponent},
  {path:'ingredient-agency',component:IngredientAgencyComponent},
  {path:'mod-agency',component:ModAgencyComponent},
  {path:'mod-blog',component:ModBlogComponent},
  {path:'nav',component:NavComponent},
  {path:'order-agency',component:OrderComponent},
  {path:'voucher-admin',component:VoucherComponent},
  {path:'voucher-agency',component:VoucherAgencyComponent},
  {path:'blog-agency',component:BlogAgencyComponent},
  {path:'cart-agency',component:CartAgencyComponent},
  {path:'recipe-agency',component:RecipeAgencyComponent},
  {path:'show-coupon',component:ShowCouponComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
