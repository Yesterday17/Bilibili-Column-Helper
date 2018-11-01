<template>
  <b-carousel
    id="about-carousel"
    style="text-shadow: 1px 1px 2px #333;"
    indicators
  >
    <b-carousel-slide img-src="static/icon.png">
      <p>本程序以Electron、Vue.js以及CodeMirror为主要组件编写，旨在以Markdown书写目前并不支持Markdown的Bilibili专栏。</p>
      <p>从原理来看，本程序将要实现的是将Bilibili支持的HTML特性以原本的方式渲染；
        <br>而对于不支持的特性，则进行图片的渲染，以达到相同的显示目的。
      </p>
      <h3>专栏助手简介</h3>
    </b-carousel-slide>
    <b-carousel-slide
      caption="Second"
      text="Nulla vitae elit libero, a pharetra augue mollis interdum."
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Third"
      text="Nulla vitae elit libero, a pharetra augue mollis interdum."
    ></b-carousel-slide>
    <b-carousel-slide
      caption="Support"
      text="Nulla vitae elit libero, a pharetra augue mollis interdum."
    ></b-carousel-slide>
  </b-carousel>
</template>
<script>
export default {
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
@import "../styles/colors.scss";

$count: 4;

#about-carousel {
  height: 100%;
  width: 100%;

  .carousel-inner {
    height: 100%;
  }

  .carousel-item {
    display: flex;
    align-items: center;
    justify-content: center;
    transition-duration: 0.3s;
    height: 100%;
    &:focus {
      outline: none;
    }

    img {
      width: auto !important;
    }
  }

  .carousel-indicators {
    margin: 0px;
    flex-direction: column;
    left: 3%;
    bottom: calc(50% - 18px * #{$count});
    li {
      margin: 0px;
      margin-top: 3px;
      margin-bottom: 3px;
      width: 3px;
      height: 30px;

      &:focus {
        outline: none;
      }
    }
  }
  .carousel-item-next.carousel-item-left,
  .carousel-item-prev.carousel-item-right {
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }

  .carousel-item-next,
  .active.carousel-item-right {
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100% 0);
  }

  .carousel-item-prev,
  .active.carousel-item-left {
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
}
</style>
