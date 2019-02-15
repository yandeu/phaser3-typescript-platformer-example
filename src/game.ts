import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'
// @ts-ignore
import SpineWebGLPlugin from './plugins/SpineWebGLPlugin'

window.addEventListener('load', () => {
  window.setTimeout(() => {
    const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
    const DEFAULT_HEIGHT = 720
    const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT //1280

    const config: GameConfig = {
      type: Phaser.WEBGL,
      backgroundColor: '#ffffff',
      parent: 'phaser-game',
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: DEFAULT_WIDTH,
        height: DEFAULT_HEIGHT
      },
      plugins: {
        scene: [{ key: 'SpineWebGLPlugin', plugin: SpineWebGLPlugin, start: true, sceneKey: 'spine' }]
      },
      scene: [PreloadScene, MainScene],
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
          gravity: { y: 2500 }
        }
      }
    }

    new Phaser.Game(config)
  }, 2000)
})
