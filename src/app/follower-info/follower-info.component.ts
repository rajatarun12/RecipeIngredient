import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-follower-info',
  templateUrl: './follower-info.component.html',
  styleUrls: ['./follower-info.component.css']
})
export class FollowerInfoComponent implements OnInit {
step = 0;
recipes;
  constructor(public dialogRef: MatDialogRef<FollowerInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.recipes = this.formatRecipes(this.data.myRecipes);
  }
  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
  formatRecipes(data) {
    return Object.keys(data).reduce((res, dat) => {
      res.push(data[dat]);
      return res;
    }, []);
  }
  close() {
    this.dialogRef.close();
  }
}
