import React, { useEffect, memo } from 'react'

import AliplayerClass from '../aliplayer'

/*
  待适配场景：
  1. 一个页面创建多个播放器

*/

const defaultOptions = {
  // source: '',
  width: '100%',
  height: '500px',
  autoplay: true,
  isLive: false,
  rePlay: false,
  playesinline: true,
  preload: true,
  /*
    控制面板的实现，默认值为：hover。取值：
    click：点击。
    hover：停留。
    always：一直。
    never：隐藏整个控制面板
  */
  controlBarVisibility: 'always',
  useH5Prism: true,
  // HD(超清),SD(高清),LS(标清),FD(流畅),OD(原画)
  definition: 'HD,SD,LD,FD',
  // 清晰度排列顺序
  qualitySort: 'desc',
  // 默认清晰度
  defaultDefinition: 'HD',
}

interface PlayerProps {
  url: string
  options: object
  events: object
}

const Player: React.FC<PlayerProps> = (props) => {
  const { url, options = {}, events = {} } = props
  // const [player, setPlayer] = useState(null)
  if (!url) return
  window.aliplayerObj = {}
  const initPlayer = () => {
    console.log('初始化播放器', window.Aliplayer)
    if (window.Aliplayer && !window.aliplayerObj.player) {
      // window.aliplayer.created = true
      window.aliplayerObj.player = new AliplayerClass()
      window.aliplayerObj.player.init(
        url,
        {
          ...defaultOptions,
          ...options,
        },
        events
      )
    }
  }

  const cssLink = `https://g.alicdn.com/de/prismplayer/2.9.19/skins/default/aliplayer-min.css`
  const scriptSrc = `https://g.alicdn.com/de/prismplayer/2.9.19/aliplayer-min.js`

  const init = () => {
    const linkID = 'app__aliplayer-min-css'
    const scriptID = 'app__aliplayer-min-js'
    const componentID = 'app_aliplayer-component-min-js'
    const head = document.getElementsByTagName('head')
    const html = document.getElementsByTagName('html')
    const linkIDTag = document.getElementById(linkID)
    let scriptTag: any = document.getElementById(scriptID)
    let componentTag: any = document.getElementById(scriptID)
    if (!linkIDTag) {
      // console.log('linkIDTag');
      const link = document.createElement('link')
      link.type = 'text/css'
      link.rel = 'stylesheet'
      link.href = cssLink
      link.id = linkID
      // link.className = linkID;
      head[0].appendChild(link)
    }
    if (!componentTag) {
      componentTag = document.createElement('script')
      componentTag.type = 'text/javascript'
      componentTag.id = componentID
      componentTag.src = '/aliplayer/aliplayercomponents-1.0.8.min.js'
      html[0].appendChild(componentTag)
    }
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.type = 'text/javascript'
      scriptTag.id = scriptID
      // scriptTag.className = scriptID;
      scriptTag.src = scriptSrc
      html[0].appendChild(scriptTag)

      //兼容单页加载和硬加载
      scriptTag.addEventListener('load', () => {
        console.log('loaded')
        if (!window?.aliplayerObj?.player) {
          console.log('loadedInit')
          initPlayer()
        }
      })
    } else {
      console.log('tagCreated')
      initPlayer() //这样是为了兼容页面上有多个播放器
    }
  }

  useEffect(() => {
    // TODO: 一个把console编程comment的工具，开发环境把comment变成console的工具
    console.log('useEffect')
    init()
    return () => {
      console.log('播放器卸载')
      window.aliplayerObj?.player?.dispose()
      window.aliplayerObj = {}
    }
  }, [])

  return (
    <div>
      <p>这是播放器的title</p>
      <div id="player-con"></div>
    </div>
  )
}

export default memo(Player)
