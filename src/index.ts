import Player from './player'
import './player.less'

declare global {
  interface playObj {
    init: any
    dispose: any
  }

  interface aliplayerObj {
    player: playObj
  }

  interface AliPlayerComponentObj {
    MemoryPlayComponent: object
    RateComponent: object
    QualityComponent: object
  }

  interface Window {
    aliplayerObj: aliplayerObj
    AliPlayerComponent: AliPlayerComponentObj
    // AliPlayerComponent: object
    Aliplayer: (options: any, events: any) => any
  }
}

export default Player
