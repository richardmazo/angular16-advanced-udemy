import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbsComponent } from './breadcumbs/breadcumbs.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    BreadcumbsComponent,
    SidebarComponent,
    HeaderComponent
  ],
  exports: [
    BreadcumbsComponent,
    SidebarComponent,
    HeaderComponent    
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
