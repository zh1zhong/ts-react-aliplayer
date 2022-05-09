import Player from './components/player';
import './player.less';
declare global {
    interface playObj {
        init: any;
    }
    interface aliplayerObj {
        player: playObj;
    }
    interface Window {
        aliplayerObj: aliplayerObj;
        AliPlayerComponent: object;
    }
}
export default Player;
