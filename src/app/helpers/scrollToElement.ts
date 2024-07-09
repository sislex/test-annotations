export function scrollToElement(id: string) {
  if (document) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior: 'smooth'});
    }
  }
}
