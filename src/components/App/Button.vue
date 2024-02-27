<script>
export default {
  name: 'Button',
  props: {
    label: { type: String, default: '' },
    icon: { type: String, default: '' },
    variant: {
      type: String,
      default: 'elevated',
      validator: value => ['elevated', 'outlined', 'flat'].includes(value)
    }
  }
}
</script>

<template>
 <button :class="['custom-button', variant, icon && 'icon']">
   <i v-if="icon" :class="icon"></i>
   <template v-else>{{ label }}</template>
 </button>
</template>

<style lang="sass" scoped>
@import '@/assets/sass/_variables.sass'

.custom-button
  font-size: 14px
  border-radius: 4px
  padding: 8px 12px
  border: 0
  cursor: pointer
  transition: opacity ease-in-out 0.3s
  &:hover
    opacity: 0.9
  &.icon
    font-size: 16px
    padding: 4px
  &.elevated
    background-color: $white_950
    color: $white_50
  &.outlined
    background-color: transparent
    border: 1px solid $white_950
  &.flat
    background-color: transparent
</style>
