import Player from './player'

export default class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Phaser.Scene) {
    super(
      scene,
      scene.cameras.main.centerX,
      scene.cameras.main.centerY,
      scene.cameras.main.width,
      scene.cameras.main.height,
      'background'
    )
    scene.add.existing(this)

    this.setOrigin(0.5).setScrollFactor(0)
  }

  parallax(player: Player) {
    this.tilePositionX += player.body.velocity.x / 1200
  }
}
