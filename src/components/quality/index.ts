export default class Quality {
  constructor(player: any) {
    this.player = player
  }
  firstInitialed = false
  player: any

  editQualityBtn = () => {
    this.firstInitialed = true
    const qualityComponents =
      document.getElementsByClassName('quality-components')[0]
    if (qualityComponents) {
      const qualityBtn =
        qualityComponents.getElementsByClassName('current-quality')[0]
      const qualityList =
        qualityComponents.getElementsByClassName('quality-list')[0]
      qualityBtn.onmouseover = () => {
        qualityList.style.display = 'block'
      }
      qualityBtn.onmouseleave = () => {
        qualityList.style.display = 'none'
      }
      qualityBtn.onclick = () => {
        qualityList.style.display =
          qualityList.style.display === 'block' ? 'none' : 'block'
      }
    }
  }

  onReady = (player) => {
    console.log('onReady')
    // eslint-disable-next-line no-underscore-dangle
    if (player._urls.length === 0) return
    const qualityComponents =
      document.getElementsByClassName('quality-components')[0]
    if (qualityComponents) {
      // 清晰度列表数组
      const qualities = ['4K', '2K', 'HD', 'SD', 'LD', 'FD', 'OD']
      const qualityBtn =
        qualityComponents.getElementsByClassName('current-quality')[0]
      const qualityList =
        qualityComponents.getElementsByClassName('quality-list')[0]
      // eslint-disable-next-line no-underscore-dangle
      // eslint-disable-next-line no-underscore-dangle
      const {
        _options: { qualitySort },
      } = player
      // 根据qualitySort字段对清晰度排序
      const sortedQualityList =
        qualitySort === 'asc' ? qualities : qualities.reverse()
      const qualityElements = [...qualityList.getElementsByTagName('li')]
      qualityElements.sort(
        (cur, next) =>
          sortedQualityList.indexOf(next.dataset.def) -
          sortedQualityList.indexOf(cur.dataset.def),
      )
      qualityList.append(...qualityElements)

      let curPlayVod: any = {}
      if (this.firstInitialed) {
        curPlayVod = player._urls.find(
          (item) => item.definition === player._options.defaultDefinition,
        )
        player._options.source = curPlayVod.Url
      } else {
        curPlayVod = player._urls.find(
          (item) => item.Url === player._options.source,
        )
      }
      const { desc, definition } = curPlayVod

      const currentQualityEle = [
        ...qualityList.getElementsByTagName('li'),
      ].find((ele) => ele.dataset.def === definition)
      currentQualityEle.className = 'current'

      qualityBtn.innerText = desc

      if (this.firstInitialed) this.firstInitialed = false
    }
  }

  createEl(el) {
    // console.log('createEl')
    this.editQualityBtn()
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
