// 拖曳事件處理
let draggedItem = null;

const addDragAndDropEvents = (item) => {
  item.addEventListener('dragstart', (event) => {
    draggedItem = item;
    item.classList.add('dragging');
  });

  item.addEventListener('dragend', (event) => {
    item.classList.remove('dragging');
  });

  item.addEventListener('dragover', (event) => {
    event.preventDefault();
  });

  item.addEventListener('drop', (event) => {
    event.preventDefault();
    const dropTarget = event.currentTarget; // 使用 event.currentTarget 代替 this
    if (dropTarget !== draggedItem) {
      let list = draggedItem.parentNode;
      let draggingIndex = [...list.children].indexOf(draggedItem);
      let dropIndex = [...list.children].indexOf(dropTarget);

      if (draggingIndex > dropIndex) {
        if (dropIndex === 0) {
          list.insertBefore(draggedItem, dropTarget); // 將項目放在第一個 li 前面
        } else {
          list.insertBefore(draggedItem, dropTarget);
        }
      } else {
        list.insertBefore(draggedItem, dropTarget.nextSibling);
      }
      updatePlaylist(); // 更新清單
    }
  });
};

// 初始化拖曳事件處理
document.querySelectorAll('#sortableList li').forEach(item => {
  addDragAndDropEvents(item);
});

// 初次更新播放清單
updatePlaylist();

// 添加新項目時附加拖曳事件處理
new MutationObserver(() => {
  document.querySelectorAll('#sortableList li').forEach(item => {
    if (!item.dataset.draggableSet) {
      addDragAndDropEvents(item);
      item.dataset.draggableSet = 'true';
    }
  });
}).observe(btnsli, { childList: true });
