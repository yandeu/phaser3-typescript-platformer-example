import EnemyClass from './enemyClass'
export default class BeeSprite extends EnemyClass {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'bee')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    scene.anims.create({
      key: 'fly',
      frames: scene.anims.generateFrameNumbers('bee', { start: 0, end: 1 }),
      frameRate: 8,
      repeat: -1
    })
    this.play('fly')

    //@ts-ignore
    this.body.setVelocityX(-120)
    this.setOrigin(0.5, 1)
    this.body.setSize(80, 135)
    this.body.setOffset((this.width - 80) / 2, 30)
  }

  update() {}

  kill() {
    if (this.dead) return
    this.body.setSize(80, 40)
    this.setFrame(2)
    this.removeEnemy()
  }
}
