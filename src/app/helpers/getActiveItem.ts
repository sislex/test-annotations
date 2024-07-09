export function getActiveItem(divElement: HTMLDivElement, topPercent = 30): number {
  let result = 0;
  if (divElement) {
    const children = divElement.children;

    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      const childRect = child.getBoundingClientRect();
      const divRect = divElement.getBoundingClientRect();
      const activeLineTopPosition = divRect.top + ((divRect.height/100)*topPercent);

      if (childRect.bottom >= activeLineTopPosition) {
        return i;
      }
    }
  }

  return result;
}
