import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { DashboardComponent } from '../../components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../../components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';

// Import canActivate guard services
import { AuthGuard } from '../../shared/guard/auth.guard';
import { SecureInnerPagesGuard } from '../../shared/guard/secure-inner-pages.guard';
import { HomeComponent } from 'src/app/components/pages/home/home.component';
import { AerialComponent } from 'src/app/components/pages/aerial/aerial.component';
import { PlannerComponent } from 'src/app/components/admin/pages/planner/planner.component';
import { RndComponent } from './../../components/pages/rnd/rnd.component';
import { CourseListComponent } from './../../components/admin/pages/course/course-list/course-list.component';
import { CourseComponent } from './../../components/pages/play/course/course.component';
import { AdminDashboardComponent } from 'src/app/components/admin/pages/admin-dashboard/admin-dashboard.component';
import { EditCourseComponent } from 'src/app/components/admin/pages/course/edit-course/edit-course.component';

// Include route guard in routes array
const routes: Routes = [
  // { path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  { path: 'admin/command-center', component: AdminDashboardComponent },
  { path: 'admin/course/edit/:id', component: EditCourseComponent },
  { path: 'admin/course/list', component: CourseListComponent, canActivate: [SecureInnerPagesGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'aerial', component: AerialComponent },
  { path: 'rnd', component: RndComponent },
  { path: 'play/course/:id}', component: CourseComponent },
  { path: 'admin/planner', component: PlannerComponent },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard]},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }