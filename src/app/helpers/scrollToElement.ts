export function scrollToElementPage(id: string) {
  if (document) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }
}

export function scrollToElementThumbnail(id: string) {
  if (document) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }
}
