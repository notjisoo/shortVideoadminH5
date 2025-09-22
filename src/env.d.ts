/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Type declaration for vue3-virtual-scroll-list
declare module 'vue3-virtual-scroll-list' {
  import { DefineComponent } from 'vue'
  
  interface VirtualListProps {
    size?: number
    remain?: number
    rows?: any[]
    class?: string
  }
  
  interface VirtualListSlots {
    default?: (props: { item: any; index: number }) => any
  }
  
  const VirtualList: DefineComponent<VirtualListProps, {}, {}, {}, {}, {}, {}, VirtualListSlots>
  export default VirtualList
}
