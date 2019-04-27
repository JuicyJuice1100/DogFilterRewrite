import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
    this.messageService.add('DogsSerivce: ${message}');
  }

  public getDogBreeds(): Observable<Array<DogBreed>> {
    return this.http.get<Array<DogBreed>>(DogConfig.url.dogBreeds)
  }

}
