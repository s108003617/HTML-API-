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
   vr: document.querySelector("#videorange"),
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
  let volume = parseFloat(e.target.value);
  // 範圍檢查，確保volume在 0 到 1 之間
  if (volume < 0) {
    volume = 0;
  } else if (volume > 1) {
    volume = 1;
  }
  // console.log(e.target.value);//輸出現在的音量
  player.volume = volume; // 正確設置volume到播放器元素
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
     // 自動播放上傳的影片
     player.src = url;
     player.play();
   }
 });

//  const playerListener = event => {
//   console.log(`
//     ${event.type}
//     duration: ${player.duration}, currentTime: ${player.currentTime},
//     volume: ${player.volume}, muted: ${player.muted}, paused: ${player.paused}
//   `);
// };
// player.addEventListener('loadedmetadata', playerListener); 
// player.addEventListener('timeupdate', playerListener); 
// player.addEventListener('ended', playerListener);

// 監聽播放器的 timeupdate 事件，當播放進度發生變化時執行相應的操作
player.addEventListener('timeupdate', () => {
  // 獲取目前影片的時間點並計算出進度百分比
  const currentTime = player.currentTime;
  const duration = player.duration;
  const progress = parseInt((currentTime / duration) * 100);
  // 將進度百分比設置為 input 元素的值
  btns.vr.innerHTML = progress + "%";
  videoControl.value = progress;
});

// 監聽 input 事件，當用戶拖動 input 時執行相應的操作
videoControl.addEventListener('input', () => {
  // 獲取拖動的值（進度百分比），並將其轉換為影片的時間
  const progress = videoControl.value;
  const duration = player.duration;
  const currentTime = (progress / 100) * duration;
  // 將影片的播放時間設置為所選的時間點
  player.currentTime = currentTime;
});

// 監聽影片播放結束事件
player.addEventListener('ended', () => {
  // 播放下一個影片
  playNextVideo();
});

// 播放下一個影片的函數
function playNextVideo() {
  // 檢查是否還有下一個 li 元素
  if (currentIndex < btnsli.children.length - 1) {
      currentIndex++;
      const nextItem = btnsli.children[currentIndex];
      player.src = nextItem.dataset.src || '';
      player.play();
  }
}

