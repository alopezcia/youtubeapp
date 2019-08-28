import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { apiKey, listaUploadsYouTube } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl: string ='https://www.googleapis.com/youtube/v3';
  private nextPageToken: string = '';
  private pageInfo: any;

  public  maximoACargar: number = 1000;
  public  totalCargados: number = 0;

  constructor( private http: HttpClient ) { }

  getVideos() {
    const url = `${ this.youtubeUrl }/playlistItems`;
    let params  = new HttpParams()
                      .set( 'part', 'snippet' )
                      .set( 'maxResults', '10' )
                      .set( 'playlistId', listaUploadsYouTube )
                      .set( 'key', apiKey );
    if ( this.nextPageToken ){
      let maxResults = '10';
      if ( this.maximoACargar <  this.totalCargados+10 ){
        maxResults = '1';
      }
      params  = new HttpParams()
                        .set( 'part', 'snippet' )
                        .set( 'maxResults', maxResults )
                        .set( 'playlistId', listaUploadsYouTube )
                        .set( 'pageToken', this.nextPageToken )
                        .set( 'key', apiKey );
    }

    return this.http.get( url, {params} ).pipe(map( (resp: any) => {
      const videos: any[] = [];
      this.pageInfo = resp.pageInfo;
      if( this.totalCargados >= this.maximoACargar ){
        this.totalCargados = this.maximoACargar;
        return videos;
      }

      if ( this.nextPageToken !== resp.nextPageToken ){
        this.nextPageToken = resp.nextPageToken;
        this.totalCargados = this.totalCargados + this.pageInfo.resultsPerPage;
        this.maximoACargar = this.pageInfo.totalResults;
        for( const video of resp.items ){
          const snippet = video.snippet;
          videos.push( snippet );
        }
      }
      return videos;
    }));
  }
}
