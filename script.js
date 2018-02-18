const addItemsForm = document.querySelector('.add-items'),
      itemsList = document.querySelector('.plates'),
      items = JSON.parse(localStorage.getItem('items')) || [];

function addItems(event) {
  event.preventDefault();
  const text = (this.querySelector('[name = item]')).value;
  const item = {
    text: text,
    done: false
  };
  items.push(item);
  populateList(items, itemsList);
  localStorage.setItem('items', JSON.stringify(items));
  this.reset();
}

function deleteItem(close) {
  const delItem = close.parentElement;
  delItem.remove();
  const index = delItem.id;
  items.splice(index,1);
  localStorage.setItem('items', JSON.stringify(items));
}

function populateList(plates = [], platesList) {
  platesList.innerHTML = plates.map((plate, i) => {
    return `
      <li id="${i}">
        <input type="checkbox" data-index="${i}" id="item${i}" ${plate.done ? 'checked' : ''}>
        <label for="item${i}">${plate.text}</label>
        <span class="close"></span>
      </li>
    `
  }).join('');
}


function toggleDone(event) {
  if (!event.target.matches('input')) return;
  // console.log(event.target);
  const index = event.target.dataset.index;
  items[index].done = !items[index].done;
  localStorage.setItem('items', JSON.stringify(items));
  populateList(items, itemsList);
}

addItemsForm.addEventListener('submit', addItems);
itemsList.addEventListener('click', toggleDone);

populateList(items, itemsList);

itemsList.addEventListener('click', function(event) {
  const target = event.target;
  const close = target.closest('span');
  if (!close) return;
  deleteItem(close);
});
