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

export interface SelectedZoneEvent {
  type: SelectedZoneEventTypes;
  selectedRowIds: string[];
}

export enum SelectedZoneEventTypes {
  DELETE,
  NOTIFCATION
}

export const SELECTED_ZONE_EVENTS = new InjectionToken('SELECTED_ZONE_EVENTS', {
  providedIn: 'root',
  factory: () => SelectedZoneEventTypes,
});

export const SORT_DIRECTION = new InjectionToken('SORT_DIRECTION', {
  providedIn: 'root',
  factory: () => SortDirection,
});
