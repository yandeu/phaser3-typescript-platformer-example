export default class ControlsSprite extends Phaser.GameObjects.Image {
  type: string
  constructor(scene: Phaser.Scene, x: number, y: number, config: any) {
    super(scene, y, x, 'controls')
    scene.add.existing(this)

    this.setX(x)
      .setY(y)
      .setAlpha(0.1)
      .setRotation(config.rotation)
      .setScrollFactor(0)
      .setScale(1.25)

    this.type = config.type

    // hide control on non-touch devices
    if (!scene.sys.game.device.input.touch) this.setAlpha(0)
  }
}
