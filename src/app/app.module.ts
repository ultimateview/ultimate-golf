import { VideoTimeService } from './shared/services/video/video-time.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Reactive Form
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from './shared/services/auth.service';
import { CourseService } from './shared/services/golf/course.service';
import { UtilsService } from './shared/services/utilities/utils.service';
import { HomeComponent } from './components/pages/home/home.component';
import { TopNavComponent } from './components/navigation/top-nav/top-nav.component';
import { AerialComponent } from './components/pages/aerial/aerial.component';
import { PanoComponent } from './components/features/pano/pano.component';
import { PackedObjectDirective } from './directives/packed-object.directive';
import { JquerySelectorDirective } from './directives/jquery-selector.directive';
import { PlannerComponent } from './components/admin/pages/planner/planner.component';
import { ShortStringPipe } from './custom-pipes/short-string.pipe';
import { YardsLabelPipe } from './custom-pipes/yards-label.pipe';
import { SphereViewComponent } from './components/features/sphere-view/sphere-view.component';
import { RndComponent } from './components/pages/rnd/rnd.component';
import { VjsComponent } from './components/features/vjs/vjs.component';
import { CourseMapComponent } from './components/features/course-map/course-map.component';
import { CourseComponent } from './components/pages/play/course/course.component';
import { Youtube360Component } from './components/features/interactive/youtube360/youtube360.component';
import { CourseCompositeComponent } from './components/features/interactive/course-composite/course-composite.component';
import { GoogleMapComponent } from './components/features/interactive/google-map/google-map.component';
import { WaypointSelectComponent } from './components/features/interactive/waypoint-select/waypoint-select.component';
import { VideoTimeStatusComponent } from './components/features/interactive/video-time-status/video-time-status.component';
import { VideoTimelineComponent } from './components/features/interactive/video-timeline/video-timeline.component';
import { CourseListComponent } from './components/admin/pages/course/course-list/course-list.component';
import { AdminDashboardComponent } from './components/admin/pages/admin-dashboard/admin-dashboard.component';
import { EditCourseComponent } from './components/admin/pages/course/edit-course/edit-course.component';
import { EditAddressComponent } from './components/admin/pages/course/edit-address/edit-address.component';
import { HoleSelectComponent } from './components/features/interactive/hole-select/hole-select.component';
import { ForceUpdatableComponent } from './components/features/interactive/force-updatable/force-updatable.component';
import { CourseSelectComponent } from './components/features/interactive/course-select/course-select.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    DashboardComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    HomeComponent,
    TopNavComponent,
    AerialComponent,
    PanoComponent,
    PackedObjectDirective,
    JquerySelectorDirective,
    PlannerComponent,
    ShortStringPipe,
    YardsLabelPipe,
    SphereViewComponent,
    RndComponent,
    VjsComponent,
    CourseMapComponent,
    CourseComponent,
    Youtube360Component,
    CourseCompositeComponent,
    GoogleMapComponent,
    WaypointSelectComponent,
    VideoTimeStatusComponent,
    VideoTimelineComponent,
    CourseListComponent,
    AdminDashboardComponent,
    EditCourseComponent,
    EditAddressComponent,
    HoleSelectComponent,
    ForceUpdatableComponent,
    CourseSelectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [FormsModule],
  providers: [
    AuthService,
    CourseService,
    UtilsService,
    VideoTimeService,
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }