<template>
  <div class="container mt-4">
      <div class="col-12 text-right">
        <router-link class="nav-link" to="/user"><i class="fas fa-user-plus fa-2x"></i></router-link>
      </div>
      <Users />
  </div>
</template>

<script>
import Users from '@/components/user/User'

export default {
  name: 'user',
  components: {
      Users
  },
  data() {
      return {
          mode_create: false
      }
  },
  methods: {}
}
</script>