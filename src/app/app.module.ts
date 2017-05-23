import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DocumentSigningCreationComponent } from './document-signing-creation/document-signing-creation.component';

import { PdfViewerComponent } from 'ng2-pdf-viewer';
@NgModule({
  declarations: [
    AppComponent,
    DocumentSigningCreationComponent,
    PdfViewerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [DocumentSigningCreationComponent]
})
export class AppModule { }
