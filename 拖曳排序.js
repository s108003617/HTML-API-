
    // 拖曳事件處理
    let draggedItem = null;

    const addDragAndDropEvents = (item) => {
      item.addEventListener('dragstart',  (event) => {
        draggedItem = item;
        item.classList.add('dragging');
      });

      item.addEventListener('dragend', (event) =>  {
        item.classList.remove('dragging');
      });

      item.addEventListener('dragover', (event) =>  {
        event.preventDefault();
      });

      item.addEventListener('drop', (event) =>  {
        event.preventDefault();
        if (this !== draggedItem) {
          let list = draggedItem.parentNode;
          let draggingIndex = [...list.children].indexOf(draggedItem);
          let dropIndex = [...list.children].indexOf(this);

          if (draggingIndex > dropIndex) {
            list.insertBefore(draggedItem, this);
          } else {
            list.insertBefore(draggedItem, this.nextSibling);
          }
          updatePlaylist(); // 更新清單
        }
      });
    };

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