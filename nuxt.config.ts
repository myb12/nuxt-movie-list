// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app: {
    head: {
      title: 'Movie Tracker: Your Personal Watchlist App',
      meta: [
        { 
          name: 'description', 
          content: 'A modern movie tracking application built with Nuxt.js. Manage your movie viewing experience with a simple drag-and-drop interface, organizing films into \'Watch List,\' \'Watching,\' and \'Watched\' categories. The app also features a search function to quickly find movies in your collection. It\'s a clean, efficient way to keep track of all the movies you\'ve seen and want to see.' 
        }
      ],
    }
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
    modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ]
})
