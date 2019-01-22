import Levels from './levels'
export class Map {
  info: TilesConfig[]
  size: MapSize

  public static calcCurrentLevel(currentLevel: number) {
    const MAX_LEVELS = Levels.length
    return currentLevel % MAX_LEVELS
  }

  constructor(currentLevel: number) {
    const TILE_SIZE = 96
    const config: any = {
      '[': {
        type: 'tile',
        texture: 'tile-left'
      },
      '/': {
        type: 'tile',
        texture: 'tile-middle'
      },
      ']': {
        type: 'tile',
        texture: 'tile-right'
      },
      G: {
        type: 'goal',
        texture: 'goal'
      },
      O: {
        type: 'coin',
        texture: 'coin'
      },
      S: {
        type: 'enemy',
        texture: 'slime'
      },
      B: {
        type: 'enemy',
        texture: 'bee'
      },
      P: {
        type: 'player',
        texture: 'player'
      }
    }

    const map = Levels[Map.calcCurrentLevel(currentLevel)]

    // the player can jump a bit higher than the map's height
    const paddingTop = 4 * TILE_SIZE

    this.size = {
      x: 0,
      y: 0,
      width: map[0].length * TILE_SIZE,
      height: map.length * TILE_SIZE + paddingTop
    }
    this.info = []

    map.forEach((row, y) => {
      for (let i = 0; i < row.length; i++) {
        const tile = row.charAt(i)
        const x = i
        if (tile !== ' ') {
          let info = { ...config[tile.toString()], x: x * TILE_SIZE, y: y * TILE_SIZE + paddingTop }
          this.info.push(info)
        }
      }
    })
  }
}
