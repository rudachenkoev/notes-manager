<script>
export default {
  props: {
    modelValue: { type: [String, Number] },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: {
      type: String,
      default: 'text',
      validator: value => ['text', 'number', 'date', 'email', 'password', 'search', 'tel'].includes(value)
    },
    appendInnerIcon: { type: String, default: '' },
    errorMessages: { type: Array, default: [] }
  }
}
</script>

<template>
  <div class="custom-input">
    <div v-if="label" class="custom-input__label">{{ label }}:</div>
    <div class="custom-input__input">
      <input
        :value="modelValue"
        :placeholder="placeholder || label"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <img
        v-if="appendInnerIcon"
        :src="appendInnerIcon"
        class="custom-input__append-inner-icon"
        width="16"
        height="16"
        alt="append-inner-icon"
      />
    </div>
    <div :key="error.$uid" v-for="error of errorMessages" class="custom-input__errors">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>
