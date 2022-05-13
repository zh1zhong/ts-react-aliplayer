export default class Volume {
  player: any

  constructor(player: any) {
    this.player = player
  }

  createEl(el: any): void
  ready(player: any, e: any): void
  play(player: any, e: any): void
  pause: (player: any, e: any) => void
}
