import { StatisticsService } from '../../shared/statistics.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './statistics-top.component.html',
  styleUrls: ['./statistics-top.component.scss']
})
export class StatisticsTopComponent implements OnInit {

  constructor(private http:Http, private statService: StatisticsService) { }

  public topListsArray = undefined;

  ngOnInit() {

    this.topListsArray = _.values(this.statService.topLists);    
     _.each(this.topListsArray,config => {
      config.dataObservable = 
        this.http.get(`/api/v1/statistici/${config.method}`)
        .map(res => res.json())
        .map(json => json.data)
    })
  }
}
