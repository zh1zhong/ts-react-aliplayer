export default class Quality {
  constructor(player: any) {
    this.player = player
  }

  player: any

  editQualityBtn = () => {
    const qualityComponents = document.getElementsByClassName('quality-components')[0]
    if (qualityComponents) {
      const qualityBtn = qualityComponents.getElementsByClassName('current-quality')[0]
      const qualityList = qualityComponents.getElementsByClassName('quality-list')[0]
      qualityBtn.onmouseover = () => {
        qualityList.style.display = 'block'
      }
      qualityBtn.onmouseleave = () => {
        qualityList.style.display = 'none'
      }
      qualityBtn.onclick = () => {
        qualityList.style.display = qualityList.style.display === 'block' ? 'none' : 'block'
      }
    }
  }

  onReady = (player) => {
    // eslint-disable-next-line no-underscore-dangle
    if (player._urls.length === 0) return
    const qualityComponents = document.getElementsByClassName('quality-components')[0]
    if (qualityComponents) {
      const qualityBtn = qualityComponents.getElementsByClassName('current-quality')[0]
      const qualityList = qualityComponents.getElementsByClassName('quality-list')[0]
      // eslint-disable-next-line no-underscore-dangle
      const initQuality = player._urls[0].desc
      // qualityList.getElementsByTagName('li')[0].className = 'active'
      qualityBtn.innerText = initQuality
    }
  }

  createEl(el) {
    // console.log('createEl')
    // this.editQualityBtn()
  }

  ready(player) {
    // console.log('ready')
    this.player = player
    this.onReady(player)
  }

  play(player, e) {
    // console.log('play')
  }

  pause = (player, e) => {
    // console.log('pause')
  }
}
