import { Component, Input } from '@angular/core';
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';


export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  responsive: ApexResponsive[];
  legend: ApexLegend;
};
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  @Input() chartData: number[] = [];
  @Input() chartLabels: string[] = [];
  @Input() colors: string[] = [];
  chartOptions: any;

  ngOnInit(): void {
    this.chartOptions = {
      series: this.chartData,
      chart: {
        type: 'pie',
        width: '100%',
      },
      labels: this.chartLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      ],
      legend: {
        position: 'bottom'
      },
      colors: this.colors
    };
  }
}
