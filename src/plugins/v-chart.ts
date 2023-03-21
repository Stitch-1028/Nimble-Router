import VChart from 'vue-echarts'
import { use } from 'echarts/core'
// 导入需要的图表组件
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'

import { GridComponent, TooltipComponent, LegendComponent, TitleComponent, DatasetComponent, DataZoomComponent } from 'echarts/components'
import { App } from 'vue'

use([CanvasRenderer, BarChart, PieChart, GridComponent, TooltipComponent, TitleComponent, LegendComponent, DatasetComponent, DataZoomComponent])

export default {
  install: (app: App) => {
    app.component('VChart', VChart)
  }
}
