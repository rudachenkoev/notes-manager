<script>
export default {
  name: 'Navbar',
  data() {
    return {
      menuItems: [
        { routeName: 'notes', name: 'Notes' }
      ]
    }
  }
}
</script>

<template>
<div class="navbar">
  <div class="container">
    <router-link
      v-for="item in menuItems"
      :to="{ name: item.routeName }"
      class="navbar-item"
    >
      {{ item.name }}
    </router-link>
  </div>
</div>
</template>
