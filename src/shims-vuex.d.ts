import { Store } from '@/store'; // path to store file
import { ComponentCustomProperties } from 'vue';

declare module '@vue/runtime-core' {
  interface State {
    isLoading: boolean;
  }
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}