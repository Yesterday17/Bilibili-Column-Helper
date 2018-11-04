<template>
  <div id="cropper" class="w-100" :style="`background-image: url('${this.img}')`">
    <div class="shadow-box w-100 h-100"></div>
    <div
      id="cropper-dragger"
      @mousemove="onDrag"
      @mouseup="updateImage"
      :style="`left: ${this.x}px;top: ${this.y}px;`"
    >
      <div class="crop-box w-100 h-100">
        <img
          class="shadow-img"
          alt=""
          draggable="false"
          :style="`left: -${this.x}px;top: -${this.y}px;background-image: url('${this.img}')`"
        >
      </div>
    </div>
    <canvas ref="canvas" width="960" height="540" hidden></canvas>
  </div>
</template>

<script>
export default {
  name: 'cropper',
  props: ['img', 'value'],
  data () {
    return {
      width: 288,
      height: 162,
      x: 0,
      y: 0,

      selected: ''
    }
  },
  watch: {
    'selected' () {
      this.$emit('input', this.selected)
    }
  },
  methods: {
    onDrag (e) {
      if (e.buttons !== 0) {
        e.preventDefault()
        const dragger = document.getElementById('cropper-dragger')
        const parent = dragger.parentElement
        this.x = this.x + e.movementX < 0 ? 0 : this.x + e.movementX > parent.clientWidth - dragger.clientWidth ? parent.clientWidth - dragger.clientWidth : this.x + e.movementX
        this.y = this.y + e.movementY < 0 ? 0 : this.y + e.movementY > parent.clientHeight - dragger.clientHeight ? parent.clientHeight - dragger.clientHeight : this.y + e.movementY
      }
    },
    updateImage () {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')

      canvas.height = canvas.height /* eslint-disable-line */

      let image = new Image()
      image.src = this['img']
      image.onload = () => {
        ctx.drawImage(image, -this.x, -this.y)
        this.selected = canvas.toDataURL()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../styles/colors.scss";

#cropper {
  height: 238.5px;
  position: relative;
  overflow: hidden;

  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;

  .shadow-box {
    position: absolute;
    background-color: $base-color;
    opacity: 0.8;
    top: 0;
    left: 0;
  }

  #cropper-dragger {
    width: 288px;
    height: 162px;
    position: absolute;
    cursor: move;

    .crop-box {
      border: 1px solid white;
      position: absolute;
      overflow: hidden;
      top: 0px;

      .shadow-img {
        position: absolute;
        width: 424px;
        height: 238.5px;

        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}
</style>
