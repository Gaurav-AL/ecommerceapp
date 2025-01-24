import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root',
})
export class ShopchatService {
  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';

  constructor(private httpClient: HttpClient) {}

  // Get the list of States based on the Country Code
  getStates(theCountryCode: string): Observable<State[]> {
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient
      .get<GetResponseState>(searchStatesUrl)
      .pipe(map((response) => response._embedded.states));
  }

  // Get the list of Countries
  getCountries(): Observable<Country[]> {
    return this.httpClient
      .get<GetResponseCountries>(this.countriesUrl)
      .pipe(map((response) => response._embedded.countries));
  }

  // Get Payment Card Months
  getPaymentCardMonths(startMonth: number): Observable<number[]> {
    let data: number[] = [];

    for (let theMonth = startMonth; theMonth <= 12; theMonth++) {
      data?.push(theMonth);
    }

    return of(data);
  }

  // Get Payment Card Year
  getPaymentCardYear(): Observable<number[]> {
    let data: number[] = [];
    const startYear = new Date().getFullYear();
    const endYear = startYear + 10;

    for (let theYear = startYear; theYear <= endYear; theYear++) {
      data?.push(theYear);
    }
    return of(data);
  }
}

interface GetResponseCountries {
  _embedded: {
    countries: Country[];
  };
}

interface GetResponseState {
  _embedded: {
    states: State[];
  };
}
