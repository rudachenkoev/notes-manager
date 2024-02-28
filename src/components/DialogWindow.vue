<script>
export default {
  name: 'DialogWindow',
  props: {
    modelValue: {  type: Boolean, default: false },
    title: { type: String, default: '' }
  },
  methods: {
    closeDialog () {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>

<template>
  <div v-if="modelValue" class="modal-overlay">
    <div class="modal" v-click-outside="closeDialog">
      <div class="modal-title">
        <slot name="title">{{ title }}</slot>
        <AppButton
          variant="flat"
          icon="fa-solid fa-xmark"
          @click="closeDialog"
        />
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
