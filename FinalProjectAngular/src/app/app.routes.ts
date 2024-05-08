import { Routes } from '@angular/router';
import { BookComponent } from './components/book/book.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { OrderComponent } from './components/order/order.component';
import { LoginComponent } from './components/login/login.component';
import { CrudBookComponent } from './components/crud-book/crud-book.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';
import { BooksOrderedComponent } from './components/books-ordered/books-ordered.component';
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { ViewbookComponent } from './components/viewbook/viewbook.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdateOrderStatusComponent } from './components/update-order-status/update-order-status.component';
import { LessStockDisplayComponent } from './components/less-stock-display/less-stock-display.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { userGuard } from './guards/user.guard';
import { SubscriptionsComponent } from './components/subscriptions/subscriptions.component';
import { SubscriptionsViewComponent } from './components/subscriptions-view/subscriptions-view.component';
import { AddreviewComponent } from './components/addreview/addreview.component';
import { UpdatereviewComponent } from './components/updatereview/updatereview.component';
import { BuyBookComponent } from './components/buy-book/buy-book.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
    // { path: 'home', component:HomeComponent },
    {path:'home',component:BookComponent, canActivate: [userGuard]},
    {path:'cart',component:CartComponent, canActivate: [userGuard]},
    {path:'orders',component:OrderComponent, canActivate: [userGuard]},
    {path:'login',component:LoginComponent},
    {path:'viewbook',component:ViewbookComponent, canActivate: [userGuard]},
    {path:'sign-in',component:SignInComponent},
    {path:'app',component:AppComponent},
    {path:'less-stocks',component:LessStockDisplayComponent, canActivate: [adminGuard]},
    {path:'update-status',component:UpdateOrderStatusComponent},
    {path:'edit-profile/:id',component:EditProfileComponent, canActivate: [userGuard]},
    {path:'profile',component:ProfileComponent, canActivate: [userGuard]},
    {path:'admincrud',component:CrudBookComponent, canActivate: [adminGuard]},
    {path:'order/books',component:BooksOrderedComponent},
    {path:'add-book',component:AddBookComponent, canActivate: [adminGuard]},
    {path:'subscriptions',component:SubscriptionsComponent, canActivate: [adminGuard]},
    {path:'add-review/:id',component:AddreviewComponent, canActivate: [userGuard]},
    {path:'updatereview/:id',component:UpdatereviewComponent, canActivate: [userGuard]},
    {path: 'buybook',component:BuyBookComponent, canActivate: [userGuard]},
    {path:'confirm-order',component:ConfirmOrderComponent, canActivate: [userGuard]},
    {path:'subscriptions-view',component:SubscriptionsViewComponent, canActivate: [userGuard]},
    {path:'update-book/:id',component:UpdateBookComponent},
    {path:'login',component:LoginComponent},
    { path: '', redirectTo: 'login', pathMatch:'full' },
    { path: '**', component: PageNotFoundComponent }
];

