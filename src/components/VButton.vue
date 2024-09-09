
<template>
  <button
    data-test-id="v-button"
    class="py-3 px-4 rounded-[4px] flex justify-center items-center font-medium leading-4 text-sm gap-4 disabled:opacity-80"
    v-bind="attrs"
    :class="buttonType[type]"
    :type="submit ? 'submit' : 'button'"
    :disabled="loading"
  >
    <!-- <slot name="icon">
      <VIcon :name="icon"></VIcon>
    </slot> -->
    {{ label }}
      <!-- <template v-if="loading"><VIcon name='LoaderIcon'/></template> -->

  </button>
</template>

<script setup lang="ts">
import { useAttrs } from "vue";

const buttonType = {
  primary: " bg-[#E5133A] text-white",
  secondary: "bg-[#E5133A] text-black",
 
};
type ButtonProps = {
  icon?: string;
  label: string;
  type?: keyof typeof buttonType;
  submit?: boolean;
  loading?:boolean
};

const attrs = useAttrs();
withDefaults(defineProps<ButtonProps>(), { type: "primary" });
</script>

<style>
.button{
  opacity: 0.8;
  font-size: 0.875rem;
  line-height: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  --tw-bg-opacity: 1;
  background-color: rgb(250 204 21 / var(--tw-bg-opacity));
  border-radius: 4px;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  display: flex;
}
</style>