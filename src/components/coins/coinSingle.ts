export default class CoinSingle extends Phaser.Physics.Arcade.Sprite {
  private collecting: boolean = false

  constructor(scene: Phaser.Scene, config: TilesConfig) {
    super(scene, config.x + 48, config.y + 48, config.texture)
    scene.add.existing(this)
    scene.physics.add.existing(this)

    this.setImmovable()
    this.setScale(1.5)
    // @ts-ignore
    this.body.setAllowGravity(false)

    scene.anims.create({
      key: 'spin',
      frames: scene.anims.generateFrameNames('coin'),
      frameRate: 16,
      repeat: -1
    })
    this.play('spin')
  }

  collect() {
    if (this.collecting) return
    this.collecting = true
    this.scene.tweens.add({
      targets: this,
      alpha: 0,
      y: this.y - 100,
      duration: 500,
      ease: 'Power2',
      onComplete: this.destroy.bind(this)
    })
  }
}
