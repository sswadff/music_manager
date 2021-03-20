// eslint-disable-next-line no-undef
import Vue from 'vue'

export default new Vue({
  methods: {
    notify (list) {
      let template = '<table >'
      for (let idx in list) {
        template = template.concat('<tr><td>' + list[idx] + '</td></tr>')
      }
      template = template.concat('</table>')

      this.$notify.error({
        title: '校验信息',
        dangerouslyUseHTMLString: true,
        message: template
      })
    }
  }
})
