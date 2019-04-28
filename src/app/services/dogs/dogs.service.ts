import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { DogConfig } from '../../config/dogs.config';

import { MessagesService } from '../messages/messages.service';

import { DogBreed } from '../../classes/dogBreed';
import { DogImage } from '../../classes/dogImage';




@Injectable({
  providedIn: 'root'
})
export class DogsService {


  constructor(private http: HttpClient, private messageService: MessagesService) { }

  private log(message: string) {
    this.messageService.add('DogsService: ${message}');
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  public getDogBreeds(breed: string): Observable<DogBreed[]> {
    return this.http.get<DogBreed[]>(DogConfig.url.dogBreeds + '$(breed)/images')
      .pipe(
        tap(_ => this.log('Fetched Dog Breeds')),
        catchError(this.handleError<DogBreed[]>('getDogBreeds', []))
      );
  }

  public getDogImages(): Observable<DogImage[]> {
    return this.http.get<DogImage[]>(DogConfig.url.dogBreedImages)
      .pipe(
        tap(_ => this.log('Fetched Images')),
        catchError(this.handleError<DogImage[]>('getDogImages', []))
      );
  }

}
