<template>
  <div>
    <div>
      <nuxt-fetch ref="fetcher" fetch-key="first" :fetch-fn="fn1">
        <template #default="{ data, fetching }">
          <p>
            {{ data }}, fetching: {{ fetching }}
          </p>
        </template>
      </nuxt-fetch>
    </div>
    <client-only>
      <nuxt-fetch fetch-key="second" :fetch-fn="fn2">
        <template #fetching>
          Fetching...
        </template>
      </nuxt-fetch>
    </client-only>
    <div>
      <nuxt-fetch :fetch-fn="fn3" fetch-key="third">
        <template #error="{ error }">
          <p>
            {{ error.message }}
          </p>
        </template>
      </nuxt-fetch>
    </div>
  </div>
</template>

<script>
import NuxtFetch from "nuxt-fetch";
export default {
  components: {
    NuxtFetch
  },
  name: 'IndexPage',
  methods: {
    async fn1 () {
      await new Promise(resolve => setTimeout(resolve, 500))
      return 'hello world'
    },
    fn2 () {
      return new Promise(resolve => null)
    },
    async fn3 () {
      throw {
        message: 'this is an error'
      }
    }
  },
  mounted() {
    setInterval(() => {
      this.$refs.fetcher.$fetch()
    }, 5000)
  }
}
</script>
