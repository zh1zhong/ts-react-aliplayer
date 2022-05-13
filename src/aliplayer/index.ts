import CustomVolume from '../components/volume'
import CustomRate from '../components/rate'
class AliPlayer {
  init = (url, options, events) => {
    const { showQuality = false, autoplay = true } = options
    const {
      ready = () => {},
      startPlay = () => {},
      pausePlay = () => {},
      timeUpdate = null,
      ended = () => {},
      onError = () => {},
      onRequestFullscreen = () => {},
      onCancelFullscreen = () => {},
      getLastTime = () => {},
    } = events

    const requireComponents = [
      {
        name: 'MemoryPlayComponent',
        type: window.AliPlayerComponent.MemoryPlayComponent,
        args: [false, getLastTime],
      },
      {
        name: 'RateComponent',
        type: window.AliPlayerComponent.RateComponent,
      },
      {
        name: 'Volume',
        type: CustomVolume,
      },
      {
        name: 'Rate',
        type: CustomRate,
      },
    ]

    if (showQuality)
      requireComponents.push({
        name: 'QualityComponent',
        type: window.AliPlayerComponent.QualityComponent,
      })

    return window.Aliplayer(
      {
        id: 'player-con',
        // 播放方式一：支持播放地址播放，此播放方式优先级最高
        source: url,
        // 播放方式二：点播用户推荐
        // vid: videoMd5,
        // playauth,
        // videoWidth: `${videoWidth}px`,
        // videoHeight: `${videoHeight}px`,
        ...options,
        components: requireComponents,
        skinLayout: [
          { name: 'bigPlayButton', align: 'cc' },
          { name: 'H5Loading', align: 'cc' },
          { name: 'errorDisplay', align: 'tlabs', x: 0, y: 0 },
          { name: 'infoDisplay' },
          { name: 'tooltip', align: 'blabs', x: 0, y: 56 },
          { name: 'thumbnail' },
          {
            name: 'controlBar',
            align: 'blabs',
            children: [
              { name: 'progress', align: 'blabs', x: 0, y: 44 },
              { name: 'playButton', align: 'tl', x: 20, y: 17 },
              { name: 'timeDisplay', align: 'tl', x: 45, y: 7 },
              { name: 'fullScreenButton', align: 'tr', x: 20, y: 15 },
              { name: 'volume', align: 'tr', x: 38, y: 15 },
            ],
          },
        ],
      },
      (player) => {
        player.on('ready', () => {
          ready(player)
          if (autoplay) player.play()
        })
        // player.on('waiting', () => ready(player))
        player.on('play', () => startPlay(player))
        player.on('pause', () => pausePlay(player))
        player.on('timeupdate', () => timeUpdate(player)) // 无效？
        player.on('ended', () => ended(player))
        player.on('error', () => onError(player))
        player.on('requestFullScreen', () => onRequestFullscreen(player))
        player.on('cancelFullScreen', () => onCancelFullscreen(player))
        // player.on('sourceloaded', () => {})
      }
    )
  }
}

export default AliPlayer
