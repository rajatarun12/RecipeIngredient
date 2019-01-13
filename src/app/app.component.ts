import { Component, OnInit } from '@angular/core';
declare var Tour: any;
import { NgModel } from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {AppGlobal} from './Content/AppGlobal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppGlobal]
})
export class AppComponent implements OnInit {
  constructor(private translate: TranslateService, private appGlobal: AppGlobal) {
    translate.setDefaultLang(this.appGlobal.defaultContent);

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use(this.appGlobal.defaultContent);
  }
  ngOnInit() {
    // Instance the tour
    const tour = new Tour({
      steps: [
        {
          element: '#MenuBars',
          title: 'Click on the Menu for more options',
          content: 'Content of my step',
          backdrop: true,
          onEnd: function (tour) {
            tour.end();
          },
        }
      ]});

// Initialize the tour
//     tour.init();

// Start the tour
//     tour.start();
  }
}
