import { Map } from './map'
import Player from './player/player'

export default class MiniMap {
  camera: Phaser.Cameras.Scene2D.BaseCamera
  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, map: Map) {
    this.camera = scene.cameras
      .add(x, y, width, height)
      .setZoom(1 / 8)
      .setName('mini')
      .setBounds(map.size.x, map.size.y, map.size.width, map.size.height)
      .setBackgroundColor(0x81bdd2ff)
      .setAlpha(0.75)
  }

  setIgnore(gameObject: any[]) {
    gameObject.forEach(obj => {
      this.camera.ignore(obj)
    })
  }

  update(player: Player) {
    this.camera.scrollX = player.x
    this.camera.scrollY = player.y
  }
}
