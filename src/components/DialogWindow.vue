<script>
export default {
  name: 'DialogWindow',
  props: {
    modelValue: {  type: Boolean, default: false },
    title: { type: String, default: '' }
  }
}
</script>

<template>
  <div v-if="modelValue" class="modal-overlay">
    <div class="modal">
      <div class="modal-title">
        <slot name="title">{{ title }}</slot>
        <span @click="$emit('update:modelValue', false)">Close</span>
      </div>
      <div class="modal-content">
        <slot name="content" />
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.modal
  min-width: 520px
  background: #fff
  border-radius: 4px
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2)
  &-title, &-content
    padding: 16px 24px
  &-title
    display: flex
    align-items: center
    justify-content: space-between
    font-size: 24px
    font-weight: 500
    border-bottom: 1px solid #1a1a1a
  &-overlay
    position: fixed
    top: 0
    left: 0
    width: 100%
    height: 100%
    background: rgba(0, 0, 0, 0.5)
    display: flex
    justify-content: center
    align-items: center
</style>
