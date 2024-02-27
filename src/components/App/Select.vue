<script>
export default {
  props: {
    modelValue: { type: [String, Number] },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    items: { type: Array, default: [], required: true },
    itemValue: { type: String, default: 'id' },
    itemLabel: { type: String, default: 'name' },
    errorMessages: { type: Array, default: [] }
  },
  data () {
    return {
      isOpenOptions: false
    }
  },
  computed: {
    selectedValueObj() {
      return this.items.find(item => item[this.itemValue] === this.modelValue)
    }
  },
  methods: {
    toggleSelect () {
      this.isOpenOptions = !this.isOpenOptions
    },
    handleSelect (option) {
      this.$emit('update:modelValue', option[this.itemValue])
      this.isOpenOptions = false
    }
  }
}
</script>

<template>
  <div>
    <div v-if="label" class="custom-select__label">{{ label }}:</div>
    <div class="custom-select__input">
      <div class="selected-option" @click="toggleSelect">
        <span v-if="!selectedValueObj" class="selected-option__placeholder">
          {{ placeholder || label }}
        </span>
        <template v-else>{{ selectedValueObj[itemLabel] }}</template>
      </div>
      <i
        :class="['fa-solid fa-chevron-down activator', isOpenOptions && 'rotated']"
        @click="toggleSelect"
      />

      <div v-show="isOpenOptions" class="options-list">
        <div
          v-for="(option, index) in items"
          :key="index"
          :class="['option', modelValue === option[itemValue] && 'selected']"
          @click="handleSelect(option)"
        >
          {{ option[itemLabel] }}
        </div>
      </div>
    </div>
    <div :key="error.$uid" v-for="error of errorMessages" class="text-field__errors">
      <div class="error-msg">{{ error.$message }}</div>
    </div>
  </div>
</template>
