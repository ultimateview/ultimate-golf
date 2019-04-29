import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { RedrawService } from 'src/app/shared/services/ui/redraw.service';

@Component({
  selector: 'app-force-updatable',
  templateUrl: './force-updatable.component.html',
  styleUrls: ['./force-updatable.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForceUpdatableComponent implements OnInit {

  protected redrawSubscription: Subscription;
  protected lastRedrawDate: Date;

  constructor(protected _redrawService: RedrawService, protected changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.redrawSubscription = this._redrawService.lastRedraw$.subscribe(item => this.updateFromForceRedraw(item));
  }

  updateFromForceRedraw(item) {
    this.changeDetectorRef.markForCheck();
    this.lastRedrawDate = item;
    this.changeDetectorRef.detectChanges();
    // console.log('forceRedraw detected');
  }

}
