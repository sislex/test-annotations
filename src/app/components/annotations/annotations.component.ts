import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as fabric from 'fabric';

@Component({
  selector: 'app-annotations',
  standalone: true,
  imports: [],
  templateUrl: './annotations.component.html',
  styleUrl: './annotations.component.scss'
})
export class AnnotationsComponent implements AfterViewInit {
  @Input() annotations: any[] | undefined = [];

  @ViewChild('wrapper', { static: true }) wrapperElement!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: false }) canvasElement!: ElementRef<HTMLCanvasElement>;
  canvasWidth = 0;
  canvasHeight = 0;

  private canvas!: fabric.Canvas;


  constructor() {}

  ngAfterViewInit(): void {
    console.log(this.annotations);


    setTimeout(() => { // Ждем, пока картинка загрузится
      this.canvasWidth = this.wrapperElement.nativeElement.clientWidth;
      this.canvasHeight = this.wrapperElement.nativeElement.clientHeight;

      setTimeout(() => {
        this.initAnnotations();
      }, 0);
    }, 1000);

  }

  initAnnotations(): void {
    this.canvas = new fabric.Canvas(this.canvasElement.nativeElement);

    if (this.annotations?.length) {
      const rect = new fabric.Rect({
        left: 100,
        top: 100,
        fill: 'red',
        width: 200,
        height: 200,
      });
      this.canvas.add(rect);
    }


  }

  // addText(): void {
  //   const text = new fabric.Textbox('Hello Fabric', {
  //     left: 50,
  //     top: 50,
  //     width: 150,
  //     fontSize: 20
  //   });
  //   this.canvas.add(text);
  // }
}
