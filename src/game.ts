import 'phaser'
import MainScene from './scenes/mainScene'
import PreloadScene from './scenes/preloadScene'

const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth)
const DEFAULT_HEIGHT = 720
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT //1280

const config: GameConfig = {
  width: DEFAULT_WIDTH,
  height: DEFAULT_HEIGHT,
  type: Phaser.AUTO,
  backgroundColor: '#ffffff',
  scene: [PreloadScene, MainScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: { y: 2500 }
    }
  }
}

export class Game extends Phaser.Game {
  constructor(config: GameConfig) {
    super(config)
  }
}

window.addEventListener('load', () => {
  let game = new Game(config)

  const resize = () => {
    const scale = Math.min(window.innerWidth / DEFAULT_WIDTH, window.innerHeight / DEFAULT_HEIGHT)
    game.canvas.style.width = DEFAULT_WIDTH * scale + 'px'
    game.canvas.style.height = DEFAULT_HEIGHT * scale + 'px'
  }

  resize()
  window.addEventListener('resize', resize)
})
