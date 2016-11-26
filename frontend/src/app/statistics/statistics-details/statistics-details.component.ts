import { StatisticsService } from '../statistics.service';
import { resolve } from 'dns';
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterState } from '@angular/router';

@Component({
  selector: 'app-statistics-details',
  templateUrl: './statistics-details.component.html',
  styleUrls: ['./statistics-details.component.scss']
})
export class StatisticsDetailsComponent implements OnInit {

  config: any;

  constructor(private route: ActivatedRoute, private http: Http, private statService: StatisticsService) { }

  ngOnInit() {
    this.route.params
      .map(params => params['index'])
      .subscribe(this.getConfig.bind(this));
  }

  getConfig(index) {
    this.config = this.statService.topLists[index];
    this.config.dataObservable = this.http.get(`/api/v1/statistici/${this.config.method}`, {
      body: {
        pageSize: 30
      }
    })
      .map(res => res.json())
      .map(json => json.data);
  }

}
