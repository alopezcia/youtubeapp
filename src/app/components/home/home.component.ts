import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { $ } from 'protractor';


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
        console.log(videos);
        this.videos = videos;
      });
  }

  ngOnInit() {
  }

  verVideo(video: any){
    this.videoSel = video;
    $('#myModal').modal();
  }
}
