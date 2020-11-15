import { InjectionToken } from '@angular/core'
import { Observable } from 'rxjs';

export interface TableColumn {
  name: string;
  canBeSorted?: boolean;
  propertyName?: string;
}

export type TableColumnTranslated = Omit<TableColumn, 'name'> & { name: Observable<any> }

export enum SortDirection {
  ASC,
  DESC
}

export interface SortedColumnEvent {
  col: TableColumn;
  sortDirection: SortDirection;
}

export enum SelectedZoneEvents {
  DELETE,
  NOTIFCATION
}

export const SELECTED_ZONE_EVENTS = new InjectionToken('SELECTED_ZONE_EVENTS', {
  providedIn: 'root',
  factory: () => SelectedZoneEvents,
});

export const SORT_DIRECTION = new InjectionToken('SORT_DIRECTION', {
  providedIn: 'root',
  factory: () => SortDirection,
});