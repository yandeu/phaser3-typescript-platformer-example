import Player from './player/player'

export default class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    super(scene, 0, 0, 0, 0, 'background')
    scene.add.existing(this)

    this.setOrigin(0.5).setScrollFactor(0)
  }

  adjustPosition() {
    this.x = this.scene.cameras.main.centerX
    this.y = this.scene.cameras.main.centerY
    this.width = this.scene.cameras.main.width
    this.height = this.scene.cameras.main.height
  }

  parallax(player: Player) {
    this.tilePositionX += player.body.velocity.x / 1200
  }
}
