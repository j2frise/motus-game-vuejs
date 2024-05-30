<script lang="ts">
  import { defineComponent, h } from 'vue';

  export default defineComponent({
    name: 'BaseLevel',
    props: {
      mobile: Boolean,
      type: {
        type: String,
        default: 'justify-between',
      },
    },
    setup(props, { slots }) {
      const parentClass = [props.type, 'items-center'];
      const parentMobileClass = ['flex'];
      const parentBaseClass = ['block', 'md:flex'];
      const childBaseClass = ['flex', 'items-center', 'justify-center'];

      return () => {
        const children = slots.default ? slots.default() : [];

        return h(
          'div',
          {
            class: [
              ...parentClass,
              ...(props.mobile ? parentMobileClass : parentBaseClass),
            ],
          },
          children.map((element, index) => {
            const childClass =
              !props.mobile && children.length > index + 1
                ? [...childBaseClass, 'mb-6', 'md:mb-0']
                : childBaseClass;

            return h('div', { class: childClass }, [element]);
          }),
        );
      };
    },
  });
</script>
