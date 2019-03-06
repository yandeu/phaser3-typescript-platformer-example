export default class LevelText extends Phaser.GameObjects.Text {
  constructor(public _scene: Phaser.Scene, level: number) {
    super(_scene, 0, 0, `Level: ${level + 1}`, {
      color: '#324951',
      fontSize: 56,
      fontWeight: 'bold',
      fontStyle: 'bold'
    })
    _scene.add.existing(this)

    this.setScrollFactor(0)
      .setOrigin(0.5, 0)
      .setAlpha(0.5)
      .startTween()
  }

  adjustPosition() {
    this.x = this._scene.cameras.main.width / 2
    this.y = this._scene.cameras.main.height / 2 - 50
  }

  private tweensAsync = (config: { [key: string]: any }): Promise<{}> => {
    return new Promise(resolve => {
      this.scene.tweens.add({
        ...config,
        onComplete: () => {
          if (config.onComplete) config.onComplete()
          resolve()
        }
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
      duration: 200,
      onComplete: () => console.log('tween 1 completed')
    })

    await this.tweensAsync({
      targets: this,
      y: 10,
      scaleX: 0.5,
      scaleY: 0.5,
      ease: 'Sine.easeInOut',
      delay: 500,
      duration: 400,
      onComplete: () => console.log('tween 2 completed')
    })

    this.setFontSize(28)
    this.setScale(1)

    await this.tweensAsync({
      targets: this,
      alpha: 0,
      delay: 2000,
      duration: 400,
      onComplete: () => console.log('tween 3 completed')
    })

    this.destroy()
  }
}
