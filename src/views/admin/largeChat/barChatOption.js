export default function getTimeOutOptions(dataX = [], dataY = []) {
  // ['标题', '接单超时', '办理超时']
  const dataFormate = [['标题', '接单超时', '办理超时']]
  for (let index = 0; index < dataX.length; index++) {
    const arr = []
    arr.push(dataX[index], dataY[index].receiveOuttime, dataY[index].receiveOuttime)
    dataFormate.push(arr)
  }

  return {
    legend: {
      right: 10
    },
    tooltip: {},
    dataset: {
      source: dataFormate
    },
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
    yAxis: { type: 'value' },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          // borderRadius: 40
        },
        // barMaxWidth: 15,
        itemStyle: {
          // borderRadius: 50
        }
      }
      // {
      //   type: 'bar',
      //   showBackground: true,
      //   backgroundStyle: {
      //     borderRadius: 50
      //   },
      //   barMaxWidth: 15,
      //   itemStyle: {
      //     borderRadius: 50
      //   }
      // }
    ]
    // dataZoom: [
    //   {
    //     type: 'slider', //隐藏或显示（true）组件
    //     show: false,
    //     backgroundColor: 'rgb(19, 63, 100)', // 组件的背景颜色。
    //     fillerColor: 'rgb(16, 171, 198)', // 选中范围的填充颜色。
    //     borderColor: 'rgb(19, 63, 100)', // 边框颜色
    //     showDetail: false, //是否显示detail，即拖拽时候显示详细数值信息
    //     startValue: 0,
    //     endValue: 5,
    //     filterMode: 'empty',
    //     width: '70%', //滚动条高度
    //     height: 10, //滚动条显示位置
    //     left: 'center',
    //     zoomLoxk: true, // 是否锁定选择区域（或叫做数据窗口）的大小
    //     handleSize: 0, //控制手柄的尺寸
    //     bottom: 3 // dataZoom-slider组件离容器下侧的距离
    //   },
    //   {
    //     //没有下面这块的话，只能拖动滚动条，鼠标滚轮在区域内不能控制外部滚动条
    //     type: 'inside',
    //     zoomOnMouseWheel: false, //滚轮是否触发缩放
    //     moveOnMouseMove: true, //鼠标滚轮触发滚动
    //     moveOnMouseWheel: true
    //   }
    // ]
  }
}
