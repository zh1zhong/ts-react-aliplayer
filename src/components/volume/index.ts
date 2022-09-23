export default class Volume {
  constructor(player: any) {
    this.player = player
  }

  player: any

  getCurrentVolume = () => {
    if (!this.player) return 0
    const volueNum = this.player.getVolume()
    const voluePercentage = `${Math.round(volueNum * 100)}%`
    return voluePercentage
  }

  // 更新按钮图标
  syncVolumeIcon = (volumeNum) => {
    const volumenBtn = document.getElementsByClassName('custom-volumeBtn')[0] // 自定义功能按钮
    if (volumeNum < 50 && volumeNum > 0) {
      volumenBtn.className = 'custom-volumeBtn small'
    } else if (volumeNum === 0) {
      volumenBtn.className = 'custom-volumeBtn mute'
    } else {
      volumenBtn.className = 'custom-volumeBtn'
    }
  }

  // 悬停和离开控制条中的音量按钮时，需要同步音量数据
  setVolume = () => {
    const volumeControl = document.getElementsByClassName('prism-volume-control')[0]
    const volumeValue = volumeControl.getElementsByClassName('volume-value')[0]
    const volumeCursor = volumeControl.getElementsByClassName('volume-cursor')[0]
    const volumeText = volumeControl.getElementsByClassName('volume-text')[0]
    const currentVolume = this.getCurrentVolume()
    volumeText.innerHTML = currentVolume
    volumeValue.style.height = currentVolume
    volumeCursor.style.bottom = currentVolume
    if (currentVolume) this.syncVolumeIcon(parseFloat(currentVolume.split('%')[0]))
  }

  // 拖动音量滑动按钮时，同步音量到顶部显示
  syncVolumeText = () => {
    const volumeControl = document.getElementsByClassName('prism-volume-control')[0] // 音量面板
    const volumeCursor = volumeControl.getElementsByClassName('volume-cursor')[0] // 音量滑动按钮
    const volumeText = volumeControl.getElementsByClassName('volume-text')[0] // 音量数值
    setTimeout(() => {
      let volumeNum = parseFloat(volumeCursor.style.bottom.split('%')[0])
      volumeNum = volumeNum >= 99 ? 100 : Math.round(volumeNum)
      volumeText.innerHTML = `${volumeNum}%`
      this.syncVolumeIcon(volumeNum)
    }, 0)
  }

  dblclickFun = () => {
    const playBtn = document.getElementsByClassName('prism-big-play-btn')[0];
    if (!this.player) return;
    const playerStatus = this.player.getStatus()
    const canPlayStatus = ['ready', 'pause', 'ended']
    if (canPlayStatus.includes(playerStatus)) {
      if (this.player.getStatus() === 'ended') {
        this.player.seek(0);
      }
      this.player.play();
    } else {
      this.player.pause();
      playBtn.style.display = 'block';
    }
  }

  // 添加音量按钮
  addVolumeBtn = () => {
    const controlBar = document.getElementsByClassName('prism-controlbar')[0]
    const volumeDefaultBtn = controlBar.getElementsByClassName('prism-volume')[0]
    const volumeControl = document.getElementsByClassName('prism-volume-control')[0] // 音量面板
    const volumeRange = volumeControl.getElementsByClassName('volume-range')[0]
    const volumeCursor = volumeControl.getElementsByClassName('volume-cursor')[0] // 音量滑动按钮
    const volumeText = document.createElement('div') // 音量数值
    volumeText.className = 'volume-text'
    const volumeBtn = document.createElement('div') // 音量图标
    volumeBtn.className = 'custom-volumeBtn'
    // volumeBtn.innerHTML = '音量';
    // 添加元素到控制栏
    volumeDefaultBtn.append(volumeBtn)
    volumeControl.append(volumeText)
    // 给音量面板添加事件
    volumeControl.onmouseover = () => {
      volumeControl.style.left = `${volumeDefaultBtn.offsetLeft}px`
      volumeControl.style.display = 'block'
      // 保持控制面板显示
      // this.controlOnShow = true
      controlBar.className = 'prism-controlbar show-prism-controlbar'
    }
    volumeControl.onmouseleave = () => {
      volumeControl.style.display = 'none'
    }
    volumeControl.onmousemove = () => {
      this.syncVolumeText()
    }
    // 音量滑动按钮
    volumeCursor.onmousemove = () => {
      this.syncVolumeText()
    }
    // 音量滑动条
    volumeRange.onmouseup = () => {
      this.syncVolumeText()
    }

    // 给控制栏中的音量按钮添加事件
    let lastVolumeValue = 1
    volumeBtn.onmouseover = () => {
      this.setVolume()
      volumeControl.style.left = `${volumeDefaultBtn.offsetLeft}px`
      volumeControl.style.display = 'block'
    }
    volumeBtn.onmouseleave = () => {
      volumeControl.style.display = 'none'
    }
    volumeBtn.onclick = () => {
      if (!this.player) return
      if (volumeControl.style.display !== 'block') {
        this.player.setVolume(this.player.getVolume())
        volumeControl.style.left = `${volumeDefaultBtn.offsetLeft}px`
        volumeControl.style.display = 'block'
      } else if (this.player.getVolume() > 0) {
        lastVolumeValue = this.player.getVolume()
        this.player.setVolume(0)
      } else {
        this.player.setVolume(lastVolumeValue)
      }
      this.setVolume()
    }
  }

  // 绑定播放区域的鼠标事件
  bindPlayerEvent = () => {
    const playerArea = document.getElementById('player-con');
    const videoArea = document.getElementsByTagName('video')[0];
    const controlBar = document.getElementsByClassName('prism-controlbar')[0];
    const playBtn = document.getElementsByClassName('prism-big-play-btn')[0];
    const animationArea = document.getElementsByClassName('prism-animation')[0];
    const memoryArea = document.getElementsByClassName('memory-play-wrap')[0];
    // 绑定视频的双击事件
    videoArea.ondblclick = () => {
      this.dblclickFun();
    }
    playerArea.ondblclick = () => {
      this.dblclickFun();
    }

    // 当鼠标滑过不同控件时，保持控制条的显示
    animationArea.onmouseover = () => { this.controlOnShow = true; }
    playBtn.onmouseover = () => { this.controlOnShow = true; }
    memoryArea.onmouseover = () => { this.controlOnShow = true; }
    const initClassName = videoArea.className;
    let pointerStopTimer = null;
    const ceateTimer = () => {
      // 此处一定要先清除后return
      if (pointerStopTimer) clearTimeout(pointerStopTimer);
      if (this.controlOnHover) return
      pointerStopTimer = setTimeout(() => {
        videoArea.className = `${initClassName} hideCursor`;
        controlBar.className = 'prism-controlbar';
      }, 3000) // 鼠标在视频区域中停留3S后，鼠标和操作栏消失
    }
    // 视频标签区域
    playerArea.onmouseover = () => {
      this.controlOnShow = true;
      controlBar.className = 'prism-controlbar show-prism-controlbar';
      ceateTimer();
      playerArea.onmousemove = () => {
        videoArea.className = initClassName;
        controlBar.className = 'prism-controlbar show-prism-controlbar';
        ceateTimer();
      }
    }
    playerArea.onmouseleave = () => {
      this.controlOnShow = false;
      playerArea.onmousemove = null;
      if (pointerStopTimer) clearTimeout(pointerStopTimer);
      setTimeout(() => {
        if (!this.controlOnShow) controlBar.className = 'prism-controlbar';
      }, 0);
    }
    videoArea.onmouseover = () => {
      this.controlOnShow = true;
      controlBar.className = 'prism-controlbar show-prism-controlbar';
      ceateTimer();
      videoArea.onmousemove = () => {
        videoArea.className = initClassName;
        controlBar.className = 'prism-controlbar show-prism-controlbar';
        ceateTimer();
      }
    }
    videoArea.onmouseleave = () => {
      this.controlOnShow = false;
      videoArea.onmousemove = null;
      if (pointerStopTimer) clearTimeout(pointerStopTimer);
      setTimeout(() => {
        if (!this.controlOnShow) controlBar.className = 'prism-controlbar';
      }, 0);
    }
    // 控制条区域
    controlBar.onmouseover = () => {
      this.controlOnShow = true;
      this.controlOnHover = true;
      controlBar.className = 'prism-controlbar show-prism-controlbar';
    }
    controlBar.onmouseleave = () => {
      this.controlOnShow = false;
      this.controlOnHover = false;
      setTimeout(() => {
        if (!this.controlOnShow) controlBar.className = 'prism-controlbar';
      }, 0);
    }
  }

  createEl(el) {
    // console.log('createEl')
    this.addVolumeBtn()
    this.bindPlayerEvent();
  }

  ready(player) {
    // console.log('ready')
    this.player = player
  }

  play(player, e) {
    // console.log('play')
  }

  pause = (player, e) => {
    // console.log('pause')
  }
}
