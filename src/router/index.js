import { createRouter, createWebHistory } from 'vue-router'
import Todo from '../components/views/Todo.vue'
import Home from '../App.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/todo', component: Todo }
]

export default createRouter({
  history: createWebHistory(),
  routes
})