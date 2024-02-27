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
        <i class="fa-solid fa-xmark" @click="$emit('update:modelValue', false)"/>
      </div>
      <div class="modal-content">
        <slot name="content" />
      </div>
      <div class="modal-actions">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
