import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.css']
})
export class PlannerComponent implements OnInit {

  constructor() { }

  protected rawDataRows;
  protected outputHeader;
  protected headerKeys;


  public headerRow;
  public bodyRows;

  public adjustedRows;

  ngOnInit() {
  }


  usableRows(dat) {

      let rows = dat.split('\n');
      let r = [];
      this.outputHeader = rows[0].split(',');
      this.headerRow = rows[0].split(',');

      this.headerKeys = {};
      for (let i = 0; i < this.headerRow.length; i++) {
        this.headerKeys[this.headerRow[i]] = i; // loop header strings adding object property and array position (index)
      }
      console.log('headerKeys');
      console.log(this.headerKeys);
      console.log('Check: ' + this.indexByKey('gimbalpitchangle'));

      for (let i = 1; i < rows.length - 1; i++) {
          r.push(rows[i].split(','));
      }
      return r;
  }
  updateAdjustedRows(grid) {
    this.adjustedRows = [];
    let row = [];
    for (let i = 0; i < grid.length; i++) {
      row = [];
      for (let j = 0; j < grid[i].length; j++) {
        row.push(grid[i][j]);
      }
      this.adjustedRows.push(row);
    }

    // this.adjustedRows[this.indexByKey('actiontype1')] = '99';

    return this.adjustedRows;
  }

  indexByKey(key) {
    console.log(this.headerKeys);
    return this.headerKeys[key];
  }

  readSingleFile(evt) {
    // Retrieve the first (and only!) File from the FileList object
    const f = evt.target.files[0];
    const me = this;
    if (f) {
        const r = new FileReader();
        r.onload = function(e: any) {
          if (e) {
            const contents = e.target.result;
            // console.log(contents);
            me.rawDataRows = me.usableRows(contents);
            // console.log(me.rawDataRows);
            me.bodyRows = me.rawDataRows;
            me.updateAdjustedRows(me.bodyRows);
          }
        }
        r.readAsText(f);
    } else {
        alert('Failed to load file');
    }
}

}
