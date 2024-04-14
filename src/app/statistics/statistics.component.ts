import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'; // Importer 'chart.js' au lieu de 'node_modules/chart.js'
import { Statistics1Service } from './statistics1.service';

Chart.register(...registerables);

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  donnees: Donnee[] = []; // Tableau pour stocker toutes les données
  chartInstance!: Chart; // Stocke l'instance du graphique

  constructor(private http: HttpClient, private statisticsService: Statistics1Service) { }

  ngOnInit(): void {
    this.fetchData();
    this.statisticsService.getNewDataObservable().subscribe(newData => {
      this.donnees.push({ valeur: newData.valeur, date: new Date(newData.date) });
      this.updateChart(); // Mettre à jour le graphique avec les nouvelles données
    });
  }

  fetchData(): void {
    const httpOptions: { headers: HttpHeaders, responseType: 'json' } = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      responseType: 'json'
    };

    this.http.get<any[]>('http://localhost:8082/getting', httpOptions).subscribe(
      (response) => {
        if (Array.isArray(response) && response.length > 0) {
          this.donnees = response.map(data => ({
            valeur: data.valeur,
            date: new Date(data.date)
          }));
          this.RenderChart();
        } else {
          console.error("Invalid response data format");
        }
      },
      err => console.error(err)
    );
  }

  RenderChart(): void {
    const labels = this.donnees.map(d => d.date.toDateString());
    const data = this.donnees.map(d => d.valeur);

    this.chartInstance = new Chart("piechart", {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Valeur',
          data: data,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  updateChart(): void {
    if (this.chartInstance) {
      const labels = this.donnees.map(d => d.date.toDateString());
      const data = this.donnees.map(d => d.valeur);

      this.chartInstance.data.labels = labels;
      this.chartInstance.data.datasets[0].data = data;
      this.chartInstance.update(); // Mettre à jour le graphique avec les nouvelles données
    }
  }
}

export class Donnee {
  valeur: number = 0;
  date: Date = new Date();
}
