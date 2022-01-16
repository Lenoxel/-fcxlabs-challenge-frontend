import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TokenInterceptorService } from './services/token/token-interceptor.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { BsDropdownModule,BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { TabsComponent } from './components/tabs/tabs.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TabsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxDatatableModule,
    ToastrModule.forRoot(),
    BsDropdownModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    BsDropdownConfig,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
