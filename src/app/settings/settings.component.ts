import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService} from '../services/auth.service';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import {UserSettingsModel} from '../Models/UserSettingsModel';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [AuthService, NgbTooltipConfig]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  @ViewChild(SnackBarComponent)
  snackBarRef: SnackBarComponent;
  constructor(
    public dialogRef: MatDialogRef<SettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private authService: AuthService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  saveDetails() {
    const formDetails = this.settingsForm.getRawValue();
    this.authService.updateUserDetails(formDetails).then(() => {
      this.snackBarRef.openSnackBar('saved');
      this.dialogRef.close();
    });
  }
  ngOnInit() {
    this.settingsForm =  this.fb.group({
      name: ['', Validators.compose([Validators.pattern(/[a-zA-Z ]/g), Validators.required])],
      age: ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
      country: ['', Validators.compose([Validators.pattern(/[a-zA-Z ]/g), Validators.required])],
      language: [''],
      personalShare: [false],
      countryShare: [false],
      languageShare: [false]
    });
    this.authService.checkAndReturnUser().then(res => {
      if(res){
        const user = new UserSettingsModel(res);
        this.settingsForm.patchValue(user);
      }
    });

  }
  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

}
