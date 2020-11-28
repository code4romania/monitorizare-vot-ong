export interface CountyState {
  counties: County[];
  errorMessage?: string;
}

export interface County {
  name: string;
  code: string;
  numberOfPollingStations: number;
  id: number;
  diaspora: boolean;
  order: number;
}