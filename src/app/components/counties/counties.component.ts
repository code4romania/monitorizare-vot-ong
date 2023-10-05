import { County } from '../../store/county/county.state';
import { AppState } from '../../store/store.module';
import { select, Store } from '@ngrx/store';
import { Component, Inject, OnInit } from '@angular/core';
import { map, take, tap, takeUntil } from 'rxjs/operators';
import { CountyPollingStationFetchAction } from 'src/app/store/county/county.actions';
import { Subject } from 'rxjs';
import { BASE_BUTTON_VARIANTS, Variants } from 'src/app/shared/base-button/base-button.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-counties',
  templateUrl: './counties.component.html',
  styleUrls: ['./counties.component.scss'],
})
export class CountiesComponent implements OnInit {
  private destroy$: Subject<boolean> = new Subject<boolean>();
  private countyList: County[] = [];
  public filteredCounties: County[] = [];

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
        map(_ => new CountyPollingStationFetchAction())
      )
      .subscribe(action => this.store.dispatch(action));
  }

  private handleCountyData(): void {
    this.store.select(state => state.county).pipe(
      map(result => this.countyList = result?.counties ?? []),
      tap(countyList => this.filteredCounties = countyList),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  public filterList(text: string): void {
    const newFilter = [...this.countyList];
    this.filteredCounties = newFilter.filter(item =>
      item.name.toLocaleLowerCase().includes(text.toLowerCase()) ||
      item.code.toLocaleLowerCase().includes(text.toLowerCase()))

  }

  public onResetFilters(): void {
    this.filteredCounties = [...this.countyList];
  }
}
