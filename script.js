const images = document.querySelectorAll('.image');

let draggedImage = null;

images.forEach(image => {
  image.addEventListener('dragstart', dragStart);
  image.addEventListener('dragend', dragEnd);
});

function dragStart() {
  draggedImage = this;
  setTimeout(() => {
    this.classList.add('invisible');
  }, 0);
}

function dragEnd() {
  draggedImage.classList.remove('invisible');
  draggedImage = null;
}

document.addEventListener('dragover', function (event) {
  event.preventDefault();
});

document.addEventListener('drop', function (event) {
  event.preventDefault();
  const dropTarget = event.target.closest('.image');
  if (draggedImage && dropTarget && draggedImage !== dropTarget) {
    const rect1 = draggedImage.getBoundingClientRect();
    const rect2 = dropTarget.getBoundingClientRect();

    const topDiff = rect1.top - rect2.top;
    const leftDiff = rect1.left - rect2.left;

    draggedImage.style.transform = `translate(${leftDiff}px, ${topDiff}px)`;
    dropTarget.style.transform = `translate(${-leftDiff}px, ${-topDiff}px)`;

    setTimeout(() => {
      draggedImage.style.transform = 'none';
      dropTarget.style.transform = 'none';

      const parent = dropTarget.parentNode;
      const index1 = Array.from(parent.children).indexOf(draggedImage);
      const index2 = Array.from(parent.children).indexOf(dropTarget);

      parent.insertBefore(draggedImage, parent.children[index2]);
      parent.insertBefore(dropTarget, parent.children[index1]);
    }, 250);
  }
});
