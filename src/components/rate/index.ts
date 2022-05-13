export default class Rate {
  constructor(player: any) {
    this.player = player
  }

  player: any

  setPlayRateBtn = () => {
    const rateComponents = document.getElementsByClassName('rate-components')[0]
    const rateBtn = document.createElement('div')
    const rateList = document.getElementsByClassName('rate-list')[0]
    const rateListItem = document.getElementsByTagName('li')
    rateBtn.className = 'custom-rateBtn'
    rateBtn.innerHTML = '倍速'
    rateBtn.onmouseover = () => {
      rateList.style.display = 'block'
    }
    rateBtn.onmouseleave = () => {
      rateList.style.display = 'none'
    }
    rateBtn.onclick = () => {
      rateList.style.display = rateList.style.display === 'block' ? 'none' : 'block'
    }
    rateList.onmouseover = () => {
      rateList.style.display = 'block'
    }
    for (let i = 0; i < rateListItem.length; i += 1) {
      rateListItem[i].onclick = (e) => {
        rateBtn.innerHTML = e.target.innerText === '1.0x' ? '倍速' : e.target.innerText
      }
    }
    rateComponents.append(rateBtn)
  }

  createEl(el) {
    // console.log('createEl')
    this.setPlayRateBtn()
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
