export function annotationRelativeToAbsolute(annotation: any, width: number, height: number) {
  let annotationAbsolute = annotation;
  if (annotation) {
    const settings = annotationAbsolute.settings;
    if (annotation.type === 'rect') {
      annotationAbsolute = {
        ...annotationAbsolute,
        settings: {
          ...settings,
          left: settings.left * width/100,
          top: settings.top * height/100,
          width: settings.width * width/100,
          height: settings.height * height/100,
        },
      };
    } else if (annotation.type === 'circle') {
      annotationAbsolute = {
        ...annotationAbsolute,
        settings: {
          ...settings,
          left: settings.left * width / 100,
          top: settings.top * height / 100,
          radius: settings.radius * Math.min(width, height) / 100, // Для круга берем минимальное значение ширины или высоты
        },
      };
    } else if (annotation.type === 'text') {
      annotationAbsolute = {
        ...annotationAbsolute,
        settings: {
          ...settings,
          left: settings.left * width / 100,
          top: settings.top * height / 100,
          fontSize: settings.fontSize * Math.min(width, height) / 100, // Для текста масштабируем размер шрифта пропорционально минимальному значению ширины или высоты
        },
      };
    }
  }

return annotationAbsolute;
}
