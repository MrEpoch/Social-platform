import { persisted } from 'svelte-local-storage-store';

export const theme = persisted('theme', 
  {
    current: 'light'
  }
)

export const messageBar = persisted('messageBar',
  {
    shown: true
  }
)
