//設變數取得元素
 const btnsli = document.querySelector("#sortableList");
 const btnsDiv = document.querySelector(".btns");
 const btns = {
   ctrl: document.querySelector("#control"),
   ctrl2: document.querySelector("#control2"),
   prev: document.querySelector("#prev"),
   next: document.querySelector("#next"),
   volume: document.querySelector("#volumeControl"),
   fileInput: document.querySelector("#fileInput"),
   add: document.querySelector("#add"),
 };

 const player = document.querySelector("#player");
 let currentIndex = 0; // 目前播放的視頻索引

 // 更新播放清單
 const updatePlaylist = () => {
   document.querySelectorAll('#sortableList li').forEach((item, index) => {
     // 點擊刪除按鈕刪除項目
     item.querySelector('span').onclick = () => {
       item.remove();
       updatePlaylist(); // 更新清單
     };
     // 點擊播放項目
     item.onclick = () => {
       currentIndex = index;
       player.src = item.dataset.src || '';
       player.play();
     };
   });
 };

 // 播放按鈕
 btns.ctrl.addEventListener("click", () => player.play());

 // 暫停按鈕
 btns.ctrl2.addEventListener("click", () => player.pause());

 // 上一部按鈕
 btns.prev.addEventListener("click", () => {
   if (currentIndex > 0) {
     currentIndex--;
     const item = btnsli.children[currentIndex];
     player.src = item.dataset.src || '';
     player.play();
   }
 });

 // 下一部按鈕
 btns.next.addEventListener("click", () => {
   if (currentIndex < btnsli.children.length - 1) {
     currentIndex++;
     const item = btnsli.children[currentIndex];
     player.src = item.dataset.src || '';
     player.play();
   }
 });

 // 音量控制
 btns.volume.addEventListener("input", (e) => {
   player.volume = e.target.value;
 });

 // 增加新影片按鈕
 btns.add.addEventListener("click", () => {
   btns.fileInput.click(); // 點擊隱藏的文件輸入按鈕
 });

 // 處理文件選擇
 btns.fileInput.addEventListener("change", (e) => {
   const file = e.target.files[0];
   if (file) {
     const url = URL.createObjectURL(file);
     const listItem = document.createElement('li');
     listItem.draggable = true;
     listItem.innerHTML = `${file.name} <span class="remove-btn">x</span>`;
     listItem.dataset.src = url;
     btnsli.appendChild(listItem);
     updatePlaylist(); // 更新清單
   }
 });