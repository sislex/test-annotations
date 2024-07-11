import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as fabric from 'fabric';
import {IAddAnnotation} from "../../+state/annotation/annotation.reducer";
import {annotationRelativeToAbsolute} from '../../helpers/annotationRelativeToAbsolute';

@Component({
  selector: 'app-annotations',
  standalone: true,
  imports: [],
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss']
})
export class AnnotationsComponent implements AfterViewInit {
  @Input() annotations: any[] | undefined = [];
  @Input() addAnnotation: IAddAnnotation | null = null;


  @ViewChild('wrapper', { static: true }) wrapperElement!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: false }) canvasElement!: ElementRef<HTMLCanvasElement>;
  canvasWidth = 0;
  canvasHeight = 0;

  private fabricCanvas!: fabric.Canvas;
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private shape!: fabric.Rect | fabric.Textbox | fabric.Circle;

  constructor() {}

  ngAfterViewInit(): void {
    setTimeout(() => { // Ждем, пока картинка загрузится
      this.canvasWidth = this.wrapperElement.nativeElement.clientWidth;
      this.canvasHeight = this.wrapperElement.nativeElement.clientHeight;

      setTimeout(() => {
        this.initFabric();
        this.fabricEvents();
        this.initAnnotations();

      }, 0);
    }, 500);
  }

  initFabric() {
    this.fabricCanvas = new fabric.Canvas(this.canvasElement.nativeElement);
  }

  destroyFabric() {
    this.fabricCanvas.dispose();
  }

  initAnnotations(): void {
    if (this.annotations?.length) {
      this.annotations.forEach((annotationRelative) => {
        const annotation = annotationRelativeToAbsolute(annotationRelative, this.canvasWidth, this.canvasHeight);
        if (annotation.type === 'rect') {
          const rect = new fabric.Rect({...annotation.settings});
          this.fabricCanvas.add(rect);
        }
      });

    }


  }

  fabricEvents() {
    this.fabricCanvas.on('mouse:down', (options) => this.mouseDown(options));
    this.fabricCanvas.on('mouse:move', (options) => this.mouseMove(options));
    this.fabricCanvas.on('mouse:up', () => this.mouseUp());
  }

  mouseDown(options: any, fabricCanvas: fabric.Canvas = this.fabricCanvas) {
    if (this.addAnnotation) {
      if (options.target) {
        this.isDrawing = false;
      } else {
        this.isDrawing = true;

        const pointer = fabricCanvas.getPointer(options.e);
        this.startX = pointer.x;
        this.startY = pointer.y;

        if (this.addAnnotation.type === 'rect') {
          this.shape = new fabric.Rect({
            left: this.startX,
            top: this.startY,
            fill: this.addAnnotation.settings.fill,
            width: 0,
            height: 0
          });
          this.fabricCanvas.add(this.shape);
        } else  if (this.addAnnotation.type === 'text') {
          this.shape = new fabric.Textbox('Введите текст', {
            left: this.startX,
            top: this.startY,
            width: 150,
            fontSize: 20,
            borderColor: 'rgba(255, 0, 0, 0.8)',
            cornerColor: 'rgba(255, 0, 0, 0.8)',
            cornerSize: 6,
            transparentCorners: false
          });

          this.fabricCanvas.add(this.shape);
        } else  if (this.addAnnotation.type === 'circle') {
          this.shape = new fabric.Circle({
            left: this.startX,
            top: this.startY,
            radius: 1,
            fill: 'rgba(110, 1, 21)',
          });

          this.fabricCanvas.add(this.shape);
        }

      }
    }
  }

  mouseMove(options: any) {
    if (this.isDrawing) {
      const pointer = this.fabricCanvas.getPointer(options.e);
      if (this.addAnnotation) {
        if (this.addAnnotation.type === 'rect') {
          this.shape.set({
            width: Math.abs(pointer.x - this.startX),
            height: Math.abs(pointer.y - this.startY),
            fill: 'rgba(21, 1, 110, 0.2)',
          });

          if (pointer.x < this.startX) {
            this.shape.set({left: pointer.x});
          }
          if (pointer.y < this.startY) {
            this.shape.set({top: pointer.y});
          }

          this.shape.setCoords();
        } else if (this.addAnnotation.type === 'circle') {
          const radius = Math.abs(pointer.x - this.startX)/2;
          this.shape.set({
            radius: radius,
            fill: 'rgba(110, 1, 21, 0.5)',
          });

          this.shape.setCoords();
        }
      }


      this.fabricCanvas.renderAll();

    }
  }

  mouseUp() {
    if (this.addAnnotation && this.isDrawing) {
      const annotationAbsolut: any = {};
      if (this.addAnnotation.type === 'rect') {
        this.shape.set({
          fill: this.addAnnotation.settings.fill,
        });
        annotationAbsolut.type = 'rect';
        annotationAbsolut.settings = {
          left: this.shape.left,
          top: this.shape.top,
          width: this.shape.width,
          height: this.shape.height,
          fill: this.shape.fill,
        };


      }
      this.isDrawing = false;
      console.log(this.shape);

      // this.emitter.emit({event: '...', data:  annotationAbsoluteToRelative(annotationAbsolut)});

    }
  }

}
