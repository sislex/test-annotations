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
    }
  }

return annotationAbsolute;
}
