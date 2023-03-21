<template>
  <div class="yp_info_item">
    <p
      class="yp_info_item_label"
      :style="labelStyle">
      {{ label }}
    </p>

    <template v-if="valueType === 'text'">
      <p
        class="yp_info_item_value"
        :style="`color:${fontColor}`">
        <slot>{{ value }}</slot>
      </p>
    </template>

    <template v-if="valueType === 'image'">
      <el-image
        :style="{
          width: imageWidth,
          height: imageHeight
        }"
        :src="value"
        :fit="imageFit">
      </el-image>
    </template>

    <template v-if="valueType === 'image-list'">
      <div class="yp_info_item_images">
        <div
          v-for="(src, index) in value"
          :key="index"
          class="yp_info_item_images_item">
          <el-image
            :style="{
              width: imageWidth,
              height: imageHeight
            }"
            :src="src"
            :preview-src-list="value"
            :fit="imageFit">
          </el-image>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
    name: 'YpInfoItem',
    inject: {
      YpInfo: { default: '' }
    },
    props: {
      label: {
        type: String,
        default: ''
      },
      labelWidth: {
        type: String,
        default: ''
      },
      valueType: {
        type: String,
        default: 'text',
        validator: function (value) {
          // 这个值必须匹配下列字符串中的一个
          return ['text', 'image', 'image-list', 'file-list'].indexOf(value) !== -1
        }
      },
      imageWidth: {
        type: String,
        default: '120px'
      },
      imageHeight: {
        type: String,
        default: '120px'
      },
      imageFit: {
        type: String,
        default: 'cover'
      },
      value: {
        type: [String, Array, Number],
        default: ''
      },
      fontColor: {
        type: String,
        default: ''
      }
    },
    computed: {
      // label 宽
      labelStyle() {
        const ret = {}
        const infoWidth = this.YpInfo ? this.YpInfo.labelWidth : '120px'
        const labelWidth = this.labelWidth || infoWidth
        if (labelWidth) {
          ret.width = labelWidth
          ret.minWidth = labelWidth
        }
        return ret
      }
    }
  }
</script>

<style lang="scss">
  .yp_info_item {
    min-height: 32px;
    margin-bottom: 22px;
    display: flex;
    box-sizing: border-box;
    font-size: 16px;
    font-weight: 500;
    .yp_info_item_label {
      flex: none;
      padding: 0px 10px 0px 0;
      line-height: 32px;
      color: #606266;
      box-sizing: border-box;
      margin: 0;
    }
    .yp_info_item_value {
      flex: 1;
      padding: 0px 0;
      line-height: 32px;
      color: #373737;
      word-break: break-all;
      box-sizing: border-box;
      margin: 0;
    }
  }
  .yp_info_item_images {
    display: flex;
    flex-wrap: wrap;
    margin: -5px;
    box-sizing: border-box;
    .yp_info_item_images_item {
      // width: 120px;
      // height: 120px;
      margin: 5px;
      box-sizing: border-box;
    }
  }
</style>
