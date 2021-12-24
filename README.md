# Nuxt Fetch Component

A simple nuxt renderless component wrapper around nuxt fetch capabilities

## Installation

```
yarn add @hammerbot/nuxt-fetch
```

## Usage

```vue
<template>
  <div>
    <nuxt-fetch :fetch-fn="fetchFn">
      <template #default="{ data, fetching, error }">
        <p>
          {{ data }} - {{ fetching }} - {{ error }}
        </p>
      </template>
      <template #fetching>
        Fetching for the first time
      </template>
      <template #error="{ error }">
        Error handling {{ error }}
      </template>
    </nuxt-fetch>
  </div>
</template>

<script >
import NuxtFetch from '@hammerbot/nuxt-fetch' 
export default {
  components: {
    NuxtFetch
  },
  methods: {
    async fetchFn () {
      const { data } = await this.$api.get('/foo')
      return data
    }
  }
}
</script>
```
