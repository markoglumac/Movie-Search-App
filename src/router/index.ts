import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MovieDetail from '../views/MovieDetail.vue'
import FavoritesView from '@/views/FavoritesView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/movie/:id',
      name: 'movie-detail',
      component: MovieDetail,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
