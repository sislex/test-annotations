export function scrollToElementPage(id: string, behavior: 'smooth' | 'auto' = 'smooth' ) {
  if (document) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({behavior});
    }
  }
}


