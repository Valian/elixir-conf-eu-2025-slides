<script setup lang="ts">
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/js/utils.ts";
import { computed, toRaw } from "vue";
import { type ClassValue } from "clsx";

const typographyVariants = cva("leading-normal", {
  variants: {
    variant: {
      title: "text-5xl font-bold",
      h1: "text-3xl font-bold leading-9 sm:truncate",
      h2: "text-2xl font-semibold",
      h3: "text-lg font-semibold",
      p: "text-3xl",
      bold: "text-base font-semibold",
    },
    color: {
      default: "text-foreground",
      white: "text-white",
      primary: "text-primary",
    },
    center: {
      true: "text-center",
    },
  },
  defaultVariants: {
    variant: "p",
    color: "default",
    center: undefined,
  },
});

type TypographyProps = VariantProps<typeof typographyVariants>;

const props = defineProps<{
  variant?: TypographyProps["variant"];
  color?: TypographyProps["color"];
  center?: TypographyProps["center"] | "";
  class?: ClassValue;
  as?: string;
}>();
console.log(toRaw(props));
const tag = computed(() => {
  if (props.as) return props.as;
  if (props.variant == "title") return "h1";
  if (props.variant == "bold") return "p";
  return props.variant;
});
</script>

<template>
  <component
    :is="tag"
    :class="
      cn(
        typographyVariants({
          variant: props.variant,
          color: props.color,
          center: props.center === true || props.center === '',
        }),
        props.class
      )
    "
  >
    <slot></slot>
  </component>
</template>
