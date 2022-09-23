export default class Rate {
  constructor(player: any) {
    this.player = player
  }
  firstInitialed = false
  player: any

  setPlayRateBtn = () => {
    const rateText =
      this.player._options.language === 'zh-cn' ? '倍速' : 'speed'
    const rateComponents = document.getElementsByClassName('rate-components')[0]
    const rateBtn = document.createElement('div')
    const rateList = document.getElementsByClassName('rate-list')[0]
    console.log(rateList)
    const rateListItem = rateList.getElementsByTagName('li')
    rateBtn.className = 'custom-rateBtn'
    rateBtn.innerHTML = rateText
    rateBtn.onmouseover = () => {
      rateList.style.display = 'block'
    }
    rateBtn.onmouseleave = () => {
      rateList.style.display = 'none'
    }
    rateBtn.onclick = () => {
      rateList.style.display =
        rateList.style.display === 'block' ? 'none' : 'block'
    }
    rateList.onmouseover = () => {
      rateList.style.display = 'block'
    }
    for (let i = 0; i < rateListItem.length; i += 1) {
      rateListItem[i].onclick = (e) => {
        rateBtn.innerHTML =
          e.target.innerText === '1.0x' ? rateText : e.target.innerText
      }
    }
    rateComponents.append(rateBtn)
  }

  createEl(el) {
    this.firstInitialed = true
  }

  ready(player) {
    this.player = player
    this.firstInitialed && this.setPlayRateBtn()
    this.firstInitialed = false
  }

  play(player, e) {
    // console.log('play')
  }

  pause = (player, e) => {
    // console.log('pause')
  }
}
