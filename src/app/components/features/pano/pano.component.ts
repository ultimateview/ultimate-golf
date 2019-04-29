import { Component, OnInit, Input } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

declare var PhotoSphereViewer: any;
declare var $: any;

@Component({
  selector: 'app-pano',
  templateUrl: './pano.component.html',
  styleUrls: ['./pano.component.css']
})
export class PanoComponent implements OnInit {
  @Input()
  myId: string;

  @Input() panoUrl: string;

  @Input() dataPanoUrl: string;

  PSV;

  constructor() { }

  ngOnInit() {
    console.log('checkMyId: ' + this.myId);
    console.log(this);
    const preClosureId = this.myId;
    const me = this;

    // $('.ultra-sphere').each(function() {
    //   const inStr = $(this).text().trim();
    //   console.log(inStr);
    //   if (inStr !== '') {
    //     $(this).attr('id', inStr);
    //     $(this).text('');
    //   }
    // });
    console.log('TEST');
    setTimeout(function() {
      // console.log($('[ng-reflect-selector-string="#test1"]'));
      const toSelectStr = '[ng-reflect-selector-string="#' + preClosureId + '"]';
      console.log(toSelectStr);
      this.PSV = new PhotoSphereViewer({
        panorama: me.panoUrl,
        container: toSelectStr,
        loading_img: 'assets/ultraview/loading.gif',
        navbar: 'autorotate zoom download fullscreen',
        caption: '<b>&copy; UltimateView.pro</b>',
        default_fov: 100,
        mousewheel: false,
        size: {
          height: 420
        }
      });
    }, 1);
    
    
    
  }

}
