export function annotationAbsoluteToRelative(annotation: any, width: number, height: number) {
  let annotationRelative = annotation;
  if (annotation) {
    const settings = annotationRelative.settings;
    if (annotation.type === 'rect') {
      annotationRelative = {
        ...annotationRelative,
        settings: {
          ...settings,
          left: settings.left / (width / 100),
          top: settings.top / (height / 100),
          width: settings.width / (width / 100),
          height: settings.height / (height / 100),
          id: settings.id
        },
      };
    } else if (annotation.type === 'circle') {
      annotationRelative = {
        ...annotationRelative,
        settings: {
          ...settings,
          left: settings.left / (width / 100),
          top: settings.top / (height / 100),
          radius: settings.radius / (Math.min(width, height) / 100),
          id: settings.id
        },
      };
    } else if (annotation.type === 'text') {
      annotationRelative = {
        ...annotationRelative,
        settings: {
          ...settings,
          left: settings.left / (width / 100),
          top: settings.top / (height / 100),
          fontSize: settings.fontSize / (Math.min(width, height) / 100),
          id: settings.id
        },
      };
    }
  }

  return annotationRelative;
}
