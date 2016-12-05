import { ApiService } from '../../core/apiService/api.service';
import { StatisticsService } from '../../shared/statistics.service';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'app-statistics-details',
  templateUrl: './statistics-details.component.html',
  styleUrls: ['./statistics-details.component.scss']
})
export class StatisticsDetailsComponent implements OnInit {

  config: any;
  stats: any[][] = [];

  currentPage = 1;
  pageSize = 50;
  total = 0;

  loading = false;
  error = false;

  subscription: Subscription;



  constructor(private http: ApiService, private statService: StatisticsService) { }

  @Input()
  set index(value:number){
    this._index = value;
    this.getConfig(value);
  }

  _index:number;


  ngOnInit() {
  }

  getConfig(index) {
    this.config = this.statService.topLists[index];

    this.getStats(1);
  }
  pageChanged(event) {
    this.currentPage = event.page;

    let pageLoaded = !!this.stats[this.currentPage];

    if (!pageLoaded) {
      this.getStats(this.currentPage);
    }

  }
  getStats(page: number) {
    this.loading = true;
    this.error = false;

    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.subscription = this.statService.get(this.config.method, {
      page: page,
      pageSize: this.pageSize
    })
      .subscribe(json => {

        // TODO UPDATE PAGINATION
        this.currentPage = json.page;
        this.total = json.totalItems;

        this.stats[this.currentPage] = json.data;


        this.loading = false;
      }, () => {
        this.loading = false;
        this.error = true;
      });
  }



}
