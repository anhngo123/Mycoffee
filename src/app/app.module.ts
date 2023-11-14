import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './sharepage/header/header.component';
import { FooterComponent } from './sharepage/footer/footer.component';
import { HomeComponent } from './page/home/home.component';
import { MenuComponent } from './page/menu/menu.component';
import { CartComponent } from './page/cart/cart.component';
import { BlogComponent } from './page/blog/blog.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { MenuDetailComponent } from './page/menu/menu-detail/menu-detail.component';
import { SigninComponent } from './page/signin/signin.component';
import { SignupComponent } from './page/signup/signup.component';
import { ForgotPasswordComponent } from './page/forgot-password/forgot-password.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { NavSidebarComponent } from './admin/nav-sidebar/nav-sidebar.component';
import { IngredientComponent } from './admin/ingredient/ingredient.component';
import { ModItemComponent } from './admin/mod-item/mod-item.component';
import { NotificationComponent } from './admin/notification/notification.component';
import { OrderListComponent } from './admin/order-list/order-list.component';
import { PromotionManagementComponent } from './admin/promotion-management/promotion-management.component';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { RecipeComponent } from './admin/recipe/recipe.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeAgencyComponent } from './page-1/home-agency/home-agency.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgencyComponent } from './admin/agency/agency.component';
import { HeaderAgencyComponent } from './page-1/header-agency/header-agency.component';
import { MenuAgencyComponent } from './page-1/menu-agency/menu-agency.component';
import { NgxPayPalModule } from 'ngx-paypal';

import { BlogAdminComponent } from './admin/blog-admin/blog-admin.component';
import { VoucherPageComponent } from './page/voucher-page/voucher-page.component';
import { ModBlogComponent } from './page-1/admin-agency/mod-blog/mod-blog.component';
import { NavComponent } from './page-1/admin-agency/nav/nav.component';
import { OrderComponent } from './page-1/admin-agency/order/order.component';
import { VoucherComponent } from './page-1/admin-agency/voucher/voucher.component';

import { DashboardAgencyComponent } from './page-1/admin-agency/dashboard-agency/dashboard-agency.component';
import { IngredientAgencyComponent } from './page-1/admin-agency/ingredient-agency/ingredient-agency.component';
import { BlogAgencyComponent } from './page-1/blog-agency/blog-agency.component';
import { VoucherAgencyComponent } from './page-1/voucher-agency/voucher-agency.component';
import { CartAgencyComponent } from './page-1/cart-agency/cart-agency.component';
import { ModAgencyComponent } from './page-1/admin-agency/mod-agency/mod-agency.component';
import { RecipeAgencyComponent } from './page-1/admin-agency/recipe-agency/recipe-agency.component';
import { ShowCouponComponent } from './page/show-coupon/show-coupon.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MenuComponent,
    CartComponent,
    BlogComponent,
    DashboardComponent,
    MenuDetailComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    AdminDashboardComponent,
    NavSidebarComponent,
    IngredientComponent,
    ModItemComponent,
    NotificationComponent,
    OrderListComponent,
    PromotionManagementComponent,
    UserManagementComponent,
    RecipeComponent,
    HomeAgencyComponent,
    AgencyComponent,
    HeaderAgencyComponent,
    MenuAgencyComponent,

    BlogAdminComponent,
    VoucherPageComponent,
    ModBlogComponent,
    NavComponent,
    OrderComponent,
    VoucherComponent,

    DashboardAgencyComponent,
    IngredientAgencyComponent,
    BlogAgencyComponent,
    VoucherAgencyComponent,
    CartAgencyComponent,
    ModAgencyComponent,
    RecipeAgencyComponent,
    ShowCouponComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    FormsModule,
    MatSnackBarModule,
    NgxPaginationModule,
    NgxPayPalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
