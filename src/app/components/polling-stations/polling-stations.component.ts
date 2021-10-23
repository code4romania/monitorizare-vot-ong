import { County, CountyState } from './../../store/county/county.state';
import { AppState } from './../../store/store.module';
import { select, Store } from '@ngrx/store';
import { Component, Inject, OnInit } from '@angular/core';
import { map, take, tap, takeUntil } from 'rxjs/operators';
import { CountryPollingStationFetchAction } from 'src/app/store/county/county.actions';
import { Subject } from 'rxjs';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-polling-stations',
  templateUrl: './polling-stations.component.html',
  styleUrls: ['./polling-stations.component.scss'],
})
export class PollingStationsComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private countyList: County[] = [];
  public filteredCountryList: County[] = [];

  public filtersForm = this.fb.group({
    filter: ''
  });


  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    @Inject(BASE_BUTTON_VARIANTS) public BaseButtonVariants: typeof Variants) { }

  ngOnInit() {
    this.getList();
    this.handleCountyData();
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  private getList() {
    this.store
      .pipe(
        select(s => s.county),
        take(1),
        map(_ => new CountryPollingStationFetchAction())
      )
      .subscribe(action => this.store.dispatch(action));
  }

  private handleCountyData(): void {
    this.store.select(state => state.county).pipe(
      map(countyList => this.countyList = countyList?.counties),
      tap(countyList => this.filteredCountryList = countyList),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  onReorder(event: CdkDragDrop<County[]>) {
    moveItemInArray(this.countyList, event.previousIndex, event.currentIndex);
  }

  public filterList(text: string): void {
    const newFilter = [...this.countyList];
    this.filteredCountryList = newFilter.filter(item =>
      item.name.toLocaleLowerCase().includes(text.toLowerCase()) ||
      item.code.toLocaleLowerCase().includes(text.toLowerCase()))

  }

  public onResetFilters(): void {
    this.filteredCountryList = [...this.countyList];
  }
}
