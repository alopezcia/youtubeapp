import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';

declare var $:any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  videoSel: any;

  constructor( private youtube: YoutubeService ) {
    this.youtube.getVideos()
      .subscribe( videos => {
        this.videos = videos;
      });
  }

  ngOnInit() {
  }

  verVideo(video: any){
    this.videoSel = video;
    $('#youtubeModal').modal();
  }

  cerrarModal(){
    this.videoSel = null;
    $('#youtubeModal').modal('hide');
  }

  cargarMas(){
    this.youtube.getVideos()
      .subscribe( videos => {
        this.videos.push.apply(this.videos, videos);
      });
  }
}
