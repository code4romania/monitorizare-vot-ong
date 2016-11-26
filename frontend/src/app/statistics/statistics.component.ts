import { StatisticsService } from './statistics.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

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
