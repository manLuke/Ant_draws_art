<template>
  <div>
    <div class="page">
      <div class="filed-container" :style="{ '--size': cssSize }">
        <div v-for="i in filedSize" :key="i" class="filed-row" >
          <div v-for="j in filedSize" :key="j" class="filed-cell" :class="{ 'cell-1': isColored(i-1,j-1), 'cell-ant': isAnt(i-1,j-1) }" ></div>
        </div>
      </div>
      <button class="btn-start" @click="startGame">Start</button>
    </div>
  </div>
</template>

<script setup lang="ts">

const filed = ref<number[][]>([])
const filedSize = ref(50)
const speed = ref(5)

const ant = ref<Coordinate>({
  x: 0,
  y: 0,
})

// setup filed

onBeforeMount(() => {
  setupFiled()
})

const setupFiled = () => {
  filed.value = []
  for (let i = 0; i < filedSize.value; i++) {
    filed.value.push([])
    for (let j = 0; j < filedSize.value; j++) {
      filed.value[i].push(0)
    }
  }
}

// computed for styles
const isColored = (i: number, j: number) => {
  return filed.value[i][j] === 1
}

const isAnt = (i: number, j: number) => {
  return ant.value.x === i && ant.value.y === j
}

// game logic

const startGame = () => {
  setupFiled();
  ant.value = getRandomCoordinate(filedSize.value)
  play()
}

const play = async () => {
  await new Promise((resolve) => setTimeout(resolve, speed.value));
  const d = getRandomDirection();
  const { x, y } = nextCoordinate(ant.value, d);
  if (isCollision({x, y}, filedSize.value)) return;
  [ant.value.x, ant.value.y] = [x, y];
  filed.value[x][y] = filed.value[x][y] === 0 ? 1 : 0;
  window.requestAnimationFrame(play);
}

// responsive style

const windowWidth = ref(window.innerWidth)
const windowHeight = ref(window.innerHeight)
const cssSize = computed(() => {
  if ((windowHeight.value - 100) < windowWidth.value) {
    return (windowHeight.value - 200) / (filedSize.value + 1) + "px"
  }
  if (windowWidth.value < 800) {
    return windowWidth.value / (filedSize.value + 1) + "px"
  } else {
    return 800 / filedSize.value + "px"
  }
})

onMounted(() => {
  window.addEventListener('resize', () => {
    windowWidth.value = window.innerWidth
    windowHeight.value = window.innerHeight
  })
})

</script>

<style scoped lang="scss">

@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.page {
  @include flex-center;
  flex-direction: column;
  align-items: center;
  min-height: 80vh;
}
.filed-container {
  @include flex-center;
  align-items: center;
  border: 3px solid #d40de2;
  margin: 4rem 0 2rem 0;
}
.filed-cell {
  @include flex-center;
  background-color: #0e1246;
  text-align: center;
  width: var(--size);
  aspect-ratio: 1;
}

.cell-1 {
  background-color: #e2700d !important;
}

.cell-ant {
  background-color: #e21b0d !important;
}

.btn-start {
  @include flex-center;
  width: 100px;
  height: 50px;
  background-color: #000;
  color: rgba(255, 255, 255, 0.81);
  font-size: 1.5em;
  border: 2px solid #d40de2;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    color: #fff;
  }
}


</style>
