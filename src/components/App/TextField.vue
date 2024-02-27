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
  <div class="text-field">
    <div v-if="label" class="text-field__label">{{ label }}:</div>
    <div class="text-field__input">
      <input
        :value="modelValue"
        :placeholder="placeholder || label"
        @input="$emit('update:modelValue', $event.target.value)"
      />
      <img
        v-if="appendInnerIcon"
        :src="appendInnerIcon"
        class="text-field__append-inner-icon"
        width="16"
        height="16"
        alt="append-inner-icon"
      />
    </div>
    <div :key="error.$uid" v-for="error of errorMessages" class="text-field__errors">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>
