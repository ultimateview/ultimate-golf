import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { GolfCourseObject } from 'src/app/golf-objects/golf.planet';
import { RedrawService } from 'src/app/shared/services/ui/redraw.service';
import { ForceUpdatableComponent } from '../force-updatable/force-updatable.component';

@Component({
  selector: 'app-hole-select',
  templateUrl: './hole-select.component.html',
  styleUrls: ['./hole-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HoleSelectComponent extends ForceUpdatableComponent implements OnInit {

  @Input() holeSelectHandle: any;
  @Input() currentCourse: GolfCourseObject;

  constructor(protected _redrawService: RedrawService, protected changeDetectorRef: ChangeDetectorRef) {
    super(_redrawService, changeDetectorRef);
  }

  ngOnInit() {
    this.holeSelectHandle(1);
  }

}
