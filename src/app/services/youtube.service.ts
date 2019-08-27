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

  constructor(private http: HttpClient ) { }

  getVideos() {
    const url = `${ this.youtubeUrl }/playlistItems`;
    const params  = new HttpParams()
                      .set( 'part', 'snippet' )
                      .set( 'maxResults', '10' )
                      .set( 'playlistId', listaUploadsYouTube )
                      .set( 'key', apiKey );

    return this.http.get( url, {params} ).pipe(map( (resp: any) => {
      this.nextPageToken = resp.nextPageToken;
      const videos: any[] = [];
      for( const video of resp.items ){
        const snippet = video.snippet;
        videos.push( snippet );
      }
      return videos;
    }));
  }
}
