import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import * as fabric from 'fabric';
import {IAddAnnotation} from "../../+state/annotation/annotation.reducer";

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

  private canvas!: fabric.Canvas;
  private isDrawing = false;
  private startX = 0;
  private startY = 0;
  private rect!: fabric.Rect;
  private circle!: fabric.Circle;
  private textbox!: fabric.Textbox;
  private imageField!: fabric.Image;

  constructor() {}

  ngAfterViewInit(): void {
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

    this.canvas.on('mouse:down', (options) => {
      if (this.addAnnotation) {
        if (this.addAnnotation.type === 'rect') {

            if (options.target) {
              this.isDrawing = false;
              return;
            }

            this.isDrawing = true;
            const pointer = this.canvas.getPointer(options.e);
            this.startX = pointer.x;
            this.startY = pointer.y;
            this.rect = new fabric.Rect({
              left: this.startX,
              top: this.startY,
              fill: 'rgba(21, 1, 110)',
              width: 0,
              height: 0
            });
            this.canvas.add(this.rect);

          this.canvas.on('mouse:move', (options) => {
            if (!this.isDrawing) return;

            const pointer = this.canvas.getPointer(options.e);
            this.rect.set({
              width: Math.abs(pointer.x - this.startX),
              height: Math.abs(pointer.y - this.startY)
            });

            if (pointer.x < this.startX) {
              this.rect.set({left: pointer.x});
            }
            if (pointer.y < this.startY) {
              this.rect.set({top: pointer.y});
            }

            this.rect.setCoords();
            this.canvas.renderAll();
          });

          this.canvas.on('mouse:up', () => {
            this.isDrawing = false;
          });
        } else if (this.addAnnotation.type === 'text') {
          this.canvas.on('mouse:down', (options) => {
            // Логика для создания текстового поля
            if (options.target) {
              this.isDrawing = false;
              return; // Прерываем, если кликнули на объект
            }

            this.isDrawing = true;
            const pointer = this.canvas.getPointer(options.e);
            this.startX = pointer.x;
            this.startY = pointer.y;

            // Создание текстового поля вместо прямоугольника
            this.textbox = new fabric.Textbox('Введите текст', {
              left: this.startX,
              top: this.startY,
              width: 150,
              fontSize: 20,
              borderColor: 'rgba(255, 0, 0, 0.5)',
              cornerColor: 'rgba(255, 0, 0, 0.5)',
              cornerSize: 6,
              transparentCorners: false
            });

            this.canvas.add(this.textbox);
          });

          this.canvas.on('mouse:move', (options) => {
            if (!this.isDrawing) return;

            const pointer = this.canvas.getPointer(options.e);

            // Логика для обновления положения текстового поля при движении мыши
            this.textbox.set({
              left: pointer.x,
              top: pointer.y
            });

            this.canvas.renderAll();
          });

          this.canvas.on('mouse:up', () => {
            this.isDrawing = false;
          });
        } else if (this.addAnnotation.type === 'circle') {
          this.canvas.on('mouse:down', (options) => {
            if (options.target) {
              this.isDrawing = false;
              return; // Прерываем, если кликнули на объект
            }

            this.isDrawing = true;
            const pointer = this.canvas.getPointer(options.e);
            this.startX = pointer.x;
            this.startY = pointer.y;

            // Рассчитываем радиус круга
            const radius = Math.abs(pointer.x - this.startX);

            this.circle = new fabric.Circle({
              left: this.startX,
              top: this.startY,
              radius: radius,
              fill: 'rgba(110, 1, 21)',
            });

            this.canvas.add(this.circle);
          });

          this.canvas.on('mouse:move', (options) => {
            if (!this.isDrawing) return;

            const pointer = this.canvas.getPointer(options.e);
            const radius = Math.abs(pointer.x - this.startX);

            this.circle.set({
              radius: radius
            });

            this.circle.setCoords();
            this.canvas.renderAll();
          });

          this.canvas.on('mouse:up', () => {
            this.isDrawing = false;
          });
        }
      }
    });

    if (this.addAnnotation) {
      if (this.addAnnotation.type === 'rect') {

        this.canvas.on('mouse:down', (options) => {
          if (options.target) {
            this.isDrawing = false;
            return; // Прерываем, если кликнули на объект

          }


          this.isDrawing = true;
          const pointer = this.canvas.getPointer(options.e);
          this.startX = pointer.x;
          this.startY = pointer.y;
          this.rect = new fabric.Rect({
            left: this.startX,
            top: this.startY,
            fill: 'rgba(21, 1, 110)',
            width: 0,
            height: 0
          });
          this.canvas.add(this.rect);
        });


        this.canvas.on('mouse:move', (options) => {
          if (!this.isDrawing) return;

          const pointer = this.canvas.getPointer(options.e);
          this.rect.set({
            width: Math.abs(pointer.x - this.startX),
            height: Math.abs(pointer.y - this.startY)
          });

          if (pointer.x < this.startX) {
            this.rect.set({left: pointer.x});
          }
          if (pointer.y < this.startY) {
            this.rect.set({top: pointer.y});
          }

          this.rect.setCoords();
          this.canvas.renderAll();
        });

        this.canvas.on('mouse:up', () => {
          this.isDrawing = false;
        });
      } else if (this.addAnnotation.type === 'text') {
        this.canvas.on('mouse:down', (options) => {
          // Логика для создания текстового поля
          if (options.target) {
            this.isDrawing = false;
            return; // Прерываем, если кликнули на объект
          }

          this.isDrawing = true;
          const pointer = this.canvas.getPointer(options.e);
          this.startX = pointer.x;
          this.startY = pointer.y;

          // Создание текстового поля вместо прямоугольника
          this.textbox = new fabric.Textbox('Введите текст', {
            left: this.startX,
            top: this.startY,
            width: 150,
            fontSize: 20,
            borderColor: 'rgba(255, 0, 0, 0.5)',
            cornerColor: 'rgba(255, 0, 0, 0.5)',
            cornerSize: 6,
            transparentCorners: false
          });

          this.canvas.add(this.textbox);
        });

        this.canvas.on('mouse:move', (options) => {
          if (!this.isDrawing) return;

          const pointer = this.canvas.getPointer(options.e);

          // Логика для обновления положения текстового поля при движении мыши
          this.textbox.set({
            left: pointer.x,
            top: pointer.y
          });

          this.canvas.renderAll();
        });

        this.canvas.on('mouse:up', () => {
          this.isDrawing = false;
        });
      } else if (this.addAnnotation.type === 'circle') {
        this.canvas.on('mouse:down', (options) => {
          if (options.target) {
            this.isDrawing = false;
            return; // Прерываем, если кликнули на объект
          }

          this.isDrawing = true;
          const pointer = this.canvas.getPointer(options.e);
          this.startX = pointer.x;
          this.startY = pointer.y;

          // Рассчитываем радиус круга
          const radius = Math.abs(pointer.x - this.startX);

          this.circle = new fabric.Circle({
            left: this.startX,
            top: this.startY,
            radius: radius,
            fill: 'rgba(110, 1, 21)',
          });

          this.canvas.add(this.circle);
        });

        this.canvas.on('mouse:move', (options) => {
          if (!this.isDrawing) return;

          const pointer = this.canvas.getPointer(options.e);
          const radius = Math.abs(pointer.x - this.startX);

          this.circle.set({
            radius: radius
          });

          this.circle.setCoords();
          this.canvas.renderAll();
        });

        this.canvas.on('mouse:up', () => {
          this.isDrawing = false;
        });
      }    // Логика для создания поля для изображения
      // else if (this.addAnnotation.type[0].typeShape === 'image') {
      //   let originalLeft: number;
      //   let originalTop: number;
      //
      //   this.canvas.on('mouse:down', (options) => {
      //     if (options.target) {
      //       this.isDrawing = false;
      //       return; // Прерываем, если кликнули на объект
      //     }
      //
      //     this.isDrawing = true;
      //     const pointer = this.canvas.getPointer(options.e);
      //     this.startX = pointer.x;
      //     this.startY = pointer.y;
      //
      //     originalLeft = this.startX;
      //     originalTop = this.startY;
      //
      //     fabric.Image.fromURL('https://masterpiecer-images.s3.yandex.net/c352b1b9801c11ee9607720ccb3e265f:upscaled', (img: fabric.Image) => {
      //       this.imageField = img.set({
      //         left: originalLeft,
      //         top: originalTop,
      //         scaleX: 0.5, // Настройте размер изображения, если необходимо
      //         scaleY: 0.5,
      //       });
      //
      //       this.canvas.add(this.imageField);
      //     });
      //   });
      //
      //   this.canvas.on('mouse:move', (options) => {
      //     if (!this.isDrawing) return;
      //
      //     const pointer = this.canvas.getPointer(options.e);
      //
      //     // Перемещение изображения при движении мыши
      //     this.imageField.set({
      //       left: pointer.x,
      //       top: pointer.y
      //     });
      //
      //     this.canvas.renderAll();
      //   });
      //
      //   this.canvas.on('mouse:up', () => {
      //     this.isDrawing = false;
      //   });
      // }
    }
  }
}
