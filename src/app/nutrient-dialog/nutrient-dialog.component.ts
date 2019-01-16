import {Component, Input, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-nutrient-dialog',
  templateUrl: './nutrient-dialog.component.html',
  styleUrls: ['./nutrient-dialog.component.scss']
})
export class NutrientDialogComponent implements OnInit {
  @Input() nutrients;
  isXs;
  constructor(public dialog: MatDialog, private breakpointsService: BreakpointObserver) {
    this.breakpointsService.observe('(max-width: 768px)').subscribe(result => {
      if (result.matches) {
        this.isXs = true;
      } else {
        this.isXs = false;
      }
    });
  }
  @Input() percentDaily;
  chartData;
  public columnChartData: any = [];
    ngOnInit() {
      const total = this.percentDaily[0];
      const daily = this.percentDaily[1];
      this.columnChartData.push(['Nutrient', '% daily value']);
      Object.keys(daily).forEach((nut, i) => {
        if (daily[nut] && i < 10) {
          // , Number(Number(total[nut]).toFixed(2))
          this.columnChartData.push([nut, Number(Number(daily[nut]).toFixed(2))]);
        }
      });
  }
  openDialog(): void {
    this.chartData = {
      chartType: this.isXs ? 'BarChart' : 'ColumnChart',
      dataTable: this.columnChartData,
      options: {title: '% daily value',
        animation: {
          duration: 1000,
          easing: 'out',
          startup: true
        }}
    };
    const dialogRef = this.dialog.open(NutrientDialogTemplate, {
      width: '200em',
     data: {chartData: this.chartData}
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}

@Component({
  selector: 'app-nutrient-dialog-template',
  templateUrl: 'app-nutrient-dialog-template.html',
})
export class NutrientDialogTemplate {

  constructor(
    public dialogRef: MatDialogRef<NutrientDialogTemplate>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

