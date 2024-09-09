<template>
  <div class="preference flex flex-col items-baseline relative">
    <div class="flex flex-wrap justify-between w-full">
      <label
        class="baseinput-label text-sm text-left leading-[1.125rem] -tracking-[0.1px] opacity-80 text-black font-semibold mb-2"
        :for="name"
        v-if="label"
      >
        <span>{{ label }}</span
        >&thinsp;<span
          v-if="required"
          style="color: #da1414"
          class="text-left text-DA1414 font-semibold opacity-80 text-xs leading-5"
          >*</span
        >
      </label>
      <slot name="sidelink" />
    </div>

    <div
      class="border border-[#858C94] baseinput-core w-full rounded-lg px-4 flex flex-shrink flex-nowrap items-center space-x-2"
      :class="{ error: hasError, success: hasSuccess, s: true }"
    >
      <span class="inline-flex flex-shrink-0">
        <slot name="icon">
          <VIcon v-if="type == BaseInputType.EMAIL" name="mail" />
          <VIcon v-if="type == BaseInputType.TEL" name="telephone" />
          <VIcon v-if="type == BaseInputType.PASSWORD" name="key" />
        </slot>
      </span>
      <!-- type number input -->
      <input
        v-if="type === BaseInputType.NUMBER"
        :placeholder="placeholder"
        :required="required"
        class="border-0 outline-none appearance-none flex-shrink w-full bg-transparent"
        :class="cinput"
        :type="type"
        :name="name"
        :id="name"
        :value="inputValue"
        :min="min"
        :max="max"
        :step="step"
        @input="emitUpdateEvent($event)"
        :autocomplete="shouldBeAutoCompleted(type)"
        spellcheck="false"
        :disabled="disabled"
      />
      <!-- all except type number input -->
      <input
        v-else
        :placeholder="placeholder"
        :required="required"
        class="border-0 outline-none appearance-none flex-shrink w-full bg-transparent"
        :class="cinput"
        :type="viewPassword ? 'text' : type"
        :name="name"
        :id="name"
        :value="inputValue"
        @input="emitUpdateEvent($event)"
        :autocomplete="shouldBeAutoCompleted(type)"
        spellcheck="false"
        :disabled="disabled"
      />
      <template v-if="type === 'password'">
        <span
          @click="viewPassword = !viewPassword"
          class="cursor-pointer inline-flex flex-shrink-0"
        >
          <VIcon name="eyeIcon" v-if="!viewPassword" />
          <VIcon name="noEyeIcon" v-if="viewPassword" />
        </span>
      </template>
    </div>

    <!-- error message -->
    <div
      data-test-id="v-input-error"
      v-if="hasError"
      class="rounded-lg w-full bg-[#feefef] text-red-600 flex flex-row space-x-1 py-1.5 px-2 mt-2 items-center select-none"
    >
      <span class="inline-flex flex-shrink-0">
        <VIcon name="InfoIcon" />
      </span>
      <span class="text-xs font-medium">{{
        errorMessage || validationErrMessage || "Email non trouvé"
      }}</span>
    </div>

    <!-- success message -->
    <div
      v-if="hasSuccess"
      class="rounded-lg w-full text-green-600 bg-green-100 flex flex-row space-x-1 py-1.5 px-2 mt-2 items-center select-none"
    >
      <span class="inline-flex flex-shrink-0">
        <VIcon name="InfoIcon" />
      </span>
      <span class="text-xs font-medium">{{ successMessage || "" }}</span>
    </div>

    <!-- any slot -->
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useField } from "vee-validate";
import { computed, withDefaults, ref } from "vue";

export interface Props {
  modelValue: any;
  cinput?: string;
  label?: string;
  hasSuccess?: boolean;
  successMessage: string;
  errorMessage: string;
  placeholder: string;
  type: string;
  name: string;
  required: boolean;
  min?: number;
  max?: number;
  step: number;
  disabled?: boolean
}

enum BaseInputType {
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  PASSWORD = "password",
  DATE = "date",
  TEL = "tel",
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: "",
  cinput: "py-3",
  label: "",
  hasSuccess: false,
  successMessage: "",
  errorMessage: "",
  placeholder: "",
  type: "TEXT",
  name: "",
  step: 0,
});
const emit = defineEmits<{
  (e: "update:modelValue", target: any): void;
  (e: "change", target: any): void;
}>();

const {
  value: inputValue,
  errorMessage: validationErrMessage,
  handleChange,
} = useField(props.name, undefined, {
  initialValue: props.modelValue ?? "",
});
const viewPassword = ref(false);

const hasError = computed(() => {
  return validationErrMessage.value !== undefined || props.errorMessage !== "";
});

function emitUpdateEvent(event: Event) {
  emit("update:modelValue", (event.target as any).value);
  emit("change", (event.target as any).value);
  handleChange(event);
}

function shouldBeAutoCompleted(type: string) {
  let complete = "";
  switch (type) {
    case "password":
      complete = "new-password";
      break;
    case "text":
      complete = "on";
      break;
    default:
      complete = "off";
      break;
  }
  return complete;
}
</script>

<style scoped>
::placeholder {
  font-weight: 600;
  color: #6d7580;
  @apply text-sm;
}

.error {
  background: #feefef;
  border: 1px solid #da1414;
}

.success {
  background: #edf9f0;
  border: 1px solid #287d3c;
}

.error input {
  -webkit-box-shadow: 0 0 0px 1000px #feefef inset !important;
}

.success input {
  -webkit-box-shadow: 0 0 0px 1000px #edf9f0 inset !important;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  transition: background-color 5000s ease-in-out 0s;
}

input::-ms-reveal,
input::-ms-clear {
  display: none;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
