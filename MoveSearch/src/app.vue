<template>
  <div
    class="zsw-wokoo"
    id="zsw-wokoo"
    :style="{ top: modalStyles.top + 'px', left: modalStyles.left + 'px' }"
    v-if="show"
  >
    <ul>
      <li v-for="(val, index) in searchData" :key="index">
        <a class="a-text" :href="val.url" target="_blank">{{ val.title }}</a>
      </li>
    </ul>
  </div>
</template>
<script>
const MODAL_WIDTH = 300;
import "./app.less";
export default {
  data: function () {
    return {
      show: false,
      searchData: [],
      modalStyles: {
        top: 0,
        left: 0,
      },
    };
  },
  mounted() {
    document.addEventListener("mouseup", this.mouseupHandle);
  },
  methods: {
    boundaryDetection(x, y, modalStyle = { top: 0, left: 0 }) {
      let modalDom = document.querySelector("#zsw-wokoo");
      let { left, top } = modalStyle;
      if (
        x > left &&
        x < left + MODAL_WIDTH &&
        y > top &&
        y < top + modalDom.offsetHeight
      ) {
        this.show = true;
        return;
      }
      this.show = false;
      this.searchData = [];
    },
    mouseupHandle(e) {
      var selectionObj = window.getSelection();
      var selectedText = selectionObj.toString();
      let selectionObjRect = selectionObj.getRangeAt(0).getBoundingClientRect();
      let { x, y, height, width } = selectionObjRect;
      let left = x + width / 2 - MODAL_WIDTH / 2;
      left = left < 20 ? 20 : left;
      let top = y + height;
      top = top < 20 ? 20 : top;
      let scrollLeft =
        document.documentElement.scrollLeft || document.body.scrollLeft;
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (selectedText.length == 0) {
        if (this.show) {
          this.boundaryDetection(e.clientX, e.clientY, this.modalStyles);
        }
      } else {
        this.$axios
          // .get(`https://kaifa.baidu.com/rest/v1/search?query=${selectedText}&pageNum=1&pageSize=10`)
          .get(`https://movesearch.vercel.app/api/baidu?query=${selectedText}&pageNum=1&pageSize=10`)
          .then((res) => {
            console.log(res);
            let { data } = res.data.data.documents;
            console.log(data);
            if (data.length) {
              this.show = true;
              this.searchData = data;
              this.modalStyles = {
                top: top + scrollTop,
                left: left + scrollLeft,
              };
            }
          })
          .catch((err) => {
            console.log(err);
            this.show = false;
          });
      }
    },
    handleClose() {
      this.show = !this.show;
    },
  },
};
</script>
<style scoped>
</style>
