<script>
export default {
  name: 'Dropdown',
  props: {
    actions: { type: Array, default: [], required: true }
  },
  data () {
    return {
      isDropdownOpen: false
    }
  },
  methods: {
    toggleDropdown () {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    closeDropdown () {
      this.isDropdownOpen = false
    }
  }
}
</script>

<template>
  <div class="dropdown" v-click-outside="closeDropdown" @click="toggleDropdown">
    <AppButton variant="flat" icon="fa-solid fa-ellipsis-vertical" />
    <ul v-if="isDropdownOpen" class="dropdown-menu">
      <li
        :key="`action-${index}`"
        v-for="(action, index) in actions"
        class="dropdown-menu__item"
        @click.stop="action.onClick()"
      >
        {{ action.name }}
      </li>
    </ul>
  </div>
</template>
