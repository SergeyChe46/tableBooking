import { DatePipe } from '@angular/common';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { NgModule, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPanelComponent } from './components/admin/main-panel/main-panel.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AddTableComponent } from './components/table/add-table/add-table.component';
import { BookingInfoDetailComponent } from './components/table/booking-info-detail/booking-info-detail.component';
import { MyTablesComponent } from './components/table/my-tables/my-tables.component';
import { TableItemComponent } from './components/table/table-item/table-item.component';
import { TableOrderComponent } from './components/table/table-order/table-order.component';
import { AuthInterceptor } from './services/auth/auth.interceptor';
import { AuthService } from './services/auth/auth.service';
import { TimeOnlyPipe } from './services/pipes/time-only.pipe';

export function tokenGetter() {
  const authService = inject(AuthService);
  return authService.token;
}

@NgModule({
  declarations: [
    AppComponent,
    TableOrderComponent,
    TableItemComponent,
    LoginComponent,
    MainPanelComponent,
    AddTableComponent,
    MyTablesComponent,
    RegisterComponent,
    BookingInfoDetailComponent,
    TimeOnlyPipe,
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:4200'],
      },
    }),
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
    MatChipsModule,
    MatMenuModule,
    BrowserModule,
    MatTableModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatExpansionModule,
    MatDividerModule,
    ToastrModule.forRoot(),
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withInterceptors([AuthInterceptor])),
    DatePipe,
    { provide: MAT_DATE_LOCALE, useValue: 'ru-ru' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
