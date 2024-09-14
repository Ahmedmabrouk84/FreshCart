import { Routes } from '@angular/router';
import { authGuard } from './core/Guard/auth.guard';
import { logedGuard } from './core/Guard/loged.guard';
import { HomeComponent } from './components/home/home.component';
import { ProductComponent } from './components/product/product.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  // Auth Layout with lazy-loaded routes
  {
    path: '',loadComponent: () =>
      import('./layouts/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    canActivate: [logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full', title: 'Login' },
      {
        path: 'login',component:LoginComponent,
        title: 'Login',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./components/register/register.component').then((m) => m.RegisterComponent),
        title: 'Register',
      },
      {
        path: 'forgot',
        loadComponent: () =>
          import('./components/forgot-password/forgot-password.component').then((m) => m.ForgotPasswordComponent),
        title: 'Forgot Password',
      },
    ],
  },
  
  // Blank Layout with lazy-loaded routes
  {
    path: '',
    loadComponent: () =>
      import('./layouts/blank-layout/blank-layout.component').then((m) => m.BlankLayoutComponent),
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',component:HomeComponent,title: 'Home',
      },
      {
        path: 'products',component:ProductComponent,title: 'Products',
      },
      {
        path: 'categories',loadComponent: () =>
          import('./components/categories/categories.component').then((m) => m.CategoriesComponent),
        title: 'Categories',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./components/details/details.component').then((m) => m.DetailsComponent),
        title: 'Details',
      },
      {
        path: 'cart',loadComponent: () =>
          import('./components/cart/cart.component').then((m) => m.CartComponent),
        title: 'Cart',
      },
      {
        path: 'brands',loadComponent: () =>
          import('./components/brands/brands.component').then((m) => m.BrandsComponent),
        title: 'Brands',
      },
      {
        path: 'orders/:id',
        loadComponent: () => import('./components/orders/orders.component').then((m) => m.OrdersComponent),
        title: 'Orders',
      },
      {
        path: 'allorders',loadComponent: () =>
          import('./components/all-orders/all-orders.component').then((m) => m.AllOrdersComponent),
        title: 'All Orders',
      },
      {
        path: 'wishlist',loadComponent: () =>
          import('./components/wish-list/wish-list.component').then((m) => m.WishListComponent),
        title: 'wishlist',
      },
    ],
  },

  // Not Found route
  {
    path: '**',
    loadComponent: () => import ('./components/not-founded/not-founded.component').then((m) => m.NotFoundedComponent),
  },
];
