import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
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
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPanelComponent } from './components/admin/main-panel/main-panel.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AddTableComponent } from './components/table/add-table/add-table.component';
import { MyTablesComponent } from './components/table/my-tables/my-tables.component';
import { TableItemComponent } from './components/table/table-item/table-item.component';
import { TableOrderComponent } from './components/table/table-order/table-order.component';
import { RegisterComponent } from './components/auth/register/register.component';

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
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule,
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
  ],
  providers: [provideClientHydration()],
  bootstrap: [AppComponent],
})
export class AppModule {}
