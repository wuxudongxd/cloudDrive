<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
    <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
      <div class="relative flex items-center justify-between h-16">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <DisclosureButton
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          >
            <span class="sr-only">Open main menu</span>
            <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
            <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
          </DisclosureButton>
        </div>
        <div class="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
          <div class="hidden sm:block sm:ml-6">
            <div class="flex space-x-4">
              <a
                v-for="item in navigation"
                :key="item.name"
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'px-3 py-2 rounded-md text-sm font-medium',
                ]"
                :aria-current="item.current ? 'page' : undefined"
              >{{ item.name }}</a>
            </div>
          </div>
        </div>
        <div
          class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0"
        >
          <button
            class="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span class="sr-only">View notifications</span>
            <BellIcon class="h-6 w-6" aria-hidden="true" />
          </button>

          <!-- Profile dropdown -->
          <Menu as="div" class="ml-3 relative">
            <div>
              <MenuButton
                class="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span class="sr-only">Open user menu</span>
                <img
                  class="h-8 w-8 rounded-full"
                  src="data:image/jpeg;base64,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"
                />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              >
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >账户</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >设置</a>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <a
                    href="#"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block px-4 py-2 text-sm text-gray-700',
                    ]"
                  >退出</a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>

    <DisclosurePanel class="sm:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-900 text-white'
              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            'block px-3 py-2 rounded-md text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >{{ item.name }}</a>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>

<script>
import { ref } from "vue";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/vue";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/vue/outline";

const navigation = [
  { name: "控制台", href: "#", current: true },
  // { name: "Team", href: "#", current: false },
  // { name: "Projects", href: "#", current: false },
  // { name: "Calendar", href: "#", current: false },
];

export default {
  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    BellIcon,
    MenuIcon,
    XIcon,
  },
  setup() {
    const open = ref(false);

    return {
      navigation,
      open,
    };
  },
};
</script>
