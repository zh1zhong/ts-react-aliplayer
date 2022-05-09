import fullscreensvg from '@src/static/svgs/full-screen.svg'

export default class SetIcons {
  constructor() {
    this.fullScreenBtn = null
  }

  createEl(el) {
    console.log('createEl')
    this.fullScreenBtn = document.getElementsByClassName('prism-fullscreen-btn')[0]
    // this.fullScreenBtn.style

  }

  ready(player,e) {
    console.log('ready')
  }

  play(player,e) {
    console.log('play')
  }

  pause = (player,e) => {
    console.log('pause')
  }
}
