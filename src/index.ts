import Player from './components/player'
import './player.less'

declare global {
  // type playerObj = object

  interface playObj {
    init: any
  }

  interface aliplayerObj {
    player: playObj
  }

  interface Window {
    aliplayerObj: aliplayerObj
    AliPlayerComponent: object
  }

  // interface PlayerObject extends Object {
  //   player: object
  // }
}

export default Player
