import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';
import { IntroPage } from '../pages/intro/intro';
import { ChecklistPage } from '../pages/checklist/checklist';
import { Data } from '../providers/data';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    IntroPage,
    ChecklistPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    IntroPage,
    ChecklistPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage,Data]
})
export class AppModule {}
