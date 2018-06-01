import Vue from 'vue'
import Editor from '@/components/Editor'

describe('Editor.vue', () => {
  it('should contain both editor and previewer', () => {
    const vm = new Vue({
      el: document.createElement('div'),
      render: h => h(Editor)
    }).$mount()

    expect(vm.$el.querySelector('.col').textContent).to.contain('Welcome to your new project!')
  })
})
