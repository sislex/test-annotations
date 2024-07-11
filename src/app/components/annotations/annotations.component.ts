import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import * as fabric from 'fabric';
import {IAddAnnotation} from "../../+state/annotation/annotation.reducer";
import {annotationRelativeToAbsolute} from '../../helpers/annotationRelativeToAbsolute';
import {annotationAbsoluteToRelative} from "../../helpers/annotationAbsoluteToRelative";

@Component({
  selector: 'app-annotations',
  standalone: true,
  imports: [],
  templateUrl: './annotations.component.html',
  styleUrls: ['./annotations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnotationsComponent implements AfterViewInit {
  @Input() annotations: any[] | undefined = [];
  @Input() addAnnotation: IAddAnnotation | null = null;
  @Input() currentPage: number | null = null;
  @Output() emitter = new EventEmitter();

  @ViewChild('wrapper', { static: true }) wrapperElement!: ElementRef<HTMLDivElement>;
  @ViewChild('canvas', { static: false }) canvasElement!: ElementRef<HTMLCanvasElement>;
  canvasWidth = 0;
  canvasHeight = 0;

  private fabricCanvas!: fabric.Canvas;
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private shape!: fabric.Rect | fabric.Textbox | fabric.Circle | any;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.canvasWidth = this.wrapperElement.nativeElement.clientWidth;
      this.canvasHeight = this.wrapperElement.nativeElement.clientHeight;

      this.cdr.detectChanges();

      setTimeout(() => {
        if (this.canvasElement) {
          this.initFabric();
          this.fabricEvents();
          this.initAnnotations();
          this.cdr.detectChanges();
        }
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
        let shape;

        if (annotation.type === 'rect') {
          shape = new fabric.Rect({...annotation.settings});
        } else if (annotation.type === 'circle') {
          shape = new fabric.Circle({...annotation.settings});
        } else if (annotation.type === 'text') {
          shape = new fabric.Text(annotation.settings.text, {...annotation.settings});
        }

        if (shape) {
          this.fabricCanvas.add(shape);
        }
      });
    }
  }

  fabricEvents() {
    this.fabricCanvas.on('mouse:down', (options) => this.mouseDown(options));
    this.fabricCanvas.on('mouse:move', (options) => this.mouseMove(options));
    this.fabricCanvas.on('mouse:up', () => this.mouseUp());
    this.fabricCanvas.on('object:modified', (options) => this.objectModified(options));
  }

  mouseDown(options: any, fabricCanvas: fabric.Canvas = this.fabricCanvas) {
    if (this.addAnnotation) {
      if (options.target) {
        this.isDrawing = false;
      } else {
        if (!this.annotations ) {
          this.annotations = [];
        }
        if (this.annotations ) {
          let lastAnnotationId = -1;
          this.annotations.forEach((annotation) => {
            if (annotation.settings.id > lastAnnotationId) {
              lastAnnotationId = annotation.settings.id;
            }
          });

          const annotationId = lastAnnotationId + 1;
          this.isDrawing = true;

          const pointer = fabricCanvas.getPointer(options.e);
          this.startX = pointer.x;
          this.startY = pointer.y;

          if (this.addAnnotation.type === 'rect') {
            this.shape = new fabric.Rect({
              id: annotationId,
              left: this.startX,
              top: this.startY,
              fill: this.addAnnotation.settings.fill,
              width: 0,
              height: 0,
            });
          } else if (this.addAnnotation.type === 'text') {
            this.shape = new fabric.Textbox('Введите текст', {
              id: annotationId,
              left: this.startX,
              top: this.startY,
              width: 150,
              fontSize: 20,
              borderColor: 'rgba(255, 0, 0, 0.8)',
              cornerColor: 'rgba(255, 0, 0, 0.8)',
              cornerSize: 6,
              transparentCorners: false,
            });
          } else if (this.addAnnotation.type === 'circle') {
            this.shape = new fabric.Circle({
              id: annotationId,
              left: this.startX,
              top: this.startY,
              radius: 1,
              fill: 'rgba(110, 1, 21)',
            });
          }

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
          const radius = Math.abs(pointer.x - this.startX) / 2;
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
          id: this.shape.id,
          left: this.shape.left,
          top: this.shape.top,
          width: this.shape.width,
          height: this.shape.height,
          fill: this.shape.fill,
          angle: this.shape.angle
        };
      } else if (this.addAnnotation.type === 'circle' && 'radius' in this.shape) {
        annotationAbsolut.type = 'circle';
        annotationAbsolut.settings = {
          id: this.shape.id,
          left: this.shape.left,
          top: this.shape.top,
          radius: this.shape.radius,
          fill: this.shape.fill,
          angle: this.shape.angle
        };
      } else if (this.addAnnotation.type === 'text' && 'text' in this.shape && 'fontSize' in this.shape) {
        annotationAbsolut.type = 'text';
        annotationAbsolut.settings = {
          id: this.shape.id,
          left: this.shape.left,
          top: this.shape.top,
          text: this.shape.text,
          fontSize: this.shape.fontSize,
          fill: this.shape.fill,
          angle: this.shape.angle
        };
      }

      this.shape = null;
      this.isDrawing = false;

      this.emitter.emit({
        event: 'AnnotationsComponent:MODIFY_SHAPE',
        data: {
          annotation: annotationAbsoluteToRelative(annotationAbsolut, this.canvasWidth, this.canvasHeight),
          page: this.currentPage,
        },
      });
    }
  }

  objectModified(options: any) {
    const shape = options.target;
    if (shape) {
      let annotationAbsolut: any = {};

      if (shape.type === 'rect') {
        annotationAbsolut.type = 'rect';
        annotationAbsolut.settings = {
          id: shape.id,
          left: shape.left,
          top: shape.top,
          width: shape.width * shape.scaleX,
          height: shape.height * shape.scaleY,
          fill: shape.fill,
          angle: shape.angle,
        };
      } else if (shape.type === 'circle') {
        annotationAbsolut.type = 'circle';
        annotationAbsolut.settings = {
          id: shape.id,
          left: shape.left,
          top: shape.top,
          radius: shape.radius * shape.scaleX,
          fill: shape.fill,
          angle: shape.angle,
        };
      } else if (shape.text) {
        annotationAbsolut.type = 'text';
        annotationAbsolut.settings = {
          id: shape.id,
          left: shape.left,
          top: shape.top,
          text: shape.text,
          fontSize: shape.fontSize,
          fill: shape.fill,
          angle: shape.angle,
        };
      }

      this.emitter.emit({
        event: 'AnnotationsComponent:MODIFY_SHAPE',
        data: {
          annotation: annotationAbsoluteToRelative(annotationAbsolut, this.canvasWidth, this.canvasHeight),
          page: this.currentPage,
        },
      });
    }
  }

}
