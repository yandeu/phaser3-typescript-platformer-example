import EnemyClass from './enemyClass'
export default class SlimeSprite extends EnemyClass {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, 'slime')
    scene.add.existing(this)
    scene.physics.add.existing(this)

    scene.anims.create({
      key: 'crawl',
      frames: scene.anims.generateFrameNumbers('slime', { start: 0, end: 4 }),
      frameRate: 6,
      yoyo: true,
      repeat: -1
    })
    this.play('crawl')

    //@ts-ignore
    this.body.setVelocityX(-60)
    this.setOrigin(0.5, 1)
    this.setScale(1)
    this.body.setSize(this.width - 40, this.height - 20)
    this.body.setOffset(20, 20)
  }

  update() {}

  kill() {
    if (this.dead) return
    this.setFrame(5)
    this.removeEnemy()
  }
}
