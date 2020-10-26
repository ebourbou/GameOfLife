import { Component, Input, OnInit } from "@angular/core";
import { Board } from "../model/Board";

@Component({
  selector: "gol-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.scss"],
})
export class BoardComponent implements OnInit {
  @Input()
  public board: Board;

  constructor() {}

  ngOnInit(): void {}
}
