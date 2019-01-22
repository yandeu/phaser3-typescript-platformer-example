export default class LevelText extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, level: number) {
    super(scene, scene.cameras.main.width / 2, scene.cameras.main.height / 2 - 50, `Level: ${level + 1}`, {
      color: '#324951',
      fontSize: 56,
      fontWeight: 'bold',
      fontStyle: 'bold'
    })
    scene.add.existing(this)

    this.setScrollFactor(0)
      .setOrigin(0.5, 0)
      .setAlpha(0.5)
      .startTween()
  }

  private tweensAsync = (config: object) => {
    return new Promise(resolve => {
      this.scene.tweens.add({
        ...config,
        onComplete: () => resolve()
      })
    })
  }

  private async startTween() {
    await this.tweensAsync({
      targets: this,
      scaleX: 1.5,
      scaleY: 1.5,
      yoyo: true,
      delay: 500,
      duration: 200
    })
    await this.tweensAsync({
      targets: this,
      y: 10,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: 'Sine.easeInOut',
      delay: 500,
      duration: 400
    })
    this.setFontSize(28)
    this.setScale(1)
    await this.tweensAsync({
      targets: this,
      alpha: 0,
      delay: 2000,
      duration: 400
    })
    this.destroy()
  }
}
