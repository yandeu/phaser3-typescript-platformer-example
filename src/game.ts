import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 720
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT //1280

const config: GameConfig = {
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  // @ts-ignore
  scale: {
    // @ts-ignore
    mode: Phaser.Scale.FIT,
    // @ts-ignore
    autoCenter: Phaser.DOM.CENTER_BOTH,
    width: DEFAULT_WIDTH,
    height: DEFAULT_HEIGHT
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

window.addEventListener('load', () => {
  new Phaser.Game(config)
})
