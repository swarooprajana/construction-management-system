import { Component, Input } from '@angular/core';
import { ApexChart, ApexLegend, ApexNonAxisChartSeries, ApexResponsive } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: any;
  responsive: ApexResponsive[];
  legend: ApexLegend;
  colors?: string[]; // Optional colors property
};

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent {
  @Input() chartData: number[] = [];
  @Input() chartLabels: string[] = [];
  @Input() colors: string[] = [];
  @Input() chartWidth: string = '100%';
  @Input() chartHeight: string = '100%';

  chartOptions: ChartOptions = { // Initialize the object
    series: [],
    chart: {
      type: 'pie',
      width: this.chartWidth,
      height: this.chartHeight,
    },
    labels: [],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
            height: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    legend: {
      position: 'right',
    },
    colors: [],
  };

  ngOnInit(): void {
    this.chartOptions.series = this.chartData;
    this.chartOptions.labels = this.chartLabels;
    this.chartOptions.chart.width = this.chartWidth;
    this.chartOptions.chart.height = this.chartHeight;
    this.chartOptions.colors = this.colors;
  }
}
